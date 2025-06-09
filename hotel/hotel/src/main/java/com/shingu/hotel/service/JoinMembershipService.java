package com.shingu.hotel.service;

import com.shingu.hotel.dto.JoinMembershipRequest;
import com.shingu.hotel.dto.UpdateUserInfoRequest;
import com.shingu.hotel.entity.JoinMembershipEntity;
import com.shingu.hotel.repository.JoinMemberShipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JoinMembershipService {

    private final JoinMemberShipRepository repository;
    private final PasswordEncoder passwordEncoder;

    // ✔ 회원가입
    public void signup(JoinMembershipRequest request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("이메일은 필수입니다.");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new RuntimeException("비밀번호는 필수입니다.");
        }
        if (request.getPhoneNumber() == null || request.getPhoneNumber().trim().isEmpty()) {
            throw new RuntimeException("휴대폰 번호는 필수입니다.");
        }
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new RuntimeException("이름은 필수입니다.");
        }
        if (request.getBirthDate() == null) {
            throw new RuntimeException("생년월일은 필수입니다.");
        }

        validatePasswordFormat(request.getPassword());

        if (repository.findByName(request.getName()).isPresent()) {
            throw new RuntimeException("이미 사용 중인 아이디입니다.");
        }
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("이미 사용 중인 이메일입니다.");
        }

        JoinMembershipEntity user = new JoinMembershipEntity();
        user.setName(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setBirthDate(request.getBirthDate());

        repository.save(user);
    }

    // ✔ 회원정보 수정
    public void updateUserInfo(String email, UpdateUserInfoRequest request) {
        JoinMembershipEntity user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 이메일의 사용자를 찾을 수 없습니다."));

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }

        validatePasswordFormat(request.getPassword());

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setAddress(request.getAddress());
        user.setPhoneNumber(request.getPhoneNumber());

        repository.save(user);
    }

    // ✔ 비밀번호 재설정
    public void resetPassword(String email, String newPassword) {
        JoinMembershipEntity user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 이메일의 사용자를 찾을 수 없습니다."));

        validatePasswordFormat(newPassword);

        user.setPassword(passwordEncoder.encode(newPassword));
        repository.save(user);
    }

    // ✨ 비밀번호 유효성 검사 (밑줄만 특수문자 허용)
    private void validatePasswordFormat(String password) {
        if (password.length() < 6) {
            throw new RuntimeException("비밀번호는 최소 6자리 이상이어야 합니다.");
        }

        boolean hasLetter = password.matches(".*[a-zA-Z].*");
        boolean hasDigit = password.matches(".*[0-9].*");
        boolean onlyAllowedChars = password.matches("[a-zA-Z0-9_]+");

        if (!(hasLetter && hasDigit && onlyAllowedChars)) {
            throw new RuntimeException("비밀번호는 영문자, 숫자를 포함하고 밑줄(_) 외 특수문자는 사용할 수 없습니다.");
        }
    }
}
