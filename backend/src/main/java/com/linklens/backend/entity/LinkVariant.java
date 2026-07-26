package com.linklens.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "link_variants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LinkVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String destinationUrl;

    @Column(nullable = false)
    private Integer weight;

    @Builder.Default
    @Column(nullable = false)
    private Long clickCount = 0L;

    @Builder.Default
    @Column(nullable = false)
    private Boolean active = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "link_id", nullable = false)
    private Link link;
}