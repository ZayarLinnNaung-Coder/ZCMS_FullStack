package com.devz.zcms.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "content_model")
@Data
public class ContentModel {
    @Id
    private String id;
    private String name;
    private String apiIdentifier;
    private String description;
    @DBRef
    private User user;
}
