package com.shingu.hotel.security;

import com.shingu.hotel.entity.JoinMembershipEntity;
import com.shingu.hotel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<JoinMembershipEntity> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        JoinMembershipEntity joinMembershipEntity = user.get();

        // UserDetails 객체로 반환 (Spring Security에서 사용할 수 있도록)
        return User.builder()
                .username(joinMembershipEntity.getEmail()) // 사용자 이메일
                .password(joinMembershipEntity.getPassword()) // 비밀번호
                .roles("USER") // 기본적인 ROLE_USER
                .build();
    }
}
