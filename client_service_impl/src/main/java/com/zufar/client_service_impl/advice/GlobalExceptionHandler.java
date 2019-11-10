package com.zufar.client_service_impl.advice;

import com.zufar.order_management_system_common.dto.OperationResult;
import com.zufar.order_management_system_common.exception.ClientNotFoundException;
import com.zufar.order_management_system_common.exception.InternalServerException;
import com.zufar.order_management_system_common.exception.OrderNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ControllerAdvice
public class GlobalExceptionHandler {

    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss");

    @ExceptionHandler({ClientNotFoundException.class, OrderNotFoundException.class})
    public final ResponseEntity<OperationResult> handleException(RuntimeException ex) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        return ResponseEntity.status(status)
                .body(OperationResult.builder()
                        .timestamp(LocalDateTime.now().format(formatter))
                        .message(ex.getMessage())
                        .status(HttpStatus.NOT_FOUND.toString())
                        .build());
    }

    @ExceptionHandler({InternalServerException.class})
    public final ResponseEntity<OperationResult> handleException(InternalServerException ex) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        return ResponseEntity.status(status)
                .body(OperationResult.builder()
                        .timestamp(LocalDateTime.now().format(formatter))
                        .message(ex.getMessage() + "Try again later.")
                        .status(HttpStatus.NOT_FOUND.toString())
                        .build());
    }

    @ExceptionHandler({Exception.class})
    public final ResponseEntity<OperationResult> handleException() {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        return ResponseEntity.status(status)
                .body(OperationResult.builder()
                        .timestamp(LocalDateTime.now().format(formatter))
                        .message("There is some internal error. Try again later.")
                        .status(HttpStatus.NOT_FOUND.toString())
                        .build());
    }
}
