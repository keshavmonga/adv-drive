import { FcGoogle, Button, buttonSX } from '@constants'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth , getcurrentUser } from "@FireContext"

const LandingPage = () => {
  const navigate = useNavigate();
  // const type = ["Fast", "Secure", "Reliable"]
  const currentUser = getcurrentUser();
  const { popupGoogle } = useAuth();

  const handleClick = () => {
    popupGoogle();
  }

  useEffect(() => {
    if (currentUser ) {navigate("/home")}
  }, [currentUser?.uid]);
  
  return (
    <div className="landing-page">
      <div className="left">
        <div className="glass" />
        <h1>Welcome to MyDrive.<p style={{color:'#8739F9'}}>Fast & Secure</p></h1>
        <Button
          onClick={handleClick}
          variant="outlined"
          startIcon={<FcGoogle />}
          sx={buttonSX}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
