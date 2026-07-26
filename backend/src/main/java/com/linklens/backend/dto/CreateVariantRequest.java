package com.linklens.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateVariantRequest {

    @NotBlank(message = "Destination URL is required")
    private String destinationUrl;

    @Min(value = 1, message = "Weight must be at least 1")
    @Max(value = 100, message = "Weight cannot exceed 100")
    private Integer weight;
}