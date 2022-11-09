package com.devz.zcms.service;

import com.devz.zcms.entity.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserService {
    Mono<User> register(User newUser);
    Mono<User> findUserByUsername(String username);
}
