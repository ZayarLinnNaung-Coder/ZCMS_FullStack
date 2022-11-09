package com.devz.zcms.exception;

import com.devz.zcms.domain.CustomHttpResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.time.ZoneId;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(DataDuplicateException.class)
    public ResponseEntity<CustomHttpResponse> dataDuplicateException(DataDuplicateException exception){
        return createHttpResponse(HttpStatus.CONFLICT, exception.getMessage());
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<CustomHttpResponse> forbiddenException(ForbiddenException exception){
        return createHttpResponse(HttpStatus.FORBIDDEN, exception.getMessage());
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<CustomHttpResponse> usernameNotFoundException(UsernameNotFoundException exception){
        return createHttpResponse(HttpStatus.NOT_FOUND, exception.getMessage());
    }

    @ExceptionHandler(JwtAuthenticationException.class)
    public ResponseEntity<CustomHttpResponse> jwtAuthenticationException(JwtAuthenticationException exception){
        return createHttpResponse(HttpStatus.FORBIDDEN, exception.getMessage());
    }

    private ResponseEntity<CustomHttpResponse> createHttpResponse(HttpStatus httpStatus, String message){
        CustomHttpResponse httpResponse = new CustomHttpResponse(
                LocalDateTime.now(ZoneId.of("Asia/Yangon")), httpStatus.value(), httpStatus.getReasonPhrase(), message
        );
        return new ResponseEntity<>(httpResponse, httpStatus);
    }
}
