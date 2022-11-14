package com.blogApi.Repository;

import com.blogApi.Entity.Category;
import com.blogApi.Entity.Post;
import com.blogApi.Entity.User;
import com.blogApi.Payloads.PostDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepo extends JpaRepository<Post , Integer> {

    List<Post> findByUser(User user);

    List<Post> findByCategory(Category category);

    List<Post> findByTitleContaining(String title);
}
