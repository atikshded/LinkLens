package com.linklens.backend.controller;

import com.linklens.backend.dto.*;
import com.linklens.backend.service.LinkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import jakarta.validation.Valid;
import com.linklens.backend.service.AnalyticsService;
import com.linklens.backend.dto.LinkAnalyticsResponse;
import com.linklens.backend.dto.DailyClickResponse;
import com.linklens.backend.util.QRCodeGenerator;
import org.springframework.http.MediaType;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
@Tag(
        name = "Links",
        description = "Manage shortened URLs"
)

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

    @Operation(
            summary = "Create Short Link",
            description = "Creates a shortened URL with an optional custom alias and expiry date."
    )
    @PostMapping
    public LinkResponse createShortLink(
            @Valid @RequestBody CreateLinkRequest request) {

        return linkService.createShortLink(request);
    }

    @Operation(
            summary = "Get My Links",
            description = "Returns all shortened URLs created by the authenticated user."
    )
    @GetMapping
    public List<LinkSummaryResponse> getMyLinks() {
        return linkService.getMyLinks();
    }

    @Operation(
            summary = "Get Link Details",
            description = "Returns complete information for a specific shortened URL."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Link details returned successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Link not found")
    })
    @GetMapping("/{id}")
    public LinkDetailsResponse getLinkDetails(@PathVariable Long id) {
        return linkService.getLinkDetails(id);
    }

    @Operation(
            summary = "Link Analytics",
            description = "Returns analytics such as total clicks, top browser and top operating system."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Analytics returned successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Link not found")
    })
    @GetMapping("/{id}/analytics")
    public LinkAnalyticsResponse getAnalytics(
            @PathVariable Long id) {
        return analyticsService.getAnalytics(id);
    }

    @Operation(
            summary = "Daily Click Analytics",
            description = "Returns the number of clicks grouped by date."
    )
    @GetMapping("/{id}/daily-clicks")
    public List<DailyClickResponse> getDailyClicks(
            @PathVariable Long id) {

        return analyticsService.getDailyClicks(id);
    }

    @Operation(
            summary = "Generate QR Code",
            description = "Generates a QR code image for the shortened URL."
    )
    @GetMapping(value = "/{id}/qr",
            produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getQRCode(
            @PathVariable Long id) throws Exception {

        String shortUrl =
                linkService.getShortUrl(id);

        BufferedImage image =
                QRCodeGenerator.generateQRCode(
                        shortUrl,
                        300,
                        300
                );

        ByteArrayOutputStream outputStream =
                new ByteArrayOutputStream();

        ImageIO.write(
                image,
                "PNG",
                outputStream
        );

        return outputStream.toByteArray();
    }
}