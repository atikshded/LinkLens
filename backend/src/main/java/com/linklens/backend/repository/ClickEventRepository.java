package com.linklens.backend.repository;

import com.linklens.backend.entity.ClickEvent;
import com.linklens.backend.entity.Link;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClickEventRepository extends JpaRepository<ClickEvent, Long> {

    List<ClickEvent> findByLink(Link link);

    long countByLink(Link link);

    List<ClickEvent> findByLinkOrderByClickedAtDesc(Link link);

    List<ClickEvent> findAllByLink(Link link);

}