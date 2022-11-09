package com.devz.zcms.service.impl;

import com.devz.zcms.util.JwtHandler;
import com.devz.zcms.domain.UserPrinciple;
import com.devz.zcms.entity.User;
import com.devz.zcms.exception.ForbiddenException;
import com.devz.zcms.service.SecurityService;
import com.devz.zcms.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

@Service
@Transactional
@AllArgsConstructor
public class SecurityServiceImpl implements SecurityService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtHandler jwtHandler;

    private final Logger logger = LoggerFactory.getLogger(SecurityServiceImpl.class);

    @Override
    public Mono<String> authenticate(String username, String password) {
        return userService.findUserByUsername(username)
                .flatMap(user -> {
                    if(!user.isEnabled()){
                        return Mono.error(new ForbiddenException("Account is locked."));

                    }else if(!passwordEncoder.matches(password, user.getPassword())){
                        return Mono.error(new ForbiddenException("Invalid credentials."));
                    }

                    return Mono.just(generateAccessToken(user));
                });
    }

    private String generateAccessToken(User user) {
        return jwtHandler.generateJwtToken(new UserPrinciple(user));
    }


}
