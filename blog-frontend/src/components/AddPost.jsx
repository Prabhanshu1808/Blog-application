import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../Services/category-service'
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import { createPost, uploadImage } from '../Services/post-service'
import { getCurrentUserDetail, isLoggedIn } from '../auth';

const AddPost = () => {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState('')
  const [user, setUser] = useState(null)

  const [post, setPost] = useState({
    title: '',
    content: '',
    categoryId: ''
  })
  const [image, setImage] = useState(null);


  useEffect(
    () => {
      setUser(getCurrentUserDetail())
      loadAllCategories().then((data) => {
        console.log(data)
        setCategories(data);
      }).catch(error => {
        console.log(error);
      })

    }, [])

  const fieldChange = (event) => {
    // console.log(event);
    setPost({ ...post, [event.target.name]: event.target.value })
  }

  const contentFieldChange = (data) => {
    setPost({ ...post, 'content': data })
  }

  //handle file change event
  const handleFileChange = (event) => {
    console.log(event.target.files[0])
    setImage(event.target.files[0])
  }

  //create Post Function
  const submitThePost = (event) => {
    event.preventDefault();
    if (post.title.trim() === '' || post.content.trim() === '') {
      toast.error("Title or Content can't be null")
      return;
    }
    if (post.categoryId.trim() === '') {
      toast.error("Post Category can't be null")
      return;
    }

    //submit post to the server
    post['userId'] = user.id
    createPost(post).then((data) => {

      //upload the image to the server
      uploadImage(image, data.postId).then(item => {
        toast.success("image Uploaded")
      }).catch(error => {
        toast.error("Error in uploading image")
        console.log(error);
      })

      toast.success("post created")
      console.log(post)
    }).catch(error => {
      alert(error)
      console.log(error)
    })
    console.log("form submitted");


    //submit the form to the server
    // post['userId'] = user.id
    // createPost(post).then(data => {
    //   toast.success("Post Created")
    //   console.log(post)
    // }).catch((error) => {
    //   alert("error");
    //   console.log(error);
    // })
    // console.log("form submitted");
  }



  return (
    <div >
      <Card className='shadow mt-2' style={{ width: "65rem", marginLeft: "150px" }} >
        <CardBody>
          {/* {JSON.stringify(post)} */}
          <h3>What's going on</h3>
          <Form onSubmit={submitThePost}>

            <div className='my-3'>
              <Label for='title'>Post Title</Label>
              <Input type='text' id="title" placeholder='Enter here' name='title' onChange={fieldChange}></Input>
            </div>
            <div className='my-3' >
              <Label for='content'>Post Content</Label>
              {/* <Input style={{ height: "100px" }} type='textarea' id="content" placeholder='Enter here'></Input> */}

              <JoditEditor
                ref={editor}
                value={content}
                onChange={contentFieldChange}
              />
            </div>

            {/* file field */}

            <div className='mt-3'>
              <Label for="image">Select Post Image</Label>
              <Input id='image' type='file' multiple onChange={handleFileChange} accept="image/*"></Input>
            </div>

            <div className='my-3' >
              <Label for='category'>Post category</Label>
              <Input type='select' id="category" placeholder='Enter here' name='categoryId' onChange={fieldChange} defaultValue={0}>
                <option disabled value={0}>--Select Category--</option>
                {

                  categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.categoryTitle}
                    </option>

                  ))
                }
              </Input>
            </div>
            <Container className='text-center'>
              <Button type='submit' color='primary'>Create Post</Button>
              <Button color='warning' className='ms-2' type='reset'>Reset</Button>
              
             
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default AddPost
