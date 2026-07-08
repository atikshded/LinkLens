package com.linklens.backend.util;

import java.util.Set;
import java.util.regex.Pattern;

public class AliasValidator {

    private static final Pattern PATTERN =
            Pattern.compile("^[a-zA-Z0-9_-]{3,30}$");

    private static final Set<String> RESERVED =
            Set.of(
                    "api",
                    "auth",
                    "login",
                    "register",
                    "admin",
                    "links",
                    "qr"
            );

    public static boolean isValid(String alias) {

        if (!PATTERN.matcher(alias).matches()) {
            return false;
        }

        return !RESERVED.contains(alias.toLowerCase());
    }
}