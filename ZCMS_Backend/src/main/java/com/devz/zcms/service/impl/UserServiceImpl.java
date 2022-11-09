package com.devz.zcms.service.impl;

import com.devz.zcms.entity.User;
import com.devz.zcms.exception.DataDuplicateException;
import com.devz.zcms.repository.UserRepository;
import com.devz.zcms.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import static com.devz.zcms.enumumeration.Authority.*;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Mono<User> register(User newUser) {
        newUser.setAuthorities(List.of(READ, WRITE, DELETE, UPDATE));
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setEnabled(true);
        return userRepository.insert(newUser)
                .onErrorResume(throwable -> {
                    String keyName = getDuplicateKeyName(throwable.getMessage());
                    return Mono.error(new DataDuplicateException(keyName + " already exists."));
                })
                .switchIfEmpty(userRepository.insert(newUser));
    }

    @Override
    public Mono<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    private String getDuplicateKeyName(String message) {
        String result = "";
        String[] x = message.split("index: ");
        if(x.length > 1) result = x[x.length - 1].split(" ")[0];
        return result;
    }
}
