package com.shingu.hotel.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserInfoRequest {
    private String password;
    private String confirmPassword; // ✅ 확인용 비밀번호
    private String name;
    private String address;
    private String phoneNumber;
}