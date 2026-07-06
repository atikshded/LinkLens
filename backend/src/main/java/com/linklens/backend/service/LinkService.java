package com.linklens.backend.service;

import com.linklens.backend.repository.LinkRepository;
import com.linklens.backend.repository.UserRepository;
import com.linklens.backend.util.ShortCodeGenerator;
import org.springframework.stereotype.Service;
import com.linklens.backend.dto.CreateLinkRequest;
import com.linklens.backend.dto.LinkResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.linklens.backend.entity.User;
import com.linklens.backend.entity.Link;
import java.time.LocalDateTime;

@Service
public class LinkService {

    private final LinkRepository linkRepository;
    private final UserRepository userRepository;

    public LinkService(LinkRepository linkRepository,
                       UserRepository userRepository) {
        this.linkRepository = linkRepository;
        this.userRepository = userRepository;
    }

    public LinkResponse createShortLink(CreateLinkRequest request) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
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
}