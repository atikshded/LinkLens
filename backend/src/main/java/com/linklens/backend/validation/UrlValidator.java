package com.linklens.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.net.URI;

public class UrlValidator implements ConstraintValidator<ValidUrl, String> {

    @Override
    public boolean isValid(String url,
                           ConstraintValidatorContext context) {

        if (url == null || url.isBlank()) {
            return true;
        }

        try {

            URI uri = new URI(url);

            String scheme = uri.getScheme();

            return ("http".equalsIgnoreCase(scheme)
                    || "https".equalsIgnoreCase(scheme))
                    && uri.getHost() != null;

        } catch (Exception e) {
            return false;
        }
    }
}