package com.linklens.backend.service;

import com.linklens.backend.dto.LoginResponse;
import com.linklens.backend.dto.RegisterRequest;
import com.linklens.backend.entity.AuthProvider;
import com.linklens.backend.entity.User;
import com.linklens.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.linklens.backend.dto.LoginRequest;
import com.linklens.backend.security.JwtService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.linklens.backend.repository.LinkRepository;
import com.linklens.backend.dto.UserProfileResponse;
import com.linklens.backend.dto.UserStatsResponse;
import com.linklens.backend.entity.Link;
import com.linklens.backend.repository.ClickEventRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final LinkRepository linkRepository;
    private final ClickEventRepository clickEventRepository;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       LinkRepository linkRepository,
                       ClickEventRepository clickEventRepository) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.linkRepository = linkRepository;
        this.clickEventRepository = clickEventRepository;
    }

    public String register(RegisterRequest request) {


        if(userRepository.existsByEmail(request.getEmail())){
            return "Email already exists";
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .provider(AuthProvider.LOCAL)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            throw new RuntimeException("Invalid Email or Password");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Email or Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                "Bearer",
                user.getName(),
                user.getEmail()
        );
    }

    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    public UserProfileResponse getProfile() {

        User user = getCurrentUser();

        return new UserProfileResponse(
                user.getName(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }

    public UserStatsResponse getStats() {

        User user = getCurrentUser();

        long linksCreated = linkRepository.countByUser(user);

        long totalClicks = linkRepository.findByUser(user)
                .stream()
                .mapToLong(Link::getClickCount)
                .sum();

        return new UserStatsResponse(
                linksCreated,
                totalClicks
        );
    }

    @Transactional
    public void deleteAccount() {

        User user = getCurrentUser();

        List<Link> links = linkRepository.findByUser(user);

        for (Link link : links) {
            clickEventRepository.deleteByLink(link);
        }

        linkRepository.deleteByUser(user);

        userRepository.delete(user);
    }
}