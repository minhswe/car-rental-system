package com.github.minhswe.carrental.modules.auth.service;

import com.github.minhswe.carrental.common.exceptions.BadRequestException;
import com.github.minhswe.carrental.common.serurity.JwtService;
import com.github.minhswe.carrental.modules.auth.dto.AuthResponseDto;
import com.github.minhswe.carrental.modules.auth.dto.LogInUserDto;
import com.github.minhswe.carrental.modules.auth.dto.RegisterUserDto;
import com.github.minhswe.carrental.modules.auth.mapper.AuthMapper;
import com.github.minhswe.carrental.modules.auth.validator.RegisterValidator;
import com.github.minhswe.carrental.modules.user.model.Role;
import com.github.minhswe.carrental.modules.user.model.User;
import com.github.minhswe.carrental.modules.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthMapper authMapper;
    private final RegisterValidator registerValidator;
    private final JwtService jwtService;

    @Transactional
    public AuthResponseDto registerUser(RegisterUserDto request){

        registerValidator.validate(request);

        User user = authMapper.toUser(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setCreatedAt(java.time.Instant.now());

        User savedUser = userRepository.save(user);

        return authMapper.toAuthResponseDto(savedUser);
    }

    public AuthResponseDto logInUser(LogInUserDto request){

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new BadRequestException("Invalid username or password");
        }

       String accessToken = jwtService.generateAccessToken(user);
       String refreshToken =  jwtService.generateRefreshToken(user);

        return authMapper.toAuthResponseDto(user, accessToken, refreshToken);
    }
}
