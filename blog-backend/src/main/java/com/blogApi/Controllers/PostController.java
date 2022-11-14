package com.blogApi.Controllers;

import com.blogApi.Payloads.ApiResponse;
import com.blogApi.Payloads.PostDto;
import com.blogApi.Payloads.PostResponse;
import com.blogApi.Services.FileService;
import com.blogApi.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private FileService fileService;

    @Value("${project.image}")
    private String path;

    @PostMapping("/user/{userId}/category/{categoryId}/post")
    public ResponseEntity<PostDto> createPost(@Valid @RequestBody PostDto postDto , @PathVariable Integer userId , @PathVariable Integer categoryId){
        PostDto createPost = this.postService.createPost(postDto , userId , categoryId);
        return new ResponseEntity<PostDto>(createPost , HttpStatus.CREATED);
    }

    @PutMapping("/post/{pId}")
    public ResponseEntity<PostDto> updatePost(@Valid @RequestBody PostDto postDto , @PathVariable Integer pId){

        PostDto updatePost = this.postService.updatePost(postDto , pId);
        return new ResponseEntity<>(updatePost , HttpStatus.OK);
    }

    @GetMapping("/post/{pId}")
    public ResponseEntity<PostDto> getPost(@PathVariable Integer pId){
        PostDto postById = this.postService.getPost(pId);
        return new ResponseEntity<>(postById , HttpStatus.OK);
    }

    @GetMapping("/post/all")
    public ResponseEntity<PostResponse> getAllPost(@RequestParam(defaultValue = "0" ,required = false) Integer pageNumber,
                                                   @RequestParam(defaultValue = "3" ,required = false) Integer pageSize,
                                                   @RequestParam(defaultValue = "postId" , required = false) String sortBy,
                                                   @RequestParam(defaultValue = "asc" , required = false) String sortDir){
        PostResponse postResponse = this.postService.getAll(pageNumber , pageSize , sortBy , sortDir);
        return new ResponseEntity<>(postResponse , HttpStatus.OK);
    }

    //Get By User
    @GetMapping("/user/{userId}/post")
    public ResponseEntity<List<PostDto>> getPostByUser(@PathVariable Integer userId){

        List<PostDto> postByUser = this.postService.getPostsByUser(userId);
        return new ResponseEntity<List<PostDto>>(postByUser , HttpStatus.OK);
    }

    //Get By Category
    @GetMapping("/category/{categoryId}/post")
    public ResponseEntity<List<PostDto>> getPostByCategory(@PathVariable Integer categoryId){
        List<PostDto> postsByCategory = this.postService.getPostsByCategory(categoryId);
        return new ResponseEntity<List<PostDto>>(postsByCategory , HttpStatus.OK);
    }

     //delete post
    @DeleteMapping("/post/{postId}")
    public ApiResponse deletePost(@PathVariable Integer postId){
        this.postService.deletePost(postId);
        return new ApiResponse("Post Deleted Successfully" , true);
    }

    //Search
    @GetMapping("/post/search/{keyword}")
    public ResponseEntity<List<PostDto>> searchPostByTitle(@PathVariable String keyword){
        List<PostDto> result = this.postService.searchPost(keyword);
        return new ResponseEntity<>(result , HttpStatus.OK);
    }

    //Post Image Upload
    @PostMapping("/post/image/upload/{postId}")
    public ResponseEntity<PostDto> uploadPostImage(@RequestParam("image") MultipartFile image , @PathVariable Integer postId) throws IOException {

            PostDto postDto = this.postService.getPost(postId);
            String fileName = this.fileService.uploadImage(path, image);

            postDto.setImageName(fileName);

            PostDto updatedPost = this.postService.updatePost(postDto, postId);

            return new ResponseEntity<PostDto>(updatedPost, HttpStatus.OK);
    }

    //Method to serve Files
    @GetMapping(value = "/post/image/{imageName}" , produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(@PathVariable("imageName") String imageName , HttpServletResponse response) throws IOException {

        InputStream resource = this.fileService.getResource(path , imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource , response.getOutputStream());
    }

}
