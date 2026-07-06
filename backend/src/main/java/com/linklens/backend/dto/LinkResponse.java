package com.linklens.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LinkResponse {

    private String originalUrl;
    private String shortCode;
    private String shortUrl;
}