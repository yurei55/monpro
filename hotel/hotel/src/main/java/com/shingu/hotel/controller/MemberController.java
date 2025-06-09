package com.shingu.hotel.controller;

import com.shingu.hotel.entity.JoinMembershipEntity;
import com.shingu.hotel.repository.JoinMemberShipRepository;
import com.shingu.hotel.service.JoinMembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final JoinMemberShipRepository memberRepository;
    private final JoinMembershipService membershipService;

    // ✅ 아이디 찾기 - 이름 + 전화번호로 이메일 반환
    @GetMapping("/find-id")
    public ResponseEntity<?> findId(
            @RequestParam("name") String name,
            @RequestParam("phoneNumber") String phoneNumber) {

        Optional<JoinMembershipEntity> optional = memberRepository.findByNameAndPhoneNumber(name, phoneNumber);

        if (optional.isEmpty()) {
            Map<String, Object> result = new HashMap<>();
            result.put("userId", null);
            return ResponseEntity.ok(result);
        }

        String email = optional.get().getEmail();
        return ResponseEntity.ok(Map.of("userId", email));
    }

    // ✅ 비밀번호 찾기 - 이메일 + 이름으로 회원 존재 여부 확인
    @GetMapping("/verify-for-reset")
    public ResponseEntity<?> verifyForPasswordReset(
            @RequestParam String email,
            @RequestParam String name) {

        Optional<JoinMembershipEntity> optional = memberRepository.findByEmailAndName(email, name);
        boolean verified = optional.isPresent();

        return ResponseEntity.ok(Map.of("verified", verified));
    }

    // ✅ 비밀번호 재설정 API
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        if (email == null || newPassword == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "필수 정보 누락"));
        }

        try {
            membershipService.resetPassword(email, newPassword);
            return ResponseEntity.ok(Map.of("message", "비밀번호가 변경되었습니다."));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
