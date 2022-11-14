package com.blogApi.Services.Impl;

import com.blogApi.Services.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {

        //File Name
        String name = file.getOriginalFilename();

        //Random name generate File
        String randomId = UUID.randomUUID().toString();
        String fileName1 = randomId.concat(name.substring(name.lastIndexOf(".")));

        //Full Path
        String filePath = path + File.separator + fileName1;



        //Create Folder if not Exist
        File f1 = new File(path);
        if(!f1.exists()){
            f1.mkdir();
        }

        //File Copy
        Files.copy(file.getInputStream() , Paths.get(filePath));

        return fileName1;
    }

    @Override
    public InputStream getResource(String path, String fileName) throws FileNotFoundException {
        String fullPath = path + File.separator + fileName;
        InputStream is = new FileInputStream(fullPath);
        return is;
    }
}
