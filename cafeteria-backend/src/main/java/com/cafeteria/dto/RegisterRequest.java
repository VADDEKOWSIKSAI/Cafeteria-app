package com.cafeteria.dto;

import com.cafeteria.common.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class RegisterRequest {
    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private UserRole role; // Optional, defaults to STUDENT if null

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
}
