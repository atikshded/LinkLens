package com.linklens.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "links")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Link {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String originalUrl;

    @Column(nullable = false, unique = true)
    private String shortCode;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    @Column(nullable = false)
    private Long clickCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")

    private User user;
    @OneToMany(
            mappedBy = "link",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<LinkVariant> variants = new ArrayList<>();
    @OneToMany(
            mappedBy = "link",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ClickEvent> clickEvents = new ArrayList<>();
}