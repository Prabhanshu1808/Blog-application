import React, { useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap'
import CategorySideMeny from '../components/CategorySideMeny'
import NewFeed from '../components/NewFeed'

const Home = () => {



  return (
    <div>
      <Container  className='mt-3'>
       <Row >
         <Col md={2} >
             <CategorySideMeny/>
         </Col>
         <Col md={10}>
             <NewFeed/>
         </Col>
       </Row>
      </Container>
    </div>
  )
}

export default Home
