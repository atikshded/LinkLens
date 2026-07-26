package com.linklens.backend.dto;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LinkResponse {

    private Long id;
    private String originalUrl;
    private String shortCode;
    private String shortUrl;
    private LocalDateTime expiresAt;
    private Integer variantCount;
    private boolean expired;
}