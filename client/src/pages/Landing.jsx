import styled from "styled-components"
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import logo from '../assets/images/logo.svg'
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info"> 
          <h1>
            job <span>tracking</span> 
          </h1>
          <p>
          The soft hum of the city at night was a melody of distant car horns, the occasional chatter of late-night wanderers, and the rhythmic tapping of rain against the pavement. Streetlights cast a golden glow on puddles, turning them into shimmering mirrors reflecting the world above. A lone café remained open, its neon sign flickering as steam curled from coffee cups inside.
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn'>
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img'/>
      </div>
    </Wrapper>
  );
}


export default Landing