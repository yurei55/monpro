//회원가입 할 때 db접근 파일

package com.shingu.hotel.repository;

import com.shingu.hotel.entity.JoinMembershipEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JoinMemberShipRepository extends JpaRepository<JoinMembershipEntity, Long> {

    // ✅ 회원가입 중복 확인용
    Optional<JoinMembershipEntity> findByName(String username);
    Optional<JoinMembershipEntity> findByEmail(String email);
    boolean existsByEmail(String email);

    // ✅ 아이디 찾기용 (이름 + 전화번호)
    Optional<JoinMembershipEntity> findByNameAndPhoneNumber(String name, String phoneNumber);

    // ✅ 비밀번호 찾기용 (아이디 + 이름)
    Optional<JoinMembershipEntity> findByEmailAndName(String email, String name);
}
