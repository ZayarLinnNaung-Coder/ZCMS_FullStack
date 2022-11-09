package com.devz.zcms.entity;

import com.devz.zcms.enumumeration.Status;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "content")
@Data
public class Content {
    @Id
    private String id;
    private String title;
    private List<Field> fields;
    private Date createdDate;
    private Date updatedDate;
    private Status publishStatus;
    @DBRef
    private ContentModel contentModel;
    @DBRef
    private User createdUser;
}
