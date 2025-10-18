package com.github.minhswe.carrental.modules.auth.controller;

import com.github.minhswe.carrental.common.response.ApiResponse;
import com.github.minhswe.carrental.modules.auth.dto.AuthResponseDto;
import com.github.minhswe.carrental.modules.auth.dto.LogInUserDto;
import com.github.minhswe.carrental.modules.auth.dto.RegisterUserDto;
import com.github.minhswe.carrental.modules.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponseDto>> register(
            @Valid @RequestBody RegisterUserDto request
    ){
        AuthResponseDto registeredUser = authService.registerUser(request);
        return ApiResponse.created("User registered successfully", registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponseDto>> login(
            @Valid @RequestBody LogInUserDto request
            ){
        System.out.println("Login attempt for user: " + request.getUsername());
        AuthResponseDto loginUser = authService.logInUser(request);
        return ApiResponse.success("User logged in successfully", loginUser);
    }
}
