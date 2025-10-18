package com.github.minhswe.carrental.modules.auth.validator;

import com.github.minhswe.carrental.common.exceptions.BadRequestException;
import com.github.minhswe.carrental.modules.auth.dto.RegisterUserDto;
import com.github.minhswe.carrental.modules.user.model.Role;
import com.github.minhswe.carrental.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RegisterValidator {
    private final UserRepository userRepository;

    public void validate(RegisterUserDto request){
        if (userRepository.existsByUsername(request.getUsername())){
            throw new BadRequestException("Username is already taken");
        }

        if (userRepository.existsByEmail(request.getEmail())){
            throw new BadRequestException("Email is already taken");
        }

        String userRole = String.valueOf(request.getRole());

        if (Role.ADMIN.name().equalsIgnoreCase(userRole.trim())){
            throw new IllegalStateException("Admin is not allowed to register");
        }
    }
}
