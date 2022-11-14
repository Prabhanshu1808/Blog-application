package com.blogApi.Services.Impl;

import com.blogApi.Entity.Category;
import com.blogApi.Exception.ResourceNotFountException;
import com.blogApi.Payloads.CategoryDto;
import com.blogApi.Repository.CategoryRepo;
import com.blogApi.Repository.UserRepo;
import com.blogApi.Services.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category cat = this.modelMapper.map(categoryDto , Category.class);
        Category addCat = this.categoryRepo.save(cat);
        return this.modelMapper.map(addCat , CategoryDto.class);
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Integer catId) {
        Category category = this.categoryRepo.findById(catId).orElseThrow(()-> new ResourceNotFountException("Category" , "Id" , catId));

        category.setCategoryTitle(categoryDto.getCategoryTitle());
        category.setCategoryDescription(categoryDto.getCategoryDescription());

        Category updatedCategory = this.categoryRepo.save(category);
        return this.modelMapper.map(updatedCategory , CategoryDto.class);
    }

    @Override
    public void deleteCategory(Integer categoryId) {
        Category category = this.categoryRepo.findById(categoryId).orElseThrow(()-> new ResourceNotFountException("Category" , "Id" , categoryId));
        this.categoryRepo.delete(category);
    }

    @Override
    public CategoryDto getCategoryById(Integer catId) {
        Category category = this.categoryRepo.findById(catId).orElseThrow(()-> new ResourceNotFountException("Category" , "Id" , catId));
        return this.modelMapper.map(category , CategoryDto.class);
    }

    @Override
    public List<CategoryDto> getAll() {

        List<Category> categories = this.categoryRepo.findAll();
        List<CategoryDto> allCategoriesDtos = categories.stream().map((cat) -> modelMapper.map(cat , CategoryDto.class)).collect(Collectors.toList());
        return allCategoriesDtos;
    }


}
