import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Col, Container, Row } from 'reactstrap'
import CategorySideMeny from '../components/CategorySideMeny'
import NewFeed from '../components/NewFeed'
import Post from '../components/Post'
import { getCategoryPost, removePost } from '../Services/post-service'

const Categories = () => {

    const [posts , setPosts] = useState([])

    const {categoryId} = useParams()

    useEffect(() => {
        
        console.log(posts);
        getCategoryPost(categoryId).then(data => {
           setPosts([...data])
        }).catch(error => {
            console.log(error)
            toast.error("Error in Post Loading")
        })
    } , [categoryId])

      //Function to deletePost
      const deletePost = (post) => {
        //going to deletePost
        removePost(post.postId).then(data => {
          alert("You Want to delete this post")
          toast.success("Post is Deleted")
            
          let newPost = posts.filter(p => p.postId !== post.postId)
          setPosts([...newPost])
  
        }).catch(error => {
          console.log(error);
          toast.error("Error in deleting Post")
        })
      }

  return (
    <div>
      <Container  className='mt-3'>
       <Row >
         <Col md={2} >
             <CategorySideMeny/>
         </Col>
         <Col md={10}> 

              <h1>Blogs Count ({posts.length})</h1>
             {
                posts && posts.map((post , index) => {
                    return (
                        <Post deletePost={deletePost} post={post} key={index}/> 
                    )
                })
             }

             {posts.length <= 0 ? <h1 style={{color:'white'}}>No Post in this Category</h1> : ''}
         </Col>
       </Row>
      </Container>
    </div>
  )
}

export default Categories
