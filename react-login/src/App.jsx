import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)

  let userNameRef=useRef()
  let userEmailRef=useRef()


  let loginUser=(event)=>{
    event.preventDefault();
    let email=event.target.email.value
    let password=event.target.password.value;

    let obj={email,password};
    axios.post(`http://localhost:8080/login`,obj)
    .then((res)=>{
      console.log(res.data)
    })

  }

  let searchProduct=()=>{
    axios.get(`http://localhost:8080/user/insert?uname=${userNameRef.current.value}&email=${userEmailRef.current.value}`)
    .then((res)=>{
      console.log(res.data)
    })
  }

  return (
    <>

      <input name='userName' ref={userNameRef} className='border-2'/>
      
      <input name='userEmail' ref={userEmailRef}  className='border-2'/>


      <button onClick={searchProduct}>Serach User</button>
       
        <Card className="max-w-lg mx-auto">
          <h2 className='font-bold text-2xl py-3'>Login</h2>
      <form className="flex flex-col gap-4" onSubmit={loginUser}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput id="email1" name='email' type="email" placeholder="name@flowbite.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" name='password' type="password" required />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
        
    </>
  )
}

export default App
3