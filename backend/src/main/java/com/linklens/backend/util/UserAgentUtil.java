package com.linklens.backend.util;

import ua_parser.Client;
import ua_parser.Parser;

public class UserAgentUtil {

    private static final Parser parser = new Parser();

    public static Client parse(String userAgent) {

        if (userAgent == null || userAgent.isBlank()) {
            return null;
        }

        return parser.parse(userAgent);
    }
}