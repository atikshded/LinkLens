package com.linklens.backend.service;
import com.linklens.backend.dto.CreateVariantRequest;
import com.linklens.backend.dto.SaveVariantsRequest;
import com.linklens.backend.dto.VariantResponse;
import com.linklens.backend.entity.Link;
import com.linklens.backend.entity.LinkVariant;
import com.linklens.backend.entity.User;
import com.linklens.backend.exception.AccessDeniedException;
import com.linklens.backend.repository.LinkRepository;
import com.linklens.backend.repository.LinkVariantRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.linklens.backend.util.UrlUtil;

@Service
@RequiredArgsConstructor
@Transactional
public class LinkVariantService {

    private final LinkRepository linkRepository;
    private final LinkVariantRepository variantRepository;
    private final CurrentUserService currentUserService;

    /**
     * Returns all variants of a link.
     */
    public List<VariantResponse> getVariants(Long linkId) {

        Link link = getOwnedLink(linkId);

        return variantRepository.findByLinkId(link.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /**
     * Replaces all variants of a link.
     */
    public void saveVariants(Long linkId, SaveVariantsRequest request) {

        Link link = getOwnedLink(linkId);

        validateVariants(request);

        variantRepository.deleteByLinkId(link.getId());

        List<LinkVariant> variants = request.getVariants()
                .stream()
                .map(dto -> LinkVariant.builder()
                        .destinationUrl(
                                UrlUtil.normalizeUrl(
                                        dto.getDestinationUrl()
                                )
                        )
                        .weight(dto.getWeight())
                        .link(link)
                        .active(true)
                        .clickCount(0L)
                        .build())
                .toList();

        variantRepository.saveAll(variants);
    }

    /**
     * Creates a new variant.
     */
    public VariantResponse createVariant(Long linkId,
                                         CreateVariantRequest request) {

        Link link = getOwnedLink(linkId);

        LinkVariant variant = LinkVariant.builder()
                .link(link)
                .destinationUrl(
                        UrlUtil.normalizeUrl(request.getDestinationUrl())
                )
                .weight(request.getWeight())
                .active(true)
                .clickCount(0L)
                .build();

        variantRepository.save(variant);

        return mapToResponse(variant);
    }

    /**
     * Updates an existing variant.
     */
    public VariantResponse updateVariant(Long linkId,
                                         Long variantId,
                                         CreateVariantRequest request) {

        System.out.println("1. Entered updateVariant");

        getOwnedLink(linkId);
        System.out.println("2. Ownership verified");

        LinkVariant variant = variantRepository
                .findByIdAndLinkId(variantId, linkId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Variant not found"));

        System.out.println("3. Variant found");

        variant.setDestinationUrl(
                UrlUtil.normalizeUrl(
                        request.getDestinationUrl()
                )
        );
        variant.setWeight(request.getWeight());

        System.out.println("4. Before save");

        variantRepository.save(variant);

        System.out.println("5. After save");

        return mapToResponse(variant);
    }

    /**
     * Deletes a variant.
     */
    public void deleteVariant(Long linkId,
                              Long variantId) {

        getOwnedLink(linkId);

        LinkVariant variant = variantRepository
                .findByIdAndLinkId(variantId, linkId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Variant not found"));

        variantRepository.delete(variant);
    }

    /**
     * Returns the link after verifying ownership.
     */
    private Link getOwnedLink(Long linkId) {

        Link link = linkRepository.findById(linkId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Link not found"));

        User currentUser = currentUserService.getCurrentUser();

        if (!link.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Access Denied");
        }

        return link;
    }

    /**
     * Converts entity to response DTO.
     */
    private VariantResponse mapToResponse(LinkVariant variant) {

        return VariantResponse.builder()
                .id(variant.getId())
                .destinationUrl(variant.getDestinationUrl())
                .weight(variant.getWeight())
                .clickCount(variant.getClickCount())
                .active(variant.getActive())
                .build();
    }

    /**
     * Validates the incoming variant configuration.
     */
    private void validateVariants(SaveVariantsRequest request) {

        if (request.getVariants() == null || request.getVariants().isEmpty()) {
            throw new IllegalArgumentException(
                    "At least one variant is required.");
        }

        int totalWeight = request.getVariants()
                .stream()
                .mapToInt(v -> v.getWeight())
                .sum();

        if (totalWeight != 100) {
            throw new IllegalArgumentException(
                    "Total weight must equal 100.");
        }

        long uniqueUrls = request.getVariants()
                .stream()
                .map(v -> UrlUtil.normalizeUrl(v.getDestinationUrl()))
                .distinct()
                .count();

        if (uniqueUrls != request.getVariants().size()) {
            throw new IllegalArgumentException(
                    "Duplicate destination URLs are not allowed.");
        }
    }
}