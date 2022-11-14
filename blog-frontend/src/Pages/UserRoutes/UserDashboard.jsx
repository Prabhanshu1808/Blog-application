import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Container } from 'reactstrap'
import { getCurrentUserDetail } from '../../auth'
import AddPost from '../../components/AddPost'
import Post from '../../components/Post'
import { loadPostUserWise, removePost } from '../../Services/post-service'

const UserDashboard = () => {

  const [user, setUser] = useState({});
  const [post, setPost] = useState([])

  useEffect(() => {
    console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail());
    loadPostData();
  }, [])

  const  loadPostData = () => {

      loadPostUserWise(getCurrentUserDetail().id).then(data => {
      console.log(data)
      setPost([...data].reverse())
    }).catch(error => {
      console.log(error);
      toast.error("Error in loading Post!")
    })
  }

  //Function to deletePost
  const deletePost = (post) => {
    //going to deletePost
    removePost(post.postId).then(data => {
      alert("You Want to delete this post")
      toast.success("Post is Deleted")
      loadPostData();
    }).catch(error => {
      console.log(error);
      toast.error("Error in deleting Post")
    })
  }


  return (
    <Container>
      <AddPost />
      <h1 className='mt-3'>Post Count : ({post.length})</h1>
      {
        post.map((po, index) => {
          return (
            <Post post={po} key={index} deletePost={deletePost} />
          )
        })
      }
    </Container>
  )
}

export default UserDashboard
