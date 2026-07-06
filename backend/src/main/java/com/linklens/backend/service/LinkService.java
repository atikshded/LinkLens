package com.linklens.backend.service;

import com.linklens.backend.dto.CreateLinkRequest;
import com.linklens.backend.dto.LinkDetailsResponse;
import com.linklens.backend.dto.LinkResponse;
import com.linklens.backend.dto.LinkSummaryResponse;
import com.linklens.backend.entity.Link;
import com.linklens.backend.entity.User;
import com.linklens.backend.exception.ResourceNotFoundException;
import com.linklens.backend.repository.LinkRepository;
import com.linklens.backend.repository.UserRepository;
import com.linklens.backend.util.ShortCodeGenerator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.linklens.backend.exception.AccessDeniedException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LinkService {

    private final LinkRepository linkRepository;
    private final UserRepository userRepository;

    public LinkService(LinkRepository linkRepository,
                       UserRepository userRepository) {
        this.linkRepository = linkRepository;
        this.userRepository = userRepository;
    }

    /**
     * Returns the currently authenticated user.
     */
    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    /**
     * Creates a new shortened link.
     */
    public LinkResponse createShortLink(CreateLinkRequest request) {

        User user = getCurrentUser();

        String shortCode;

        do {
            shortCode = ShortCodeGenerator.generate();
        } while (linkRepository.existsByShortCode(shortCode));

        Link link = Link.builder()
                .originalUrl(request.getOriginalUrl())
                .shortCode(shortCode)
                .createdAt(LocalDateTime.now())
                .clickCount(0L)
                .user(user)
                .build();

        linkRepository.save(link);

        return new LinkResponse(
                link.getOriginalUrl(),
                link.getShortCode(),
                "http://localhost:8081/" + link.getShortCode()
        );
    }

    /**
     * Returns the original URL for a short code
     * and increments click count.
     */
    public String getOriginalUrl(String shortCode) {

        Link link = linkRepository.findByShortCode(shortCode)
                .orElseThrow(() ->
                        new RuntimeException("Short URL not found"));

        link.setClickCount(link.getClickCount() + 1);

        linkRepository.save(link);

        return link.getOriginalUrl();
    }

    /**
     * Returns all links created by the logged-in user.
     */
    public List<LinkSummaryResponse> getMyLinks() {

        User user = getCurrentUser();

        List<Link> links = linkRepository.findByUser(user);

        return links.stream()
                .map(link -> new LinkSummaryResponse(
                        link.getId(),
                        link.getOriginalUrl(),
                        link.getShortCode(),
                        "http://localhost:8081/" + link.getShortCode(),
                        link.getClickCount(),
                        link.getCreatedAt()
                ))
                .toList();
    }

    public LinkDetailsResponse getLinkDetails(Long id) {
        User currentUser = getCurrentUser();
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
                "http://localhost:8081/" + link.getShortCode(),
                link.getClickCount(),
                link.getCreatedAt(),
                link.getExpiresAt()
        );
    }
}