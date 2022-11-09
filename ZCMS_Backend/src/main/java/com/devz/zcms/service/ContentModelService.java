package com.devz.zcms.service;

import com.devz.zcms.entity.ContentModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ContentModelService {
    Flux<ContentModel> getAllContentModels();
    Flux<ContentModel> findAllContentModelsById(String userId);
    Mono<ContentModel> createNewContentModel(ContentModel contentModel);
    Mono<ContentModel> updateContentModel(ContentModel contentModel);
    Mono<Void> deleteContentModelById(String id);
}
