 import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom' ;
import OAuth from '../components/OAuth';
 
 export default function SignUp() {
       
     const [formData , setFormData] = useState({}) ;
     const [error, setError ] = useState(null) ;
     const [loading, setLoading ] = useState(false) ;
     const  Navigate = useNavigate() ;
     function handleChange(e){
      setFormData({
        ...formData ,
        [e.target.id] : e.target.value 
      }) ;
     } ;

     const handleSubmit = async (e) =>{
      e.preventDefault() ;
  
      try {
        setLoading(true) ;
        const res = await fetch('/api/auth/signup',  
          {
            method: 'POST',
            headers : {
              'content-Type' : 'application/json' ,
            },
            body : JSON.stringify(formData) ,
          }
        ) ;
        
        const data = await res.json() ;
  
        if(data.success == false ){
          setLoading(false) ;
          setError(data.message) ;
          return ;
        }
        setLoading(false) ;
        setError(null) ;
        Navigate('/sign-in') ;

      } catch (error) {
           setLoading(false) ;
           setError(error.message) ;
      }
     };
    
   return (
     <div className='p-3 max-w-lg mx-auto ' > 
     <h1 className='text-3xl text-center font-semibold my-7 ' >Sign Up</h1>
     <form onSubmit = {handleSubmit}  className='flex flex-col gap-4'>
      <input 
      type='text' 
      placeholder='username'
      className='border p-3 rounded-lg' 
      id='username' 
      onChange={handleChange} >
      </input>
      <input 
      type='email' 
      placeholder='Enter your email' 
      className='border p-3 rounded-lg' 
      id='email' 
      onChange={handleChange} >
      </input>
      <input 
      type='password' 
      placeholder='Enter your password' 
      className='border p-3 rounded-lg' 
      id='password' 
      onChange={handleChange} >
      </input>
      <button disabled = {loading}  
      className='bg-slate-700 p-3 rounded-lg
       text-white uppercase 
       hover:opacity-95 
       disabled:opacity-80' > {loading ? 'LOADING' : 'Sign Up'}   </button>
       <OAuth />
     </form> 
     <div className='flex mt-5' >
      <p className='font-semibold '>Have an account?</p>
       <Link to='/sign-in' >
        <span 
        className='text-blue-900 
        font-semibold ml-1 '>Sign-in</span>
       </Link>
     </div>
       {error && <p className='text-red-500 mt-5' >{error} </p> }
     </div>
   ) ;
 }
 