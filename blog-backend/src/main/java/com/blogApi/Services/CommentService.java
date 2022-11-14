package com.blogApi.Services;

import com.blogApi.Payloads.CommentDto;

public interface CommentService {

    CommentDto createComment(CommentDto commentDto , Integer postId);
    void deleteComment(Integer commentId);
}
