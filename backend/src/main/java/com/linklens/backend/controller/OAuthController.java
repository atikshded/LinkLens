package com.linklens.backend.controller;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Hidden
public class OAuthController {

    @GetMapping("/oauth/success")
    public String loginSuccess(Authentication authentication) {

        return "Google Login Successful!\n\nLogged in as: "
                + authentication.getName();
    }
}