package com.devz.zcms.repository;

import com.devz.zcms.entity.ContentModel;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface ContentModelRepository extends ReactiveMongoRepository<ContentModel, String> {
    Flux<ContentModel> findContentModelByUserId(String userId);
}
