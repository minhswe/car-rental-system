package com.github.minhswe.carrental.modules.auth.dto;

import com.github.minhswe.carrental.modules.user.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {

    @NotBlank(message = "Username is required")
    @Size(min = 5, max = 50, message = "Username must be between 5 and 50 characters.")
    private String username;
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters.")
    private String password;
    @NotBlank(message = "Email is required.")
    @Email(message = "Please provide a valid email address.")
    private String email;
    @NotBlank(message = "First name is required.")
    private String firstName;
    @NotBlank(message = "Last name is required.")
    private String lastName;
    @NotBlank(message = "Phone number is required.")
    private String phoneNumber;
    private Role role;
}
