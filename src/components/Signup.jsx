import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../firebase-config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  //This is for the programatically navigation
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          toast.error("Invalid Email");
          break;

        case "auth/missing-password":
          toast.error("Missing Password");
          break;

        case "auth/weak-password":
          toast.warning("Weak Password");
          break;
        
        case "auth/email-already-in-use":
          toast.info("Account Already Registered ");
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
        <h1>Signup</h1>
        
        <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        <div className="button">
          <button onClick={handleSignIn}>Signup</button>
          <span>Already have an Account?
            <Link to="/login"> Login</Link>
          </span>
        </div>
      </div>
    </Section>
  )
}

export default Signup


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