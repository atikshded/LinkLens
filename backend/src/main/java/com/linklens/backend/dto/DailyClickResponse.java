package com.linklens.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DailyClickResponse {

    private String date;

    private Long clicks;
}