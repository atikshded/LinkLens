package com.linklens.backend.service.model;

import com.linklens.backend.dto.DailyClickResponse;
import com.linklens.backend.dto.VariantPerformanceResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class AnalyticsData {

    private Long totalClicks;

    private LocalDateTime lastClickedAt;

    private String topBrowser;

    private String topOperatingSystem;

    private Map<String, Long> browserDistribution;

    private Map<String, Long> operatingSystemDistribution;

    private List<DailyClickResponse> dailyClicks;

    private List<VariantPerformanceResponse> variants;

    private String originalUrl;

    private String shortUrl;
}