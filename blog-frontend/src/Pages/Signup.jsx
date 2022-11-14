import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardImg, CardImgOverlay, Container, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { signUp } from '../Services/user-service'
import {toast} from 'react-toastify'


const Signup = () => {


  const [data, setData] = useState({
    name:'',
    email:'',
    password:'',
    about:''
  })

  const [error, setError] = useState({
    errors:{},
    isError:false
  })

  // useEffect(() => {

  // }, [])
  

  //Handle change
  const handleChange = (event , property) => { 
    setData({...data , [property]:event.target.value}); 
  }

  const resetData = () => {
    setData({
      name:'',
      email:'',
      password:'',
      about:''
    });
  }
 
  const submitForm=(event)=>{
    event.preventDefault();

    // if(error.isError){
    //   toast.error("Form Data is Invalid!!")
    //   setError({...error , isError:false})
    //   return;
    // }


    console.log(data);
    //data validate

    //call server api for sending data
    signUp(data).then((resp) => {
      console.log(resp)
      console.log("success log");
      toast.success("User Registered Successfully")
      setData({
        name:'',
       email:'',
       password:'',
       about:''
      })
    }).catch((error) => {
      console.log(error)
      console.log("Error Log");
      setError({
        errors:error,
        isError:true
      })
    })

    //handle error in proper way

  }

  return (
    <div>
      <div className='text-center p-4'>
      {JSON.stringify(data)}
      </div>
    <Container style={{display:"flex",justifyContent:"center",alignContent:"center"}} >

      
      
      <Card color="light">
        <CardHeader ><h3>Fill Information to Register!!</h3></CardHeader>
        <CardImg alt="Card image cap" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqebTTSGnxcZZtbvfkgNGZ18yBvMjgHlORlbZGkWhp&s" style={{  height: 480 , width:400 }}/>

        <CardImgOverlay>
        <CardBody>

          {/* creating form */}
          <Form style={{marginTop:"40px"}} onSubmit={submitForm}>
            <FormGroup >
              <Label style={{marginLeft:"5px"}} for='name'>Name *</Label>
              <Input onChange={(e)=> handleChange(e , 'name')} value={data.name}
              type='text' placeholder='Enter name' id='name' invalid={error.errors?.response?.data?.name ? true : false}/>
              <FormFeedback>
                { error.errors?.response?.data?.name }
              </FormFeedback>
            </FormGroup>
            
            <FormGroup>
              <Label style={{marginLeft:"5px"}} for='email'> Email *</Label>
              <Input onChange={(e)=> handleChange(e , 'email')} value={data.email}
              type='email' placeholder='Enter Email' id='email'invalid={error.errors?.response?.data?.email ? true : false}/>
              <FormFeedback>
                { error.errors?.response?.data?.email }
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label style={{marginLeft:"5px"}} for='password'>Password *</Label>
              <Input onChange={(e)=> handleChange(e , 'password')} value={data.password}
              type='password' placeholder='Enter Password' id='password'invalid={error.errors?.response?.data?.password ? true : false}/>
              <FormFeedback>
                { error.errors?.response?.data?.password }
              </FormFeedback>
            </FormGroup>
            <FormGroup>
             <Label style={{marginLeft:"5px"}} for="about">About *</Label>
             <Input onChange={(e)=> handleChange(e , 'about')} value={data.about}
             id="about" placeholder='Tell about youself' type="textarea" invalid={error.errors?.response?.data?.about ? true : false}/>
             <FormFeedback>
                { error.errors?.response?.data?.about }
              </FormFeedback>
            </FormGroup>
            <Container className='text-center'>
              <Button color='dark'>Register</Button>
              <Button onClick={resetData} color='warning' type='reset' className='ms-2'>Reset</Button>
            </Container>
          </Form>
        </CardBody>
        </CardImgOverlay>
      </Card>
      </Container>
    </div>
  )
}

export default Signup