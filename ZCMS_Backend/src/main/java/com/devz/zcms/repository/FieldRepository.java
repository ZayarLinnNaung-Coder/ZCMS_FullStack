package com.devz.zcms.repository;

import com.devz.zcms.entity.Field;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface FieldRepository extends ReactiveMongoRepository<Field, String> {
    Flux<Field> findFieldByContentModelId(String contentModelId);
}
