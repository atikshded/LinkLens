package com.linklens.backend.security;

import com.linklens.backend.entity.AuthProvider;
import com.linklens.backend.entity.User;
import com.linklens.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public OAuth2SuccessHandler(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {
        System.out.println(">>> OAuth2SuccessHandler reached");

        try {

            System.out.println("========== GOOGLE LOGIN ==========");

            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

            String email = oAuth2User.getAttribute("email");
            String name = oAuth2User.getAttribute("name");

            System.out.println("Email : " + email);
            System.out.println("Name  : " + name);

            User user = userRepository.findByEmail(email)
                    .orElseGet(() -> {

                        User newUser = User.builder()
                                .name(name)
                                .email(email)
                                .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                                .provider(AuthProvider.GOOGLE)
                                .createdAt(LocalDateTime.now())
                                .build();

                        return userRepository.save(newUser);
                    });

            System.out.println("User Found/Created");

            String token = jwtService.generateToken(user.getEmail());

            System.out.println("JWT Generated");

            String redirectUrl =
                    "http://localhost:5173/oauth-success?token=" + token;

            System.out.println("Redirecting to:");
            System.out.println(redirectUrl);

            response.sendRedirect(redirectUrl);

            System.out.println("========== SUCCESS ==========");

        } catch (Exception e) {

            System.out.println("========== GOOGLE LOGIN FAILED ==========");
            e.printStackTrace();

            response.sendRedirect("http://localhost:5173/login");

        }
    }
}