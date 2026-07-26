package com.linklens.backend.service;

import com.linklens.backend.dto.CreateLinkRequest;
import com.linklens.backend.dto.LinkDetailsResponse;
import com.linklens.backend.dto.LinkResponse;
import com.linklens.backend.dto.LinkSummaryResponse;
import com.linklens.backend.entity.Link;
import com.linklens.backend.entity.LinkVariant;
import com.linklens.backend.entity.User;
import com.linklens.backend.exception.AccessDeniedException;
import com.linklens.backend.exception.LinkExpiredException;
import com.linklens.backend.exception.ResourceNotFoundException;
import com.linklens.backend.repository.LinkRepository;
import com.linklens.backend.repository.LinkVariantRepository;
import com.linklens.backend.util.AliasValidator;
import com.linklens.backend.util.ShortCodeGenerator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import com.linklens.backend.util.UrlUtil;

@Service
public class LinkService {

    private final LinkRepository linkRepository;
    private final LinkVariantRepository variantRepository;
    private final CurrentUserService currentUserService;
    private final ClickEventService clickEventService;
    private final RedisService redisService;
    private final VariantSelectionService variantSelectionService;

    @Value("${app.base-url}")
    private String baseUrl;

    public LinkService(LinkRepository linkRepository,
                       LinkVariantRepository variantRepository,
                       CurrentUserService currentUserService,
                       ClickEventService clickEventService,
                       RedisService redisService,
                       VariantSelectionService variantSelectionService) {

        this.linkRepository = linkRepository;
        this.variantRepository = variantRepository;
        this.currentUserService = currentUserService;
        this.clickEventService = clickEventService;
        this.redisService = redisService;
        this.variantSelectionService = variantSelectionService;
    }

    /**
     * Creates a new shortened link.
     */
    public LinkResponse createShortLink(CreateLinkRequest request) {

        User user = currentUserService.getCurrentUser();

        if (request.getExpiresAt() != null &&
                request.getExpiresAt().isBefore(LocalDateTime.now())) {

            throw new IllegalArgumentException(
                    "Expiry time must be in the future."
            );
        }

        String shortCode;

        if (request.getCustomAlias() != null &&
                !request.getCustomAlias().isBlank()) {

            shortCode = request.getCustomAlias().trim();

            if (!AliasValidator.isValid(shortCode)) {
                throw new IllegalArgumentException(
                        "Invalid custom alias."
                );
            }

            if (linkRepository.existsByShortCode(shortCode)) {
                throw new IllegalArgumentException(
                        "This custom alias is already taken."
                );
            }

        } else {

            do {
                shortCode = ShortCodeGenerator.generate();
            } while (linkRepository.existsByShortCode(shortCode));
        }

        Link link = Link.builder()
                .originalUrl(
                        UrlUtil.normalizeUrl(request.getOriginalUrl())
                )
                .shortCode(shortCode)
                .createdAt(LocalDateTime.now())
                .expiresAt(request.getExpiresAt())
                .clickCount(0L)
                .user(user)
                .build();

        linkRepository.save(link);

        return new LinkResponse(
                link.getId(),
                link.getOriginalUrl(),
                link.getShortCode(),
                baseUrl + "/r/" + link.getShortCode(),
                link.getExpiresAt(),
                0,
                link.getExpiresAt() != null &&
                        link.getExpiresAt().isBefore(LocalDateTime.now())
        );
    }

    /**
     * Returns the original URL for a short code
     * and increments click count.
     */
    @Transactional
    public String getOriginalUrl(
            String shortCode,
            String userAgent,
            String ipAddress) {

        Link link = linkRepository.findByShortCode(shortCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Short URL not found"));

        if (link.getExpiresAt() != null &&
                LocalDateTime.now().isAfter(link.getExpiresAt())) {

            throw new LinkExpiredException("This short link has expired.");
        }

        LinkVariant selectedVariant = null;
        String destinationUrl;

        if (link.getVariants() == null || link.getVariants().isEmpty()) {

            destinationUrl = link.getOriginalUrl();

        } else {

            selectedVariant = variantSelectionService
                    .chooseVariant(link.getVariants());

            selectedVariant.setClickCount(
                    selectedVariant.getClickCount() + 1
            );

            variantRepository.save(selectedVariant);

            destinationUrl = selectedVariant.getDestinationUrl();
        }

        link.setClickCount(link.getClickCount() + 1);
        linkRepository.save(link);

        clickEventService.recordClick(
                link,
                selectedVariant,
                userAgent,
                ipAddress
        );

        return destinationUrl;
    }

    /**
     * Returns all links created by the logged-in user.
     */
    public List<LinkSummaryResponse> getMyLinks() {

        User user = currentUserService.getCurrentUser();

        List<Link> links = linkRepository.findByUser(user);

        return links.stream()
                .map(link -> new LinkSummaryResponse(
                        link.getId(),
                        link.getOriginalUrl(),
                        link.getShortCode(),
                        baseUrl + "/r/" + link.getShortCode(),
                        link.getClickCount(),
                        link.getCreatedAt(),
                        link.getExpiresAt(),
                        link.getVariants() == null
                                ? 0
                                : link.getVariants().size(),
                        link.getExpiresAt() != null &&
                                link.getExpiresAt().isBefore(LocalDateTime.now())
                ))
                .toList();
    }

    public LinkDetailsResponse getLinkDetails(Long id) {

        User currentUser = currentUserService.getCurrentUser();

        Link link = linkRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Link not found"));

        if (!link.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Access Denied");
        }

        return new LinkDetailsResponse(
                link.getId(),
                link.getOriginalUrl(),
                link.getShortCode(),
                baseUrl + "/r/" + link.getShortCode(),
                link.getClickCount(),
                link.getCreatedAt(),
                link.getExpiresAt()
        );
    }

    public String getShortUrl(Long linkId) {

        Link link = linkRepository.findById(linkId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Link not found"));

        return baseUrl + "/r/" + link.getShortCode();
    }

    public void deleteLink(Long id) {

        User currentUser = currentUserService.getCurrentUser();

        Link link = linkRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Link not found"));

        if (!link.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Access Denied");
        }

        linkRepository.delete(link);
    }
}