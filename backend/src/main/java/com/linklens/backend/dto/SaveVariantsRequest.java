package com.linklens.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaveVariantsRequest {

    @Valid
    @NotEmpty(message = "At least one variant is required")
    private List<CreateVariantRequest> variants;

}