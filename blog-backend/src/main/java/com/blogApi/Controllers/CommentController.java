package com.blogApi.Controllers;


import com.blogApi.Payloads.ApiResponse;
import com.blogApi.Payloads.CommentDto;
import com.blogApi.Services.CommentService;
import com.blogApi.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private PostService postService;

    @PostMapping("/post/{postId}/comment")
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto , @PathVariable Integer postId){
        CommentDto createComment = this.commentService.createComment(commentDto , postId);
        return new ResponseEntity<>(createComment , HttpStatus.CREATED);
    }
    @DeleteMapping("/comment/{commentId}")
    public  ResponseEntity<ApiResponse> deleteComment(@PathVariable Integer commentId){
        this.commentService.deleteComment(commentId);
        return new ResponseEntity<>(new ApiResponse("Comment is deleted Successfully" , true) , HttpStatus.OK);
    }
}
