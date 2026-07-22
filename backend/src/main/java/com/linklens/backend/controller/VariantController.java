package com.linklens.backend.controller;

import com.linklens.backend.dto.CreateVariantRequest;
import com.linklens.backend.dto.VariantResponse;
import com.linklens.backend.service.VariantService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class VariantController {

    private final VariantService variantService;

    public VariantController(VariantService variantService) {
        this.variantService = variantService;
    }

    @PostMapping("/links/{linkId}/variants")
    public ResponseEntity<Void> addVariant(
            @PathVariable Long linkId,
            @RequestBody @Valid CreateVariantRequest request) {

        variantService.addVariant(linkId, request);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/links/{linkId}/variants")
    public List<VariantResponse> getVariants(
            @PathVariable Long linkId) {

        return variantService.getVariants(linkId);
    }

    @DeleteMapping("/variants/{variantId}")
    public ResponseEntity<Void> deleteVariant(
            @PathVariable Long variantId) {

        variantService.deleteVariant(variantId);

        return ResponseEntity.noContent().build();
    }
}