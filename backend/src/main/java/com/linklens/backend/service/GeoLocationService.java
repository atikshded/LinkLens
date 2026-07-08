package com.linklens.backend.service;

import com.linklens.backend.dto.GeoLocationResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeoLocationService {

    @Value("${geo.api.base-url}")
    private String geoApiUrl;

    private final RestTemplate restTemplate =
            new RestTemplate();

    public GeoLocationResponse getLocation(String ipAddress) {

        try {
            return restTemplate.getForObject(
                    geoApiUrl + "/" + ipAddress,
                    GeoLocationResponse.class
            );
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}