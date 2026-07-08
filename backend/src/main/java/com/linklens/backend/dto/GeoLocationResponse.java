package com.linklens.backend.dto;

import lombok.Data;

@Data
public class GeoLocationResponse {

    private String country;
    private String regionName;
    private String city;
    private Double lat;
    private Double lon;
}