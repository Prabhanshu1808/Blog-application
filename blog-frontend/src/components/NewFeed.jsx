import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import { loadAllPosts, removePost } from '../Services/post-service'
import Post from './Post';

const NewFeed = () => {

  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: '',
    totalElements: '',
    pageSize: '',
    pageNumber: '',
    lastPage: false
  });

  useEffect(() => {

    //load all the post from the server
    changePage(0)

  }, [])

  const changePage = (pageNumber = 0 , pageSize = 4) => {
    
    if(pageNumber>postContent.pageNumber && postContent.lastPage){
      return;
    }

    if(pageNumber<postContent.pageNumber && postContent.pageNumber === 0){
      return;
    }

    loadAllPosts(pageNumber , pageSize).then(data => {
      setPostContent(data)
      console.log(data);
      window.scroll(0,0)
    }).catch(error => {
      toast.error("Error is page loading")
    })
        
  }

    //Function to deletePost
    const deletePost = (post) => {
      //going to deletePost
      removePost(post.postId).then(data => {
        alert("You Want to delete this post")
        toast.success("Post is Deleted")
          
        let newPostContent = postContent.content.filter(p => p.postId !== post.postId)
        setPostContent({...postContent , content:newPostContent})

      }).catch(error => {
        console.log(error);
        toast.error("Error in deleting Post")
      })
    }

  return (

    <div className="container-fluid">
      <Row>
        <Col md={{ size: 12 }}>
          <h1>Blogs Count ({postContent?.totalElements})</h1>

          {

            postContent.content.map((post) => (
              <Post deletePost={deletePost} post={post} key={post.postId} />
            ))
          }

          <Container className='text-center mt-3'>
            <Pagination size='lg'>

              <PaginationItem onClick={() => changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber===0} >
                <PaginationLink previous>
                      Previous
                </PaginationLink>
              </PaginationItem>

              {
                [...Array(postContent.totalPages)].map((item, index) => (

                  <PaginationItem onClick={() => changePage(index)} active={index === postContent.pageNumber} key={index}>
                    <PaginationLink>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))
              }

              <PaginationItem onClick={() => changePage((postContent.pageNumber)+1)} disabled={postContent.lastPage}>
                <PaginationLink next>
                    Next
                </PaginationLink>
              </PaginationItem>

            </Pagination>
          </Container>


        </Col>
      </Row>
    </div>
  )
}

export default NewFeed
