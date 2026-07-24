package com.linklens.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.Map;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class LinkAnalyticsResponse {

    private Long totalClicks;

    private LocalDateTime lastClickedAt;

    private String topBrowser;

    private String topOperatingSystem;

    private Map<String, Long> browserDistribution;

    private Map<String, Long> operatingSystemDistribution;

    private String shortUrl;

    private String originalUrl;
}