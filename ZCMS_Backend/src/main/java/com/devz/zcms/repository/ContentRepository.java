package com.devz.zcms.repository;

import com.devz.zcms.entity.Content;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface ContentRepository extends ReactiveCrudRepository<Content, String> {
    Flux<Content> findContentByContentModelId(String contentModelId);
}
