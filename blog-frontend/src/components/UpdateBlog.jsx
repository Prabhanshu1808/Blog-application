import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getSinglePost } from '../Services/post-service';

const UpdateBlog = () => {

    const {blogId} = useParams();
    const navigate = useNavigate()
    const [post , setPost] = useState(null)

    useEffect(() => {
        
        //load the blog from database
        getSinglePost(blogId).then(res => {
            setPost({...res})
        }).catch(error => {
            console.log(error)
            toast.error("Error in Loading Post")
        })

    } , [])

    useEffect(() => {

       

    } , [])


  return (
    <div>
      This is my BLog
    </div>
  )
}

export default UpdateBlog
