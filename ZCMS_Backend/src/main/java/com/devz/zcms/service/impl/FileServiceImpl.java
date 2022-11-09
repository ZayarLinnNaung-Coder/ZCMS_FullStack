package com.devz.zcms.service.impl;

import com.devz.zcms.exception.ForbiddenException;
import com.devz.zcms.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileServiceImpl implements FileService {

    private final Path root = Paths.get("src/main/resources/assets/img");

    @Override
    public Flux<Path> getAllFiles() throws IOException {
        return Flux.fromStream(Files.walk(root, Integer.MAX_VALUE).map(root::relativize));
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public Mono<Path> save(FilePart file) {
        Path destFilePath = this.root.resolve(file.filename());
        return  file.transferTo(destFilePath)
                .then(Mono.just(destFilePath));
    }


}
