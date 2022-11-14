import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from 'reactstrap'
import { isLoggedIn } from '../auth';
import { BASE_URL } from '../Services/helper';
import { createComment, getSinglePost } from '../Services/post-service';

const PostPage = () => {

  const {postId} = useParams();
  const[post , setPost] = useState(null);
  const[comment , setComment] = useState({
    content:''
  })

  useEffect(() => {
    //load post of postId
    getSinglePost(postId).then(data => {
      console.log(data)
      setPost(data)
    }).catch(error => {
      console.log(error);
      toast.error("Error in Loading Post")
    })
  } , [])

  const printDate=(numbers) => {
    return new Date(numbers).toLocaleString();
  }

  let navigate = useNavigate();

  const submitComment = () => {

    if(!isLoggedIn()){
      toast.error("Need to Login first");
      return;
    }
    
    if(comment.content.trim() === ''){
      toast.error("Please Enter Something!")
      return;
    }
    createComment(comment , post.postId).then((data) => {
      console.log(data)
      toast.success("Comment Added")
      setPost({
        ...post , comments:[...post.comments , data.data]
      })
      setComment({
        content:''
      })
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <Container className='mt-4'>

      <Link className='btn btn-warning' to="/">Back</Link> / {post &&  (<Link to="">{post.title}</Link>)}
      <Row>
        <Col md={{size:12}}>
          
          <Card className='mt-4 ps-2'>
            {
              (post) && (
                <CardBody>
                  <CardText>Posted by <b>{post.user.name}</b> on <b>{printDate(post.addedDate)}</b></CardText>
                  <CardText>
                    <span className='text-muted'>Category : {post.category.categoryTitle}</span>
                  </CardText>

                  <div className="divider" style={{
                    width:"100%",
                    height:"1px",
                    background:"#e2e2e2"
                  }}></div>
                  <h3 className='mt-3'>
                    {post.title}
                  </h3>
                  <div className="image-container mt-3 ">
                    <img style={{width:"60%"}} className="image-fluid" src={BASE_URL + "/api/post/image/" + post.imageName} alt="" />
                  </div>
                  <CardText className='mt-5' dangerouslySetInnerHTML={{ __html:post.content}}></CardText>
               </CardBody>
              )
            }
          </Card>
        </Col>
      </Row>

      {/* This is for comment Section */}
      <Row className='mt-2'>
        <Col md={{size:9 , offset:1}}>
          <h3>Comments ({ post  ? post.comments.length : 0})</h3>
          {
            post && post.comments.map((comment , index) => (
              <Card key={index} className='mt-2 border-0'>
                <CardBody>
                  <CardText>
                    {comment.content}
                  </CardText>
                </CardBody>
              </Card>
              
            ))
          }

              <Card  className='mt-2 border-0'>
                <CardBody>
                  <CardText>
                      <Input type='textarea' placeholder='Enter comment here...' value={comment.content}
                             onChange={(event) =>  setComment({content : event.target.value})}></Input>
                      <Button onClick={submitComment} color='primary' className='mt-2'>Comment</Button>
                  </CardText>
                </CardBody>
              </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default PostPage
