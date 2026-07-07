package com.linklens.backend.service;

import com.linklens.backend.dto.DailyClickResponse;
import com.linklens.backend.dto.LinkAnalyticsResponse;
import com.linklens.backend.entity.ClickEvent;
import com.linklens.backend.entity.Link;
import com.linklens.backend.exception.ResourceNotFoundException;
import com.linklens.backend.repository.ClickEventRepository;
import com.linklens.backend.repository.LinkRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private final LinkRepository linkRepository;
    private final ClickEventRepository clickEventRepository;

    public AnalyticsService(LinkRepository linkRepository,
                            ClickEventRepository clickEventRepository) {
        this.linkRepository = linkRepository;
        this.clickEventRepository = clickEventRepository;
    }

    public LinkAnalyticsResponse getAnalytics(Long linkId) {

        Link link = linkRepository.findById(linkId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Link not found"));

        List<ClickEvent> events =
                clickEventRepository.findByLinkOrderByClickedAtDesc(link);

        long totalClicks = clickEventRepository.countByLink(link);

        String topBrowser = getMostFrequent(
                events,
                ClickEvent::getBrowser
        );

        String topOS = getMostFrequent(
                events,
                ClickEvent::getOperatingSystem
        );

        Map<String, Long> browserDistribution =
                getDistribution(events, ClickEvent::getBrowser);

        Map<String, Long> osDistribution =
                getDistribution(events, ClickEvent::getOperatingSystem);

        return new LinkAnalyticsResponse(
                totalClicks,
                events.isEmpty() ? null : events.get(0).getClickedAt(),
                topBrowser,
                topOS,
                browserDistribution,
                osDistribution
        );
    }

    private String getMostFrequent(
            List<ClickEvent> events,
            Function<ClickEvent, String> extractor) {

        return events.stream()
                .map(extractor)
                .filter(value -> value != null && !value.isBlank())
                .collect(Collectors.groupingBy(
                        Function.identity(),
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");
    }

    private Map<String, Long> getDistribution(
            List<ClickEvent> events,
            Function<ClickEvent, String> extractor) {

        return events.stream()
                .map(extractor)
                .filter(value -> value != null && !value.isBlank())
                .collect(Collectors.groupingBy(
                        Function.identity(),
                        Collectors.counting()
                ));
    }

    public List<DailyClickResponse> getDailyClicks(Long linkId) {

        Link link = linkRepository.findById(linkId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Link not found"));

        List<ClickEvent> events =
                clickEventRepository.findAllByLink(link);

        Map<String, Long> grouped =
                events.stream()
                        .collect(Collectors.groupingBy(
                                event -> event.getClickedAt()
                                        .toLocalDate()
                                        .toString(),
                                Collectors.counting()
                        ));

        return grouped.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry ->
                        new DailyClickResponse(
                                entry.getKey(),
                                entry.getValue()
                        ))
                .toList();
    }
}