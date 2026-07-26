package com.linklens.backend.service;

import com.linklens.backend.dto.DailyClickResponse;
import com.linklens.backend.dto.LinkAnalyticsResponse;
import com.linklens.backend.dto.VariantPerformanceResponse;
import com.linklens.backend.entity.ClickEvent;
import com.linklens.backend.entity.Link;
import com.linklens.backend.exception.ResourceNotFoundException;
import com.linklens.backend.repository.ClickEventRepository;
import com.linklens.backend.repository.LinkRepository;
import com.linklens.backend.repository.LinkVariantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import com.linklens.backend.service.model.AnalyticsData;

@Service
public class AnalyticsService {

    private final LinkRepository linkRepository;
    private final ClickEventRepository clickEventRepository;
    private final LinkVariantRepository linkVariantRepository;

    public AnalyticsService(
            LinkRepository linkRepository,
            ClickEventRepository clickEventRepository,
            LinkVariantRepository linkVariantRepository) {

        this.linkRepository = linkRepository;
        this.clickEventRepository = clickEventRepository;
        this.linkVariantRepository = linkVariantRepository;
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
                osDistribution,
                "http://localhost:8081/r/" + link.getShortCode(),
                link.getOriginalUrl()
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

    public List<VariantPerformanceResponse> getVariantPerformance(Long linkId) {

        // Verify the link exists
        linkRepository.findById(linkId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Link not found"));

        return linkVariantRepository.findByLinkId(linkId)
                .stream()
                .map(variant -> new VariantPerformanceResponse(
                        variant.getId(),
                        variant.getDestinationUrl(),
                        variant.getWeight(),
                        variant.getClickCount()
                ))
                .toList();
    }

    public AnalyticsData getAnalyticsData(Long linkId) {

        LinkAnalyticsResponse analytics = getAnalytics(linkId);

        List<DailyClickResponse> dailyClicks = getDailyClicks(linkId);

        List<VariantPerformanceResponse> variants =
                getVariantPerformance(linkId);

        AnalyticsData data = new AnalyticsData();

        data.setTotalClicks(analytics.getTotalClicks());
        data.setLastClickedAt(analytics.getLastClickedAt());
        data.setTopBrowser(analytics.getTopBrowser());
        data.setTopOperatingSystem(analytics.getTopOperatingSystem());
        data.setBrowserDistribution(analytics.getBrowserDistribution());
        data.setOperatingSystemDistribution(
                analytics.getOperatingSystemDistribution());
        data.setOriginalUrl(analytics.getOriginalUrl());
        data.setShortUrl(analytics.getShortUrl());

        data.setDailyClicks(dailyClicks);
        data.setVariants(variants);

        return data;
    }
}