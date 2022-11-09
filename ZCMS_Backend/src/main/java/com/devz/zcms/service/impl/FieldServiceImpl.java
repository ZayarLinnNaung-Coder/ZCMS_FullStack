package com.devz.zcms.service.impl;

import com.devz.zcms.entity.Field;
import com.devz.zcms.repository.FieldRepository;
import com.devz.zcms.service.FieldService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Transactional
@AllArgsConstructor
public class FieldServiceImpl implements FieldService {

    private FieldRepository fieldRepository;

    @Override
    public Flux<Field> findAllFields() {
        return fieldRepository.findAll();
    }

    @Override
    public Flux<Field> findFieldsByContentModelId(String contentModelId) {
        return fieldRepository.findFieldByContentModelId(contentModelId);
    }

    @Override
    public Mono<Field> createNewField(Field newField) {
        return fieldRepository.insert(newField);
    }

    @Override
    public Mono<Field> updateExistingField(Field existingField) {
        return fieldRepository.save(existingField);
    }

    @Override
    public Mono<Void> deleteField(String id) {
        return fieldRepository.deleteById(id);
    }
}
