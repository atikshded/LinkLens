package com.linklens.backend.controller;

import com.linklens.backend.dto.CreateVariantRequest;
import com.linklens.backend.dto.SaveVariantsRequest;
import com.linklens.backend.dto.VariantResponse;
import com.linklens.backend.service.LinkVariantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/links/{linkId}/variants")
@RequiredArgsConstructor
public class LinkVariantController {

    private final LinkVariantService linkVariantService;

    @GetMapping
    public ResponseEntity<List<VariantResponse>> getVariants(
            @PathVariable Long linkId) {

        return ResponseEntity.ok(
                linkVariantService.getVariants(linkId));
    }

    /**
     * Create a new variant
     */
    @PostMapping
    public ResponseEntity<VariantResponse> createVariant(
            @PathVariable Long linkId,
            @Valid @RequestBody CreateVariantRequest request) {

        return ResponseEntity.ok(
                linkVariantService.createVariant(linkId, request));
    }

    /**
     * Update a single variant
     */
    @PutMapping("/{variantId}")
    public ResponseEntity<?> updateVariant(
            @PathVariable Long linkId,
            @PathVariable Long variantId,
            @Valid @RequestBody CreateVariantRequest request) {

        try {
            return ResponseEntity.ok(
                    linkVariantService.updateVariant(linkId, variantId, request)
            );
        } catch (Exception e) {
            e.printStackTrace();   // <-- THIS IS IMPORTANT
            throw e;
        }
    }

    /**
     * Delete a variant
     */
    @DeleteMapping("/{variantId}")
    public ResponseEntity<String> deleteVariant(
            @PathVariable Long linkId,
            @PathVariable Long variantId) {

        linkVariantService.deleteVariant(linkId, variantId);

        return ResponseEntity.ok("Variant deleted successfully.");
    }

    /**
     * Bulk replace all variants (keep this if you still want
     * to support replacing the entire traffic configuration at once)
     */
    @PutMapping
    public ResponseEntity<String> saveVariants(
            @PathVariable Long linkId,
            @Valid @RequestBody SaveVariantsRequest request) {

        linkVariantService.saveVariants(linkId, request);

        return ResponseEntity.ok(
                "Traffic configuration updated successfully.");
    }
}