import React from 'react'
import { LeftPart } from '../../Component/LoginPageComp/LeftPart'
import { RightPart } from '../../Component/LoginPageComp/RightPart'


const Login = () => {
  
  return (
    <div className="lg-main d-flex">
      <LeftPart/>
      <RightPart/>
    </div>
  )
}

export default Login