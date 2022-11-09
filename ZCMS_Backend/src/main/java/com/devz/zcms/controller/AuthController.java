package com.devz.zcms.controller;

import com.devz.zcms.domain.CustomHttpResponse;
import com.devz.zcms.dto.UserLoginDto;
import com.devz.zcms.entity.User;
import com.devz.zcms.exception.ForbiddenException;
import com.devz.zcms.service.SecurityService;
import com.devz.zcms.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.ZoneId;

import static com.devz.zcms.constant.SecurityConstant.JWT_TOKEN_HEADER;

@RestController
@CrossOrigin
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final UserService userService;
    private final SecurityService securityService;

    @PostMapping("/register")
    public Mono<User> register(@RequestBody User newUser){
        return userService.register(newUser);
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<CustomHttpResponse>> login(@RequestBody UserLoginDto user){
        return securityService.authenticate(user.getUsername(), user.getPassword())
                .onErrorResume(throwable -> Mono.error(new ForbiddenException("Fail to login")))
                .switchIfEmpty(Mono.error(new UsernameNotFoundException("User does not exist")))
                .map(token ->
                        new ResponseEntity<>(
                                createHttpResponse(HttpStatus.OK, "Successfully Login"),
                                getJwtHeader(token), HttpStatus.OK
                        )
                );
    }

    private HttpHeaders getJwtHeader(String token) {
        HttpHeaders jwtHeader = new HttpHeaders();
        jwtHeader.add(JWT_TOKEN_HEADER, token);
        return jwtHeader;
    }

    private CustomHttpResponse createHttpResponse(HttpStatus httpStatus, String message){
        return new CustomHttpResponse(
                LocalDateTime.now(ZoneId.of("Asia/Yangon")), httpStatus.value(), httpStatus.getReasonPhrase(), message
        );
    }

}
