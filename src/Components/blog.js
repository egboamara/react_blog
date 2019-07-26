import React from 'react';
import Blogpost from './blogpost';
const axios = require('axios');


export default class Blog extends React.Component {
   constructor(props) {
       super(props)

       this.state = {
            blogpost: []
       }
   }

   async componentDidMount(){
    let response = await axios.post('http://localhost:8080/getposts')        
         this.setState({
             blogpost: response.data.posts
         })

   }

   render() {

       return (

           <div>
               {this.state.blogpost.map((post)=> {
                   return <Blogpost  authorName ={post.authorName} publicationTitle={post.publicationTitle} body ={post.body} />

              }
                  )}
           </div>

       )
   }
}

// import React, { Component } from 'react'


// const Blog = (props) =>{
//     return (<div>
//         <h3> My name is  {props.name} i came {props.position} </h3>
//         </div>
   
//     )
// }


// class Blogpost extends Component {
//     constructor(props){
//     super(props)


//     this.state={
//         post:[
            
//         {
//          name:'Yvonne',
//          position: 'first'
//         },
//         {
//          name:'Claire',
//          position: 'third'
//         },
//         {
//          name:'Kenneth',
//          position:'second'
//     }
//     ]
//  }
// }
               

//    render () {
//     return (
//         <div>
//          {this.state.post.map ((x) =>{
//              return<Blog name = {x.name} position ={x.position}></Blog>
//          })}   
//         </div>
//     )}
//         }



// export default Blogpost;