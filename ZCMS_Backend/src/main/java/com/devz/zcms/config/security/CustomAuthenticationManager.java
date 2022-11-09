package com.devz.zcms.config.security;

import com.devz.zcms.entity.User;
import com.devz.zcms.exception.ForbiddenException;
import com.devz.zcms.exception.UnauthorizedException;
import com.devz.zcms.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@AllArgsConstructor
public class CustomAuthenticationManager implements ReactiveAuthenticationManager {

    private final Logger logger = LoggerFactory.getLogger(CustomAuthenticationManager.class);
    private final UserService userService;

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        String username = authentication.getPrincipal().toString();
        return userService.findUserByUsername(username)
                .switchIfEmpty(Mono.error(new UnauthorizedException("User not found")))
                .filter(User::isEnabled)
                .switchIfEmpty(Mono.error(new ForbiddenException("Account is locked")))
                .map(user -> authentication);
    }
}
