import Button from "../components/Button.jsx"
import Heading from "../components/Heading.jsx"
import InputBox from "../components/InputBox.jsx"
import SubHeading from "../components/SubHeading.jsx"
import BottomWarning from "../components/BottomWarning.jsx"
import axios from "axios"
import { useState } from "react"

export default function Signup() {
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    console.log(fname, lname, email, password)

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e=>
            setFname(e.target.value)
        } placeholder="Fname" text={"First Name"} />
        <InputBox onChange={e=>{setLname(e.target.value)}} 
         placeholder="Lname" text={"Last Name"} />
        <InputBox onChange={e=>{setEmail(e.target.value)}}
         placeholder="example@gmail.com" text={"Email"} />
        <InputBox onChange={e=>{setPassword(e.target.value)}}
         placeholder="123456" text={"Password"} />
        <div className="pt-4">
          <Button onClick={async() => {
            const response=await axios.post("http://localhost:3000/api/v1/user/signup", {
              firstname: fname,
              lastname: lname,
              email: email,
              password: password
            })
            localStorage.setItem("token", response.data.token)
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}