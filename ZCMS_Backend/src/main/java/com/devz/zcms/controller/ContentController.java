package com.devz.zcms.controller;

import com.devz.zcms.entity.Content;
import com.devz.zcms.service.ContentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/contents")
@AllArgsConstructor
public class ContentController {

    private final ContentService contentService;

    @GetMapping
    public Flux<Content> findAllContent(@RequestParam(required = false) String contentModelId){
        if(StringUtils.hasText(contentModelId))
            return contentService.getAllContentsByContentModelId(contentModelId);
        return contentService.getAllContents();
    }

    @PostMapping
    public Mono<Content> createNewField(@RequestBody Content content){
        return contentService.createNewContent(content);
    }

    @PutMapping
    public Mono<Content> updateExistingField(@RequestBody Content content){
        return contentService.updateContent(content);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<String>> deleteField(@PathVariable String id){
        return contentService.deleteContentByContentId(id).map(unused -> ResponseEntity.ok("Successfully deleted " + id));
    }

}
