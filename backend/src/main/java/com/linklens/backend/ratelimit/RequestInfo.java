package com.linklens.backend.ratelimit;

public class RequestInfo {

    private int count;

    private long windowStart;

    public RequestInfo(int count, long windowStart) {
        this.count = count;
        this.windowStart = windowStart;
    }

    public int getCount() {
        return count;
    }

    public void increment() {
        count++;
    }

    public long getWindowStart() {
        return windowStart;
    }

    public void reset(long newWindowStart) {
        count = 1;
        windowStart = newWindowStart;
    }
}