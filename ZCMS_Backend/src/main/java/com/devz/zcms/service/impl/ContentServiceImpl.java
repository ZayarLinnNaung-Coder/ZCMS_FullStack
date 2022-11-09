package com.devz.zcms.service.impl;

import com.devz.zcms.entity.Content;
import com.devz.zcms.repository.ContentRepository;
import com.devz.zcms.service.ContentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
@Transactional
public class ContentServiceImpl implements ContentService {

    private final ContentRepository contentRepository;

    @Override
    public Mono<Content> createNewContent(Content content) {
        return contentRepository.save(content);
    }

    @Override
    public Flux<Content> getAllContentsByContentModelId(String contentModelId) {
        return contentRepository.findContentByContentModelId(contentModelId);
    }

    @Override
    public Flux<Content> getAllContents() {
        return contentRepository.findAll();
    }

    @Override
    public Mono<Content> updateContent(Content content) {
        return contentRepository.save(content);
    }

    @Override
    public Mono<Void> deleteContentByContentId(String id) {
        return contentRepository.deleteById(id);
    }
}
