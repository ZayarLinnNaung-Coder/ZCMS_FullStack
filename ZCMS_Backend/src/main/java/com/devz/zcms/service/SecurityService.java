package com.devz.zcms.service;

import reactor.core.publisher.Mono;

public interface SecurityService {
    Mono<String> authenticate(String username, String password);
}
