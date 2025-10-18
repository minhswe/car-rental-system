package com.github.minhswe.carrental.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T>{
    private final boolean success;
    private final int code;
    private final String message;
    private final T data;

    public static <T> ResponseEntity<ApiResponse<T>> success(String message, T data){
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        HttpStatus.OK.value(),
                        message,
                        data
                )
        );
    }

    public static <T> ResponseEntity<ApiResponse<T>> created(String message, T data){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, HttpStatus.CREATED.value(), message, data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> error (HttpStatus code, String message, T data){
        return ResponseEntity.status(code)
                .body(new ApiResponse<>(false, code.value(), message, data));
    }
}
