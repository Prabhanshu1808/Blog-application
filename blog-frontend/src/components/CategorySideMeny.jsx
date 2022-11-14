import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loadAllCategories } from '../Services/category-service'

const CategorySideMeny = () => {

    const [category , setCategory] = useState([])

    useEffect(() => {
       
      loadAllCategories().then(data => {
        console.log(data)
        setCategory([...data])
      }).catch(error => {
        console.log(error);
        toast.error("Error in Loading Categories")
      })
      
    } , [])
  return (
    <div>
        <h1>Categories</h1>
       <ListGroup  className='mt-3 shadow'>
         <ListGroupItem tag={Link} to={'/'} action>
             All Blogs
         </ListGroupItem>
         {
          category && category.map((cat , index) => {
            return(
              <ListGroupItem  tag={Link} to={'/categories/' + cat.categoryId} className='border-0' key={index} action>
                {cat.categoryTitle}
              </ListGroupItem>
            )
          })
         }

       </ListGroup>
    </div>
  )
}

export default CategorySideMeny
