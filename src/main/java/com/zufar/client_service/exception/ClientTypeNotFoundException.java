package com.zufar.client_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ClientTypeNotFoundException extends RuntimeException {

    public ClientTypeNotFoundException() {
        super();
    }
    public ClientTypeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    public ClientTypeNotFoundException(String message) {
        super(message);
    }
    public ClientTypeNotFoundException(Throwable cause) {
        super(cause);
    }
}
