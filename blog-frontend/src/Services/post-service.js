import { privateAxios } from "./helper";
import { myAxios } from "./helper";

//create post function
export const createPost=(postData) => {
    console.log(postData)
    return privateAxios.post(`/api/user/${postData.userId}/category/${postData.categoryId}/post` , postData)
    .then((responese) =>  responese.data)
} 


//get All posts
export const loadAllPosts = (pageNumber , pageSize) => { 
    return myAxios.get(`/api/post/all?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=dsc`).then(response => response.data)
}

//get single post of given Id
export const getSinglePost = (postId) => {
    return myAxios.get("/api/post/" + postId).then(response => response.data)
}

//create comment
export const createComment = (comment , postId) => {
    return privateAxios.post(`/api/post/${postId}/comment` , comment)
}

//upload image
export const  uploadImage = async (image , postId) => {
    let formData = new FormData();
    formData.append("image" , image);

    const responese = await privateAxios.post(`/api/post/image/upload/${postId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return responese.data;
} 

//get category wise post
export const getCategoryPost = (categoryId) => {
   return myAxios.get(`api/category/${categoryId}/post`).then(responese => responese.data)
}

//load post user wise
export const loadPostUserWise = (userId) =>{
    return privateAxios.get(`/api/user/${userId}/post`).then(responese => responese.data)
}

//deletePost
export const removePost = (postId) => {
    return privateAxios.delete(`/api/post/${postId}`).then(responese => responese.data)
}