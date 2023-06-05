import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { firebaseAuth } from '../firebase-config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //This is for the programatically navigation
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          toast.error("Invalid Email");
          break;
          
          case "auth/missing-password":
          toast.error("Missing Password");
          break;
          
          case "auth/wrong-password":
          toast.error("Wrong Password");
          break;
        
          case "auth/user-not-found":
          toast.info("User Not Found");
          break;
          
        default:
          toast.error("An error occurred during authentication. Please try again.");
          break;
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    })
  }, [])


  return (
    <Section>
      <div className="container">
        <h1>Login</h1>
        <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} onKeyPress={e=>e.key==="Enter"?handleLogin():null} />
        <div className="button">
          <button onClick={handleLogin}>Login</button>
          <span>Don't have an Account?
            <Link to="/signup"> Signup</Link>
          </span>
        </div>
      </div>
    </Section>
  )
}

export default Login


const Section = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
  }
  .container {
    height: 50vh;
    background-color: #2c384a;
    border-radius: 1rem;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    padding:10px;
    input {
      background-color: #5c5f63a3;
      border: none;
      font-size: 1.2rem;
      padding: 1rem;
      border-radius: 0.3rem;
      color: white;
      &:focus {
        outline: 1px solid;
        outline-color: #f57c00;
        -moz-outline-radius: 0.3rem;
      }
    }
    .button {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      a {
        color: #039be5;
        text-decoration: none;
      }
      button {
        background-color: #f57c00;
        border: none;
        color: white;
        padding: 0.5rem 2rem;
        border-radius: 0.3rem;
        font-size: 1.2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        text-transform: uppercase;
        &:hover {
          background-color: #ffa000;
        }
      }
    }
  }
`;