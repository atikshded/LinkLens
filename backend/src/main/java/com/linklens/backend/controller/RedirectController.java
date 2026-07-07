package com.linklens.backend.controller;

import com.linklens.backend.service.LinkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.net.URI;

@RestController
public class RedirectController {

    private final LinkService linkService;

    public RedirectController(LinkService linkService) {
        this.linkService = linkService;
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirect(
            @PathVariable String shortCode,
            HttpServletRequest request) {

        String userAgent = request.getHeader("User-Agent");
        String ipAddress = request.getRemoteAddr();

        String originalUrl =
                linkService.getOriginalUrl(shortCode, userAgent, ipAddress);

        return ResponseEntity
                .status(302)
                .location(URI.create(originalUrl))
                .build();
    }
}