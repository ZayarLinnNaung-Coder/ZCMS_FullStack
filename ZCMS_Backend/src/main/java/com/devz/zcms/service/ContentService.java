package com.devz.zcms.service;

import com.devz.zcms.entity.Content;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ContentService {
    Mono<Content> createNewContent(Content content);
    Flux<Content> getAllContentsByContentModelId(String contentModelId);
    Flux<Content> getAllContents();
    Mono<Content> updateContent(Content content);
    Mono<Void> deleteContentByContentId(String id);
}
