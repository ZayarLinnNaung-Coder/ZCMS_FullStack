package com.devz.zcms.controller;

import com.devz.zcms.service.FileService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.file.Path;

@RestController
@CrossOrigin
@RequestMapping("/files")
@AllArgsConstructor
public class FileController {

    private final FileService fileService;

    @GetMapping
    public Flux<Path> getAllFiles() throws IOException {
        return fileService.getAllFiles();
    }

    @GetMapping("/{fileName}")
    public Mono<ResponseEntity<Resource>> loadFile(@PathVariable String fileName){
        return Mono.justOrEmpty(fileService.load(fileName))
                .map(file -> ResponseEntity.ok()
                            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<ResponseEntity<Path>> saveFile(@RequestPart("file") FilePart file){
        return fileService.save(file).map(response -> ResponseEntity.ok(response));
    }
}
