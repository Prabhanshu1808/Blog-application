package com.blogApi.Services;

import com.blogApi.Entity.Category;
import com.blogApi.Entity.Post;
import com.blogApi.Payloads.PostDto;
import com.blogApi.Payloads.PostResponse;

import java.util.List;

public interface PostService {

    PostDto createPost(PostDto postDto, Integer userId , Integer categoryId);

    PostDto updatePost(PostDto postDto , Integer pId);

    PostDto getPost(Integer pId);

    PostResponse getAll(Integer pageNumber , Integer pageSize , String sortBy , String sortDir);

    void deletePost(Integer postId);

    //get All Posts By Category
    List<PostDto> getPostsByCategory(Integer categoryId);

    //get All Posts By User
    List<PostDto> getPostsByUser(Integer userId);

    //Search Post
    List<PostDto> searchPost(String Keyword);

}
