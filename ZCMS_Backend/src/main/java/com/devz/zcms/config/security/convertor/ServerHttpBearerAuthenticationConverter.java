package com.devz.zcms.config.security.convertor;

import com.devz.zcms.exception.ForbiddenException;
import com.devz.zcms.util.JwtHandler;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.function.Function;

import static com.devz.zcms.constant.SecurityConstant.BEARER;

@Component
@AllArgsConstructor
public class ServerHttpBearerAuthenticationConverter implements Function<ServerWebExchange, Mono<Authentication>> {


    @Value("${app.public_routes}")
    private final String[] publicRoutes;
    private final JwtHandler jwtHandler;
    private final Logger logger = LoggerFactory.getLogger(ServerHttpBearerAuthenticationConverter.class);

    @Override
    public Mono<Authentication> apply(ServerWebExchange serverWebExchange) {
        return Mono.justOrEmpty(serverWebExchange)
                    .filter(exchange -> !exchange.getRequest().getURI().toString().contains("/files/"))
                    .flatMap(ServerHttpBearerAuthenticationConverter::extract)
                    .filter(authValue -> authValue.length() > BEARER.length())
                    .flatMap(
                            authValue -> Mono.justOrEmpty(authValue.substring(BEARER.length()))
                    )
                    .flatMap(jwtHandler::validateAndGetAuthentication)
                    .onErrorResume(throwable -> Mono.error(new ForbiddenException("Perhaps Invalid JWT Token.")));
    }

    public static Mono<String> extract(ServerWebExchange serverWebExchange) {
        System.out.println(serverWebExchange.getRequest().getURI());
        return Mono.justOrEmpty(serverWebExchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION));
    }
}
