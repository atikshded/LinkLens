package com.linklens.backend.controller;

import com.linklens.backend.dto.LoginResponse;
import com.linklens.backend.dto.RegisterRequest;
import com.linklens.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;
import com.linklens.backend.dto.LoginRequest;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(
        name = "Authentication",
        description = "User registration and login APIs"
)

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "Register User",
            description = "Creates a new LinkLens account."
    )
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @Operation(
            summary = "Login",
            description = "Authenticates the user and returns a JWT token."
    )
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}