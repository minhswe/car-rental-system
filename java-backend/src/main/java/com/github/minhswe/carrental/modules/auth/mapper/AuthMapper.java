package com.github.minhswe.carrental.modules.auth.mapper;

import com.github.minhswe.carrental.modules.auth.dto.AuthResponseDto;
import com.github.minhswe.carrental.modules.auth.dto.RegisterUserDto;
import com.github.minhswe.carrental.modules.user.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    AuthResponseDto toAuthResponseDto(User user);

    AuthResponseDto toAuthResponseDto(User user, String accessToken, String refreshToken);

    User toUser(RegisterUserDto dto);
}
