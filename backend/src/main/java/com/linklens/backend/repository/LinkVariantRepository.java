package com.linklens.backend.repository;

import com.linklens.backend.entity.LinkVariant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LinkVariantRepository
        extends JpaRepository<LinkVariant, Long> {
}