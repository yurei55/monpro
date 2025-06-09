//SpringSecurity에게 로그인 유뮤,비번,이메일을 말해주는 클래스
package com.shingu.hotel.security;

import com.shingu.hotel.entity.JoinMembershipEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final JoinMembershipEntity user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // 권한은 사용하지 않음
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail(); // 로그인 시 사용하는 값
    }

    @Override public boolean isAccountNonExpired() { return true; }     //계정 유효기간이 지났는지
    @Override public boolean isAccountNonLocked() { return true; }      //잠긴 계정인제
    @Override public boolean isCredentialsNonExpired() { return true; } //비밀번호 유효기간이 지났는지
    @Override public boolean isEnabled() { return true; }               //계정 사용 가능 상태인지
}
