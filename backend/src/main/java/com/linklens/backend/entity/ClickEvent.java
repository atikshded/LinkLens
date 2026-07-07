package com.linklens.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "click_events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClickEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime clickedAt;

    private String browser;

    private String browserVersion;

    private String operatingSystem;

    private String deviceType;

    private String country;

    private String state;

    private String city;

    private String ipAddress;

    private String referrer;

    private String userAgent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "link_id")
    private Link link;
}