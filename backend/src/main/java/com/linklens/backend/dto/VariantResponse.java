package com.linklens.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VariantResponse {

    private Long id;

    private String destinationUrl;

    private Integer weight;
}