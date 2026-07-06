package com.linklens.backend.util;

import java.security.SecureRandom;

public class ShortCodeGenerator {

    private static final String CHARACTERS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    private static final int LENGTH = 6;

    private static final SecureRandom random = new SecureRandom();

    public static String generate() {

        StringBuilder code = new StringBuilder();

        for (int i = 0; i < LENGTH; i++) {

            int index = random.nextInt(CHARACTERS.length());

            code.append(CHARACTERS.charAt(index));
        }

        return code.toString();
    }
}