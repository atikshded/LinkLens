package com.linklens.backend.repository;

import com.linklens.backend.entity.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import com.linklens.backend.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import java.util.Optional;

public interface LinkRepository extends JpaRepository<Link, Long> {

    Optional<Link> findByShortCode(String shortCode);

    boolean existsByShortCode(String shortCode);

    List<Link> findByUser(User user);

    long countByUser(User user);

    @Modifying
    void deleteByUser(User user);

}