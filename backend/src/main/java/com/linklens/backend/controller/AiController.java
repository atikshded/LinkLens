package com.linklens.backend.controller;

import com.linklens.backend.dto.AiSummaryResponse;
import com.linklens.backend.service.AiSummaryService;
import org.springframework.web.bind.annotation.*;

@RestController
public class AiController {

    private final AiSummaryService aiSummaryService;

    public AiController(AiSummaryService aiSummaryService) {
        this.aiSummaryService = aiSummaryService;
    }

    @GetMapping("/api/ai/test")
    public String testAi() {
        return aiSummaryService.testAi();
    }

    @GetMapping("/api/links/{linkId}/ai-summary")
    public AiSummaryResponse getAiSummary(@PathVariable Long linkId) {

        return aiSummaryService.generateSummary(linkId);
    }
}