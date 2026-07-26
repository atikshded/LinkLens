package com.linklens.backend.exception;

public class LinkExpiredException extends RuntimeException {

    public LinkExpiredException(String message) {
        super(message);
    }
}