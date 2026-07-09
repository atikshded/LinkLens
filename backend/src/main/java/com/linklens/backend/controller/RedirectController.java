package com.linklens.backend.controller;

import com.linklens.backend.service.LinkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import com.linklens.backend.service.RedisService;
import com.linklens.backend.exception.RateLimitExceededException;
import java.net.URI;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
@Tag(
        name = "Redirect",
        description = "Public redirection APIs"
)

@RestController
public class RedirectController {

    private final LinkService linkService;
    private final RedisService redisService;

    public RedirectController(
            LinkService linkService,
            RedisService redisService) {

        this.linkService = linkService;
        this.redisService = redisService;
    }

    @Operation(
            summary = "Redirect Short URL",
            description = "Redirects the client to the original URL and records analytics."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "302", description = "Successfully redirected"),
            @ApiResponse(responseCode = "404", description = "Short URL not found"),
            @ApiResponse(responseCode = "429", description = "Rate limit exceeded")
    })
    @GetMapping("/r/{shortCode}")
    public ResponseEntity<Void> redirect(
            @PathVariable String shortCode,
            HttpServletRequest request) {

        String ipAddress = request.getRemoteAddr();

        if (!redisService.allowRequest(
                ipAddress,
                3,
                60)) {

            throw new RateLimitExceededException(
                    "Too many requests. Please try again later."
            );
        }

        String userAgent = request.getHeader("User-Agent");

        String originalUrl =
                linkService.getOriginalUrl(shortCode, userAgent, ipAddress);

        return ResponseEntity
                .status(302)
                .location(URI.create(originalUrl))
                .build();
    }
}