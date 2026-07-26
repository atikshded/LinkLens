package com.linklens.backend.util;

public class UrlUtil {

    public static String normalizeUrl(String url) {

        if (url == null || url.isBlank()) {
            return url;
        }

        url = url.trim();

        if (!url.startsWith("http://") &&
                !url.startsWith("https://")) {

            url = "https://" + url;
        }

        return url;
    }
}