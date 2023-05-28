import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth, getcurrentUser } from "@FireContext"
import GoogleButton from 'react-google-button';
import upload from '../assets/upload.svg';

const LandingPage = () => {
  const navigate = useNavigate();
  const currentUser = getcurrentUser();
  const { popupGoogle } = useAuth();

  const handleClick = () => {
    popupGoogle();
  }

  useEffect(() => {
    if (currentUser) { navigate("/home") }
  }, [currentUser?.uid]);

  return (
    <>
      <div className="landing-page">
        <div className="left">
          <div className="gradient" />
          <h1>Welcome to MyDrive.</h1>
          <p style={{ color: '#8739F9', textAlign: 'center' }}>
            Fast & Secure
          </p>
          <h3>
            Here you can upload all your files free of cost and access them from anywhere anytime.
          </h3>
          <GoogleButton onClick={handleClick} />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
