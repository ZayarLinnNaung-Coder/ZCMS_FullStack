package com.devz.zcms.controller;

import com.devz.zcms.entity.Field;
import com.devz.zcms.service.FieldService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/fields")
@AllArgsConstructor
public class FieldController {

    private final FieldService fieldService;

    @GetMapping
    public Flux<Field> findAllFields(@RequestParam(required = false) String contentModelId){
        if(StringUtils.hasText(contentModelId))
            return fieldService.findFieldsByContentModelId(contentModelId);
        return fieldService.findAllFields();
    }

    @PostMapping
    public Mono<Field> createNewField(@RequestBody Field field){
        return fieldService.createNewField(field);
    }

    @PutMapping
    public Mono<Field> updateExistingField(@RequestBody Field field){
        return fieldService.updateExistingField(field);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<String>> deleteField(@PathVariable String id){
        return fieldService.deleteField(id).map(unused -> ResponseEntity.ok("Successfully deleted " + id));
    }

}
