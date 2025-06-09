package com.shingu.hotel.repository;

import com.shingu.hotel.entity.JoinMembershipEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<JoinMembershipEntity, Long> {
    Optional<JoinMembershipEntity> findByEmailAndPassword(String email, String password);
    Optional<JoinMembershipEntity> findByEmail(String email);

}
