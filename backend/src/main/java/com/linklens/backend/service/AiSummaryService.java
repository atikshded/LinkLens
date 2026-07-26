package com.linklens.backend.service;

import com.linklens.backend.service.model.AnalyticsData;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import com.linklens.backend.dto.AiSummaryResponse;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.List;
import com.linklens.backend.dto.DailyClickResponse;
import com.linklens.backend.dto.VariantPerformanceResponse;

@Service
public class AiSummaryService {

    private final ChatClient chatClient;
    private final AnalyticsService analyticsService;

    public AiSummaryService(ChatClient chatClient,
                            AnalyticsService analyticsService) {
        this.chatClient = chatClient;
        this.analyticsService = analyticsService;
    }

    public String testAi() {

        return chatClient
                .prompt("Say Hello! Spring AI is working.")
                .call()
                .content();
    }

    public AiSummaryResponse generateSummary(Long linkId) {

        AnalyticsData data = analyticsService.getAnalyticsData(linkId);
        String browserDistribution =
                formatDistribution(data.getBrowserDistribution());

        String operatingSystemDistribution =
                formatDistribution(data.getOperatingSystemDistribution());

        String dailyClicks =
                formatDailyClicks(data.getDailyClicks());

        String variants =
                formatVariants(data.getVariants());


        String prompt = """
                You are a senior web analytics consultant.

                Analyze the analytics provided below.

                Generate a concise report using EXACTLY the following structure.

                Summary
                Write 2-3 sentences summarizing the overall performance.

                Traffic Insights
                Write 3-5 bullet points describing:
                - click trends
                - browser usage
                - operating system usage

                A/B Testing
                Write 2-3 bullet points about variant performance.
                If no variants exist, explicitly state that A/B testing has not been configured.

                Recommendations
                Write exactly 3 practical recommendations.

                Rules:

                - Do NOT use Markdown.
                - Do NOT use ## or ###.
                - Do NOT use bold formatting.
                - Use plain text headings exactly as shown above.
                - Keep the entire response under 180 words.
                - If there are fewer than 50 clicks, clearly mention that the sample size is limited and conclusions are preliminary.
                - Do not invent information.
                - Base every conclusion only on the analytics provided.

                Analytics

                Total Clicks:
                %d

                Top Browser:
                %s

                Top Operating System:
                %s

                Browser Distribution:
                %s

                Operating System Distribution:
                %s

                Daily Clicks:
                %s

                A/B Testing:
                %s
                """.formatted(
                data.getTotalClicks(),
                data.getTopBrowser(),
                data.getTopOperatingSystem(),
                browserDistribution,
                operatingSystemDistribution,
                dailyClicks,
                variants
        );


        try {

            String summary = chatClient
                    .prompt(prompt)
                    .call()
                    .content();

            return new AiSummaryResponse(summary);
        } catch (Exception e) {

            e.printStackTrace();

            return new AiSummaryResponse(
                    "AI insights are temporarily unavailable. Please try again in a few moments."
            );
        }
    }

    private String formatDistribution(Map<String, Long> distribution) {

        if (distribution == null || distribution.isEmpty()) {
            return "No data available.";
        }

        return distribution.entrySet()
                .stream()
                .map(entry ->
                        entry.getKey() + ": " + entry.getValue())
                .collect(Collectors.joining("\n"));
    }

    private String formatDailyClicks(List<DailyClickResponse> dailyClicks) {

        if (dailyClicks == null || dailyClicks.isEmpty()) {
            return "No daily click data available.";
        }

        return dailyClicks.stream()
                .map(click ->
                        click.getDate() + " : " +
                                click.getClicks() + " clicks")
                .collect(Collectors.joining("\n"));
    }

    private String formatVariants(List<VariantPerformanceResponse> variants) {

        if (variants == null || variants.isEmpty()) {
            return "No A/B variants configured.";
        }

        return variants.stream()
                .map(v ->
                        "Variant " + v.getId() +
                                " | Weight: " + v.getWeight() +
                                " | Clicks: " + v.getClickCount())
                .collect(Collectors.joining("\n"));
    }
}