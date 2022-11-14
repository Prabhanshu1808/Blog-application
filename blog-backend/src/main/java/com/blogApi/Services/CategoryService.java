package com.blogApi.Services;

import com.blogApi.Payloads.CategoryDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CategoryService {

    //create
    CategoryDto createCategory(CategoryDto categoryDto);

    //update
    CategoryDto updateCategory(CategoryDto categoryDto , Integer catId);

    //delete
    void deleteCategory(Integer categoryId);

    //get
    CategoryDto getCategoryById(Integer catId);

    //getAll

    List<CategoryDto> getAll();
}
