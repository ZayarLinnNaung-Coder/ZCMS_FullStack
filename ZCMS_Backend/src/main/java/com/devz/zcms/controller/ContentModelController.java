package com.devz.zcms.controller;

import com.devz.zcms.entity.ContentModel;
import com.devz.zcms.service.ContentModelService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/content-models")
@AllArgsConstructor
public class ContentModelController {

    private final ContentModelService contentModelService;

    @PostMapping
    public Mono<ContentModel> createNewContentModel(@RequestBody ContentModel newContentModel){
        return contentModelService.createNewContentModel(newContentModel);
    }

    @GetMapping
    public Flux<ContentModel> getAllContentModels(@RequestParam(required = false) String userId){
        if(StringUtils.hasText(userId))
            return contentModelService.findAllContentModelsById(userId);
        return contentModelService.getAllContentModels();
    }

    @PutMapping
    public Mono<ContentModel> updateContentModels(@RequestBody ContentModel newContentModel){
        return contentModelService.createNewContentModel(newContentModel);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<String>> deleteContentModelById(@PathVariable String id){
        return contentModelService.deleteContentModelById(id).map(unused -> ResponseEntity.ok("Successfully deleted " + id));
    }
}
