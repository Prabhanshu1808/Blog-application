package com.blogApi.Payloads;

import com.blogApi.Entity.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
public class PostDto {

    private Integer postId;
    @NotEmpty
    @Size(max = 500 , message = "Max size is 500")
    private String title;
    @NotEmpty
    private String content;
    private String imageName;
    private Date addedDate;
    private CategoryDto category;
    private UserDto user;

    private Set<CommentDto> comments = new HashSet<>();
}
