package com.devz.zcms.service.impl;

import com.devz.zcms.entity.ContentModel;
import com.devz.zcms.repository.ContentModelRepository;
import com.devz.zcms.service.ContentModelService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Transactional
@AllArgsConstructor
public class ContentModelServiceImpl implements ContentModelService {

    private final ContentModelRepository contentModelRepository;

    @Override
    public Flux<ContentModel> getAllContentModels() {
        return contentModelRepository.findAll();
    }

    @Override
    public Flux<ContentModel> findAllContentModelsById(String userId) {
        return contentModelRepository.findContentModelByUserId(userId);
    }

    @Override
    public Mono<ContentModel> createNewContentModel(ContentModel contentModel) {
        return contentModelRepository.save(contentModel);
    }

    @Override
    public Mono<ContentModel> updateContentModel(ContentModel contentModel) {
        return contentModelRepository.save(contentModel);
    }

    @Override
    public Mono<Void> deleteContentModelById(String id) {
        return contentModelRepository.deleteById(id);
    }
}
