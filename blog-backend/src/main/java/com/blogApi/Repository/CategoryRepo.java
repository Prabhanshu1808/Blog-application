package com.blogApi.Repository;

import com.blogApi.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface CategoryRepo extends JpaRepository<Category , Integer> {
}
