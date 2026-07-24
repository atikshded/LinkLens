package com.linklens.backend.repository;

import com.linklens.backend.entity.ClickEvent;
import com.linklens.backend.entity.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface ClickEventRepository extends JpaRepository<ClickEvent, Long> {

    @Modifying
    void deleteByLink(Link link);

    List<ClickEvent> findByLink(Link link);

    long countByLink(Link link);

    List<ClickEvent> findByLinkOrderByClickedAtDesc(Link link);

    List<ClickEvent> findAllByLink(Link link);

    List<ClickEvent> findByLinkIn(List<Link> links);



}