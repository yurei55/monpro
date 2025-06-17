package com.shingu.hotel.controller;

import com.shingu.hotel.dto.JoinMembershipRequest;
import com.shingu.hotel.dto.UpdateUserInfoRequest;
import com.shingu.hotel.entity.JoinMembershipEntity;
import com.shingu.hotel.repository.JoinMemberShipRepository;
import com.shingu.hotel.service.JoinMembershipService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
public class JoinMembershipController {

    private final JoinMembershipService joinMembershipService; //회원가입 로직이 들어있는 service클래스를 가져다 쓰기 위해 선언
    private final JoinMemberShipRepository repository;

    public JoinMembershipController(JoinMembershipService joinMembershipService, JoinMemberShipRepository repository) { //생성자
        this.joinMembershipService = joinMembershipService;
        this.repository = repository;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody @Valid JoinMembershipRequest request) {
        joinMembershipService.signup(request);
        return ResponseEntity.ok("회원가입이 완료되었습니다!");
    }

    // ✅ 회원정보 수정
    @PutMapping("/update/{email}")
    public ResponseEntity<String> updateUserInfo(
            @PathVariable String email,
            @RequestBody UpdateUserInfoRequest request
    ) {
        joinMembershipService.updateUserInfo(email, request);
        return ResponseEntity.ok("회원정보가 성공적으로 수정되었습니다.");
    }

    @GetMapping("/{email}")
    public ResponseEntity<JoinMembershipEntity> getUserInfo(@PathVariable String email) {
        return repository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public ResponseEntity<JoinMembershipEntity> getCurrentUserInfo(HttpServletRequest request) {
        String email = request.getUserPrincipal().getName(); // 로그인된 유저의 이메일
        return repository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 이메일 중복 확인
    @GetMapping("/check-id")
    public ResponseEntity<String> checkDuplicateId(@RequestParam String uid) {
        boolean exists = repository.existsByEmail(uid);
        return ResponseEntity.ok(exists ? "DUPLICATE" : "AVAILABLE");
    }


}
