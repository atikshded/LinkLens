package com.linklens.backend.controller;

import com.linklens.backend.dto.CreateLinkRequest;
import com.linklens.backend.dto.LinkResponse;
import com.linklens.backend.service.LinkService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/links")
public class LinkController {

    private final LinkService linkService;

    public LinkController(LinkService linkService) {
        this.linkService = linkService;
    }

    @PostMapping
    public LinkResponse createShortLink(
            @RequestBody CreateLinkRequest request) {

        return linkService.createShortLink(request);
    }
}