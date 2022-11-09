package com.devz.zcms.service;

import com.devz.zcms.entity.Field;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface FieldService {
    Flux<Field> findAllFields();
    Flux<Field> findFieldsByContentModelId(String contentModelId);
    Mono<Field> createNewField(Field newField);
    Mono<Field> updateExistingField(Field existingField);
    Mono<Void> deleteField(String id);
}
