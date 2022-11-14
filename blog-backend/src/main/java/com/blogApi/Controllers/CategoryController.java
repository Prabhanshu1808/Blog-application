package com.blogApi.Controllers;

import com.blogApi.Payloads.ApiResponse;
import com.blogApi.Payloads.CategoryDto;
import com.blogApi.Services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    //create
    @PostMapping("/")
    public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto categoryDto){

        CategoryDto createCategory = this.categoryService.createCategory(categoryDto);
        return new ResponseEntity<>(createCategory , HttpStatus.CREATED);
    }

    //update
    @PutMapping("/{catId}")
    public ResponseEntity<CategoryDto> updateCategory(@Valid @RequestBody CategoryDto categoryDto , @PathVariable Integer catId){
       CategoryDto updatedCategory = this.categoryService.updateCategory(categoryDto , catId);
       return new ResponseEntity<CategoryDto>(updatedCategory , HttpStatus.OK);
    }

    //delete
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Integer categoryId){
        this.categoryService.deleteCategory(categoryId);
        return new ResponseEntity(new ApiResponse("Category Deleted Successfully" , true), HttpStatus.OK);

    }

    //get
    @GetMapping("/{catId}")
    public ResponseEntity<CategoryDto> getCategory(@PathVariable Integer catId){
        return ResponseEntity.ok(this.categoryService.getCategoryById(catId));
    }

    //getAll
    @GetMapping("/all")
    public ResponseEntity<List<CategoryDto>> getAllCategory(){
        return ResponseEntity.ok(this.categoryService.getAll());
    }
}
