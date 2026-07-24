package com.linklens.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserStatsResponse {

    private long linksCreated;
    private long totalClicks;
}