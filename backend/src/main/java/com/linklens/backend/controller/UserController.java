package com.linklens.backend.controller;

import com.linklens.backend.dto.UserProfileResponse;
import com.linklens.backend.dto.UserStatsResponse;
import com.linklens.backend.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserProfileResponse getProfile() {
        return userService.getProfile();
    }

    @GetMapping("/stats")
    public UserStatsResponse getStats() {
        return userService.getStats();
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteAccount() {
        userService.deleteAccount();
        return ResponseEntity.noContent().build();
    }


}