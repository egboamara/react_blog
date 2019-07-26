import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Layout from '../Model/layout';
import Alert from 'react-bootstrap/Alert';
const axios = require ('axios');

export default class Signup extends React.Component {
   constructor(props){
     super(props)

     this.state ={
       fullname:"",
        username:"",
       email:"",
       password:"",
       password2:"",
       error: false,
       signupSuccess: false,
       signupFail: false
     }

     //this.baseState = this.state
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)
   }

   handleChange(event){
     const value = event.target.value
     const id = event.target.id
     this.setState({ [id]: value });

     
   }

   handleSubmit(){
     if(this.state.password === this.state.password2){
       axios.post('http://localhost:8080/signup', {
         fullname:this.state.fullname,
         password:this.state.password,
         email:this.state.email,
         username:this.state.username
       }).then((response)=>{
         const data = response.data
         if (data.status){
            this.setState({signupSuccess:true})
         }else{
           this.setState({signupFail:true})
           setTimeout(() => {this.setState({
             signupFail:false
           })}, 3000)
         }
       }).catch((error)  =>{console.log(error)})
     }else{
       this.setState({error:true,message:'passwords dont match'})
       setTimeout(()=>{
        this.setState({
          error:false
        })
       },3000)
     }
    }

  render() {
    return (
      <Layout>
      <div>
      <div className="App-header">


     <div id='container'>
       <h1>SIGN-UP FORM</h1>

       {this.state.signupSuccess && (
              <Alert variant="success">
                  <span>Your registration was successful. <a href="/login">Login</a></span>
          </Alert>)}

          {this.state.signupFail && (
              <Alert variant="danger">
                  <span>Registration Unsuccesful. Please try again!</span>
          </Alert>)}

       <Form onSubmit = {(e)=>{
         e.preventDefault()
         this.handleSubmit()
       }}>
         <Form.Group controlId="fullname">
           <Form.Label className='Label'>Full Name</Form.Label>
           <Form.Control type="text" onChange={this.handleChange} placeholder="Enter Full Name" />
         </Form.Group>

         <Form.Group controlId="username">
           <Form.Label className='Label'>user Name</Form.Label>
           <Form.Control type="text" onChange={this.handleChange} placeholder="Enter user Name" />
         </Form.Group>


         <Form.Group controlId="email">
           <Form.Label className='Label'>Email Address</Form.Label>
           <Form.Control type="email" onChange={this.handleChange} placeholder="Enter email" />
         </Form.Group>

         <Form.Group controlId="password">
           <Form.Label className='Label'>Password</Form.Label>
           <Form.Control type="password" onChange={this.handleChange} placeholder="Password" />
         </Form.Group>

         <Form.Group controlId="password2">
           <Form.Label className='Label'>Confirm Password</Form.Label>
           <Form.Control type="password" onChange={this.handleChange} placeholder=" Confirm Password" />
         </Form.Group>

        {/* {this.state.error && (
              <Alert variant="danger">
                  <span>{this.state.message}</span>
              </Alert>
                  )} */}


         <Button variant="primary" type="submit" block>
           Submit
       </Button>
       </Form>
     </div>

   </div>

      </div>
      </Layout>
    )
  }
}
