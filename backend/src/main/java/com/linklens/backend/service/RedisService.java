package com.linklens.backend.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Service
public class RedisService {

    private final StringRedisTemplate redisTemplate;

    public RedisService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveUrl(String shortCode, String originalUrl) {

        redisTemplate.opsForValue().set(
                shortCode,
                originalUrl,
                Duration.ofHours(1)
        );
    }

    public String getUrl(String shortCode) {

        return redisTemplate.opsForValue().get(shortCode);
    }

    public void deleteUrl(String shortCode) {

        redisTemplate.delete(shortCode);
    }

    public boolean allowRequest(
            String ipAddress,
            int maxRequests,
            long windowSeconds) {

        String key = "rate_limit:" + ipAddress;

        Long count = redisTemplate.opsForValue().increment(key);

        if (count == null) {
            return false;
        }

        if (count == 1) {
            redisTemplate.expire(
                    key,
                    windowSeconds,
                    TimeUnit.SECONDS
            );
        }

        return count <= maxRequests;
    }

}