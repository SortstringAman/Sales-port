import React,{useState} from 'react'
import { LeftPart } from '../../Component/LoginPageComp/LeftPart'
import { RightPart } from '../../Component/LoginPageComp/RightPart'
import { LeftSupportDeskLoginComp } from '../../Component/SupportDeskLoginComp/LeftSupportDeskLoginComp'
import { RightSupportDeskLoginComp } from '../../Component/SupportDeskLoginComp/RightSupportDeskLoginComp'


const SupportDekLogin = () => {
      const [isOtpVerified, setIsOtpVerified] = useState(false); 
  return (
    <div className="lg-main d-flex">
      <LeftSupportDeskLoginComp setIsOtpVerified={setIsOtpVerified} isOtpVerified={isOtpVerified}/>
      <RightSupportDeskLoginComp setIsOtpVerified={setIsOtpVerified} isOtpVerified={isOtpVerified} />
    </div>
  )
}

export default SupportDekLogin