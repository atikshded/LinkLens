package com.linklens.backend.service;
import com.linklens.backend.dto.DailyClickResponse;
import com.linklens.backend.dto.RecentLinkResponse;
import com.linklens.backend.repository.ClickEventRepository;
import com.linklens.backend.repository.LinkRepository;
import com.linklens.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.linklens.backend.dto.DashboardResponse;
import com.linklens.backend.entity.ClickEvent;
import com.linklens.backend.entity.Link;
import com.linklens.backend.entity.User;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.util.LinkedHashMap;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final LinkRepository linkRepository;
    private final ClickEventRepository clickEventRepository;
    private final UserService userService;

    public DashboardResponse getDashboard() {

        User user = userService.getCurrentUser();

        List<Link> links = linkRepository.findByUser(user);

        List<ClickEvent> events =
                clickEventRepository.findByLinkIn(links);

        long totalClicks = links.stream()
                .mapToLong(Link::getClickCount)
                .sum();

        List<RecentLinkResponse> recentLinks = links.stream()
                .sorted((l1, l2) -> l2.getCreatedAt().compareTo(l1.getCreatedAt()))
                .limit(5)
                .map(link -> RecentLinkResponse.builder()
                        .id(link.getId())
                        .shortUrl("http://localhost:8081/r/" + link.getShortCode())
                        .originalUrl(link.getOriginalUrl())
                        .clickCount(link.getClickCount())
                        .createdAt(link.getCreatedAt())
                        .build())
                .toList();

        String topBrowser =
                getMostFrequent(events, ClickEvent::getBrowser);

        String topOperatingSystem =
                getMostFrequent(events, ClickEvent::getOperatingSystem);

        Map<String, Long> browserDistribution =
                getDistribution(events, ClickEvent::getBrowser);

        List<DailyClickResponse> clicksLast7Days =
                getLast7DaysClicks(events);

        return DashboardResponse.builder()
                .totalLinks((long) links.size())
                .totalClicks(totalClicks)
                .topBrowser(topBrowser)
                .topOperatingSystem(topOperatingSystem)
                .browserDistribution(browserDistribution)
                .clicksLast7Days(clicksLast7Days)
                .recentLinks(recentLinks)
                .build();
    }

    private String getMostFrequent(
            List<ClickEvent> events,
            Function<ClickEvent, String> extractor) {

        return events.stream()
                .map(extractor)
                .map(browser ->
                        browser != null && browser.equalsIgnoreCase("Electron")
                                ? "Chrome"
                                : browser
                )
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
                .map(browser ->
                        browser != null && browser.equalsIgnoreCase("Electron")
                                ? "Chrome"
                                : browser
                )
                .filter(value -> value != null && !value.isBlank())
                .collect(Collectors.groupingBy(
                        Function.identity(),
                        Collectors.counting()
                ));
    }

    private List<DailyClickResponse> getLast7DaysClicks(List<ClickEvent> events) {

        Map<String, Long> clicks = new LinkedHashMap<>();

        for (int i = 6; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            clicks.put(date.toString(), 0L);
        }

        events.forEach(event -> {
            String date = event.getClickedAt().toLocalDate().toString();

            if (clicks.containsKey(date)) {
                clicks.put(date, clicks.get(date) + 1);
            }
        });

        return clicks.entrySet()
                .stream()
                .map(entry ->
                        new DailyClickResponse(
                                entry.getKey(),
                                entry.getValue()
                        ))
                .toList();
    }
}