package com.linklens.backend.service;

import com.linklens.backend.dto.CreateVariantRequest;
import com.linklens.backend.dto.VariantResponse;
import com.linklens.backend.entity.Link;
import com.linklens.backend.entity.LinkVariant;
import com.linklens.backend.exception.AccessDeniedException;
import com.linklens.backend.exception.ResourceNotFoundException;
import com.linklens.backend.repository.LinkRepository;
import com.linklens.backend.repository.LinkVariantRepository;
import com.linklens.backend.repository.UserRepository;
import com.linklens.backend.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VariantService {

    private final LinkRepository linkRepository;
    private final LinkVariantRepository variantRepository;
    private final UserRepository userRepository;

    public VariantService(
            LinkRepository linkRepository,
            LinkVariantRepository variantRepository,
            UserRepository userRepository) {

        this.linkRepository = linkRepository;
        this.variantRepository = variantRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    private Link getOwnedLink(Long linkId) {

        User currentUser = getCurrentUser();

        Link link = linkRepository.findById(linkId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Link not found"));

        if (!link.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Access Denied");
        }

        return link;
    }

    public void addVariant(Long linkId,
                           CreateVariantRequest request) {

        Link link = getOwnedLink(linkId);

        LinkVariant variant = LinkVariant.builder()
                .destinationUrl(request.getDestinationUrl())
                .weight(request.getWeight())
                .link(link)
                .build();

        if (link.getVariants()
                .stream()
                .anyMatch(v -> v.getDestinationUrl()
                        .equals(request.getDestinationUrl()))) {

            throw new IllegalArgumentException(
                    "Destination URL already exists."
            );
        }

        variantRepository.save(variant);
    }

    public List<VariantResponse> getVariants(Long linkId) {

        Link link = getOwnedLink(linkId);

        return link.getVariants()
                .stream()
                .map(variant -> VariantResponse.builder()
                        .id(variant.getId())
                        .destinationUrl(variant.getDestinationUrl())
                        .weight(variant.getWeight())
                        .build())
                .toList();
    }

    public void deleteVariant(Long variantId) {

        LinkVariant variant = variantRepository.findById(variantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Variant not found"));

        User currentUser = getCurrentUser();

        if (!variant.getLink()
                .getUser()
                .getId()
                .equals(currentUser.getId())) {

            throw new AccessDeniedException("Access Denied");
        }

        variantRepository.delete(variant);
    }
}
