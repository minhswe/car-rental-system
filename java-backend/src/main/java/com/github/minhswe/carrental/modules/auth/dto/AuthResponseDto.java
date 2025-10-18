package com.github.minhswe.carrental.modules.auth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.github.minhswe.carrental.modules.user.model.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponseDto {
    private String id;
    private String username;
    private String email;
    private Role role;
    private String accessToken;
    private String refreshToken;
}
