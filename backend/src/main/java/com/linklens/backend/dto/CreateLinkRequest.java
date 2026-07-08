package com.linklens.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import com.linklens.backend.validation.ValidUrl;
import java.time.LocalDateTime;

@Getter
@Setter
public class CreateLinkRequest {

    @NotBlank(message = "Original URL cannot be empty")
    @ValidUrl
    private String originalUrl;
    private String customAlias;
    private LocalDateTime expiresAt;
}
