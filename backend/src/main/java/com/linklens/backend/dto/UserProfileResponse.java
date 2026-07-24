package com.linklens.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserProfileResponse {

    private String name;
    private String email;
    private LocalDateTime createdAt;
}