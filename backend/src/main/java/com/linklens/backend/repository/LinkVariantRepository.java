package com.linklens.backend.repository;

import com.linklens.backend.entity.LinkVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LinkVariantRepository
        extends JpaRepository<LinkVariant, Long> {

    List<LinkVariant> findByLinkId(Long linkId);
    void deleteByLinkId(Long linkId);
    Optional<LinkVariant> findByIdAndLinkId(Long id, Long linkId);
    void deleteByIdAndLinkId(Long id, Long linkId);

}