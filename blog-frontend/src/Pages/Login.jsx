import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, CardImg, CardImgOverlay, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import { doLogin } from '../auth'
import userContext from '../context/userContext'
import { loginUser } from '../Services/user-service'

const Login = () => {
 const userContextData = useContext(userContext)

  const navigate = useNavigate();


  const [logindetail, setloginDetail] = useState({
    username: '',
    password: ''
  })

  const resetData = () => {
    setloginDetail({
      username: '',
      password: ''
    })
  }

  const handleChange = (event, property) => {
    setloginDetail({ ...logindetail, [property]: event.target.value })
  }

  const submitForm = (event) => {
    event.preventDefault();
    console.log(logindetail);
    //validation
    if (logindetail.username.trim() === '' || logindetail.password.trim() === '') {
      toast.error("Email or password is Required")
      return;
    }

    //Submit the data to sever to generate token
    loginUser(logindetail).then((data) => {

      console.log(data)

      //Save the data to localStorage
      doLogin(data, () => {
        console.log("Login detail is saved to local storage");
        //Redirect to User Dashboard
        
        navigate("/user/dashboard")

      })

      toast.success("User Login Successful", {
        position: "bottom-center"
      })

    }).catch((error) => {
      console.log(error)
      if (error.response.status === 400 || error.response.status === 404) {
        toast.error(error.response.data.message)
      }
      else {
        toast.error("Something went wrong")
      }

    })
  }

  return (
    <div className='login-comp'>

      <Container style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: '40px' }} >

        <Card color="light">


          <CardHeader style={{ textAlign: "center" }}><h3>Fill Information to Login!!</h3></CardHeader>


          <CardImg alt="Card image cap" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqebTTSGnxcZZtbvfkgNGZ18yBvMjgHlORlbZGkWhp&s" style={{ height: 250 }} />
          <CardImgOverlay>
            <CardBody>

              {/* creating form */}

              <Form style={{ marginTop: "40px" }} onSubmit={submitForm} >
                <FormGroup>
                  <Label style={{ marginLeft: "5px" }} for='email'>Email</Label>
                  <Input type='email' placeholder='Enter Email' id='email' value={logindetail.username}
                    onChange={(e) => handleChange(e, 'username')} />
                </FormGroup>
                <FormGroup>
                  <Label style={{ marginLeft: "5px" }} for='password'>Password</Label>
                  <Input type='password' placeholder='Enter Password' id='password' value={logindetail.password}
                    onChange={(e) => handleChange(e, 'password')} />
                </FormGroup>
                <Container className='text-center' >
                  <Button color='dark' >Login</Button>
                  <Button onClick={resetData} color='warning' type='reset' className='ms-2' >Reset</Button>
                </Container>
              </Form>
            </CardBody>
          </CardImgOverlay>
        </Card>
      </Container>

    </div>


  )
}

export default Login
