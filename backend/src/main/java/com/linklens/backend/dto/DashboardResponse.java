package com.linklens.backend.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private Long totalLinks;

    private Long totalClicks;

    private String topBrowser;

    private String topOperatingSystem;

    private List<DailyClickResponse> clicksLast7Days;

    private Map<String, Long> browserDistribution;

    private List<RecentLinkResponse> recentLinks;
}