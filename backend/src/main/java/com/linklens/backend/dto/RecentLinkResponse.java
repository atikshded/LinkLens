package com.linklens.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentLinkResponse {

    private Long id;

    private String shortUrl;

    private String originalUrl;

    private Long clickCount;

    private LocalDateTime createdAt;
}