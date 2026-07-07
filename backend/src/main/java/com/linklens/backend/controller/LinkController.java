package com.linklens.backend.controller;

import com.linklens.backend.dto.*;
import com.linklens.backend.service.LinkService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import jakarta.validation.Valid;
import com.linklens.backend.service.AnalyticsService;
import com.linklens.backend.dto.LinkAnalyticsResponse;
import com.linklens.backend.dto.DailyClickResponse;

@RestController
@RequestMapping("/api/links")
public class LinkController {

    private final LinkService linkService;
    private final AnalyticsService analyticsService;

    public LinkController(LinkService linkService,
                          AnalyticsService analyticsService) {

        this.linkService = linkService;
        this.analyticsService = analyticsService;
    }

    @PostMapping
    public LinkResponse createShortLink(
            @Valid @RequestBody CreateLinkRequest request) {

        return linkService.createShortLink(request);
    }

    @GetMapping
    public List<LinkSummaryResponse> getMyLinks() {
        return linkService.getMyLinks();
    }

    @GetMapping("/{id}")
    public LinkDetailsResponse getLinkDetails(@PathVariable Long id) {
        return linkService.getLinkDetails(id);
    }

    @GetMapping("/{id}/analytics")
    public LinkAnalyticsResponse getAnalytics(
            @PathVariable Long id) {

        return analyticsService.getAnalytics(id);
    }

    @GetMapping("/{id}/daily-clicks")
    public List<DailyClickResponse> getDailyClicks(
            @PathVariable Long id) {

        return analyticsService.getDailyClicks(id);
    }
}