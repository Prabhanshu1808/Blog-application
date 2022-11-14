import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth'

const Post = ({ post = { id: -1, title: "this is default post title", content: "this is default post content" }, deletePost }) => {

  const [user, setUser] = useState(null)
  const [login, setLogin] = useState(null)

  useEffect(() => {
    setUser(getCurrentUserDetail())
    setLogin(isLoggedIn())
  }, [])
  return (

    <Card className='border-0 shadow-sm mt-3'>
      <CardBody >
        <h1>{post.title}</h1>
        <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 40) + "..." }}>

        </CardText>
        <div>
          <Link className='btn btn-primary border-0' to={'/post/' + post.postId}>Read More</Link>
          {
            isLoggedIn && (user && user?.id === post.user?.id ?
              <Button color='danger' className='ms-2' type='reset' onClick={() => deletePost(post)}>Delete</Button> : '')
          }
          {
            isLoggedIn && (user && user?.id === post.user?.id ?
              <Button color='warning' className='ms-2' type='reset' tag={Link} to={`/user/updateBlog/${post.postId}` } >Update</Button> : '')
          }
        </div>
      </CardBody>
    </Card>
  )
}

export default Post
