package com.devz.zcms.entity;

import com.devz.zcms.enumumeration.FieldType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "field")
public class Field {
    @Id
    private String id;
    private String name;
    private FieldType type;
    private String data;
    private String description;
    @DBRef
    private ContentModel contentModel;
}
