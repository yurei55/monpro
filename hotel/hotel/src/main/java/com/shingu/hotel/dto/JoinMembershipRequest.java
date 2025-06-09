//회원가입 할 때 클라이언트에서 전달받은 데이터를 담은 객체

package com.shingu.hotel.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
public class JoinMembershipRequest {

    @NotBlank(message = "이메일은 필수입니다")
    @Email(message = "이메일 형식이 올바르지 않습니다")
    private String email;

    @NotBlank(message = "비밀번호는 필수입니다")
    private String password;

    @NotBlank(message = "이름은 필수입니다")
    private String name;

    @NotNull(message = "생년월일은 필수입니다")
    @DateTimeFormat(pattern = "yyyy-MM-dd") // 스프링에서 날짜 포맷 지정
    private LocalDate birthDate;

    @NotBlank(message = "주소는 필수입니다")
    private String address;

    @NotBlank(message = "전화번호는 필수입니다")
    private String phoneNumber;
}
