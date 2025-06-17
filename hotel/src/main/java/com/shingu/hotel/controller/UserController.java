package com.shingu.hotel.controller;

import com.shingu.hotel.dto.LoginRequest;
import com.shingu.hotel.entity.JoinMembershipEntity;
import com.shingu.hotel.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository; // ✅ 추가

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        try {
            // 인증 시도
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());

            Authentication authentication = authenticationManager.authenticate(token);

            // SecurityContext 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
            httpRequest.getSession(true)
                    .setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            // ✅ 사용자 정보를 DB에서 조회 후 세션에 저장
            JoinMembershipEntity loginUser = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

            httpRequest.getSession(true).setAttribute("user", loginUser);

            return ResponseEntity.ok("로그인에 성공하였습니다!");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("이메일 또는 비밀번호가 잘못 되었습니다");
        }
    }
}
