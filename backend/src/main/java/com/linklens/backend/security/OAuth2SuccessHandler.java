package com.linklens.backend.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.security.oauth2.core.user.OAuth2User;
import java.io.IOException;
import com.linklens.backend.entity.AuthProvider;
import com.linklens.backend.entity.User;
import com.linklens.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class OAuth2SuccessHandler
        extends SimpleUrlAuthenticationSuccessHandler {

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
            Authentication authentication)
            throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();


        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {

                    User newUser = User.builder()
                            .name(name)
                            .email(email)
                            .password(
                                    passwordEncoder.encode(
                                            UUID.randomUUID().toString()
                                    )
                            )
                            .provider(AuthProvider.GOOGLE)
                            .createdAt(LocalDateTime.now())
                            .build();

                    return userRepository.save(newUser);
                });

        // Existing LOCAL account logging in with Google
        if (user.getProvider() == AuthProvider.LOCAL) {

            System.out.println(
                    "Existing LOCAL account authenticated via Google."
            );
        }

        String token = jwtService.generateToken(user.getEmail());
        response.setContentType("text/html");

        response.getWriter().write("""
        <h2>Google Login Successful!</h2>

        <h3>JWT</h3>

        <p>
        """ + token + "</p>");
    }
}
