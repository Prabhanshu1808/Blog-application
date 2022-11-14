package com.blogApi.Payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@NoArgsConstructor
@Getter
@Setter
public class CategoryDto {

    private Integer categoryId;
    @NotEmpty
    @Size(min = 2 , max = 20 , message = "size must be in range of 2 to 10")
    private String categoryTitle;
    @NotEmpty
    @Size(max = 100 , message = "Max Size is 100")
    private String categoryDescription;
}
