package com.linklens.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VariantPerformanceResponse {

    private Long id;
    private String destinationUrl;
    private Integer weight;
    private Long clickCount;

}