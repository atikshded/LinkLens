package com.linklens.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateVariantRequest {

    @NotBlank
    private String destinationUrl;

    @Min(1)
    private Integer weight;
}