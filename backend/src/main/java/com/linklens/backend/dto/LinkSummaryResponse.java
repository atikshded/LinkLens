package com.linklens.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class LinkSummaryResponse {

    private Long id;

    private String originalUrl;

    private String shortCode;

    private String shortUrl;

    private Long clickCount;

    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    private Integer variantCount;

    private boolean expired;
}