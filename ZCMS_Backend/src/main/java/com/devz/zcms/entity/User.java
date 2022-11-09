package com.devz.zcms.entity;

import com.devz.zcms.enumumeration.Authority;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "user")
@Data
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String username;

    private String password;

    @Indexed(unique = true)
    private String email;

    private String firstName;
    private String lastName;
    private List<Authority> authorities;
    private boolean enabled;

}
