package com.linklens.backend.ratelimit;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Value;

@Service
public class RateLimiterService {

    @Value("${rate.limit.max-requests}")
    private int maxRequests;

    @Value("${rate.limit.window-seconds}")
    private long windowSeconds;

    private final ConcurrentHashMap<String, RequestInfo> requests =
            new ConcurrentHashMap<>();

    public boolean allowRequest(String ipAddress) {

        long now = Instant.now().getEpochSecond();

        RequestInfo info = requests.get(ipAddress);

        if (info == null) {
            requests.put(ipAddress, new RequestInfo(1, now));
            return true;
        }

        if (now - info.getWindowStart() >= windowSeconds) {
            info.reset(now);
            return true;
        }

        if (info.getCount() < maxRequests) {
            info.increment();
            return true;
        }

        return false;
    }

    @Scheduled(fixedRate = 300000)
    public void cleanup() {

        long now = Instant.now().getEpochSecond();

        requests.entrySet().removeIf(entry ->
                now - entry.getValue().getWindowStart()
                        >= windowSeconds);
    }
}