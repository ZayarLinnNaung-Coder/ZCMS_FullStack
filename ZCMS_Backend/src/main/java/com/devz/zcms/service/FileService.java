package com.devz.zcms.service;

import org.springframework.core.io.Resource;
import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.file.Path;

public interface FileService {
    Flux<Path> getAllFiles() throws IOException;
    Resource load(String filename);
    Mono<Path> save(FilePart file);
}
