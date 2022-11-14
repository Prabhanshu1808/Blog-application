package com.blogApi.Services.Impl;

import com.blogApi.Entity.Category;
import com.blogApi.Entity.Post;
import com.blogApi.Entity.User;
import com.blogApi.Exception.ResourceNotFountException;
import com.blogApi.Payloads.PostDto;
import com.blogApi.Payloads.PostResponse;
import com.blogApi.Repository.CategoryRepo;
import com.blogApi.Repository.PostRepo;
import com.blogApi.Repository.UserRepo;
import com.blogApi.Services.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepo postRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public PostDto createPost(PostDto postDto , Integer userId , Integer categoryId) {

        User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFountException("User" , "User Id" , userId));

        Category category = this.categoryRepo.findById(categoryId).orElseThrow(() -> new ResourceNotFountException("Category" , "Category Id" , categoryId));

        Post post = this.modelMapper.map(postDto , Post.class);
        post.setImageName("default.png");
        post.setAddedDate(new Date());
        post.setUser(user);
        post.setCategory(category);
        Post newPost = this.postRepo.save(post);
        return this.modelMapper.map(newPost , PostDto.class);
    }

    @Override
    public PostDto updatePost(PostDto postDto, Integer pId) {
        Post findPost = this.postRepo.findById(pId).orElseThrow(() -> new ResourceNotFountException("Post","Id",pId));

        findPost.setTitle(postDto.getTitle());
        findPost.setContent(postDto.getContent());
        findPost.setImageName(postDto.getImageName());

        Post updatedPost = this.postRepo.save(findPost);
        return this.modelMapper.map(updatedPost , PostDto.class);
    }

    @Override
    public PostDto getPost(Integer pId) {
        Post post = this.postRepo.findById(pId).orElseThrow(() -> new ResourceNotFountException("Post","Id",pId));
        return this.modelMapper.map(post , PostDto.class);
    }

    @Override
    public PostResponse getAll(Integer pageNumber , Integer pageSize , String sortBy , String sortDir) {
        Sort sort = null;
        if(sortDir.equalsIgnoreCase("asc")){
            sort = Sort.by(sortBy).ascending();
        }
        else if(sortDir.equalsIgnoreCase("dsc")){
            sort = Sort.by(sortBy).descending();
        }

        Pageable p = PageRequest.of(pageNumber , pageSize , sort);

        Page<Post> pagePosts =  this.postRepo.findAll(p);
        List<Post> allPosts = pagePosts.getContent();
        List<PostDto> postDtos = allPosts.stream().map((post) -> this.modelMapper.map(post , PostDto.class)).collect(Collectors.toList());

        PostResponse postResponse = new PostResponse();

        postResponse.setContent(postDtos);
        postResponse.setPageNumber(pagePosts.getNumber());
        postResponse.setPageSize(pagePosts.getSize());
        postResponse.setTotalElements(pagePosts.getTotalElements());
        postResponse.setTotalPages(pagePosts.getTotalPages());
        postResponse.setLastPage(pagePosts.isLast());

        return postResponse;
    }

    @Override
    public void deletePost(Integer postId) {
        Post findPost = this.postRepo.findById(postId).orElseThrow(() -> new ResourceNotFountException("Post","Id",postId));
        this.postRepo.delete(findPost);
    }

    //Get Post By Category
    @Override
    public List<PostDto> getPostsByCategory(Integer categoryId) {
        Category cat = this.categoryRepo.findById(categoryId).orElseThrow(() -> new ResourceNotFountException("Category" , "Id" , categoryId));
        List<Post> posts = this.postRepo.findByCategory(cat);
        List<PostDto> postDtos = posts.stream().map((post) -> this.modelMapper.map(post , PostDto.class)).collect(Collectors.toList());
        return postDtos;
    }
   //Get Post By User
    @Override
    public List<PostDto> getPostsByUser(Integer userId) {
        User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFountException("User" , "Id" , userId));
        List<Post> posts = this.postRepo.findByUser(user);
        List<PostDto> postDtos = posts.stream().map((post) -> this.modelMapper.map(post , PostDto.class)).collect(Collectors.toList());
        return postDtos;
    }
    //Search Post
    @Override
    public List<PostDto> searchPost(String Keyword) {
        List<Post> posts = this.postRepo.findByTitleContaining(Keyword);
        List<PostDto> postDtos = posts.stream().map((post) -> this.modelMapper.map(post , PostDto.class)).collect(Collectors.toList());
        return postDtos;
    }
}
