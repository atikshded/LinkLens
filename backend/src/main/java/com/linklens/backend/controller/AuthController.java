package com.linklens.backend.controller;

import com.linklens.backend.dto.RegisterRequest;
import com.linklens.backend.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.linklens.backend.dto.LoginRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}