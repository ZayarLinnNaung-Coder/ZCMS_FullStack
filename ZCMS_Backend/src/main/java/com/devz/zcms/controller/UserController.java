package com.devz.zcms.controller;

import com.devz.zcms.entity.User;
import com.devz.zcms.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    Mono<User> findUserByUsername(@RequestParam String username){
        return userService.findUserByUsername(username);
    }
}
