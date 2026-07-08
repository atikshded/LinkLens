package com.linklens.backend.controller;

import com.linklens.backend.service.LinkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import com.linklens.backend.ratelimit.RateLimiterService;
import com.linklens.backend.exception.RateLimitExceededException;

import java.net.URI;

@RestController
public class RedirectController {

    private final LinkService linkService;
    private final RateLimiterService rateLimiterService;

    public RedirectController(
            LinkService linkService,
            RateLimiterService rateLimiterService) {

        this.linkService = linkService;
        this.rateLimiterService = rateLimiterService;
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirect(
            @PathVariable String shortCode,
            HttpServletRequest request) {

        String ipAddress = request.getRemoteAddr();

        if (!rateLimiterService.allowRequest(ipAddress)) {
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