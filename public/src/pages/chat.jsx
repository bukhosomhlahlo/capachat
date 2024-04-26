import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) { // Corrected the condition
      navigate("/chat");
    }
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    theme: "dark",
  };

  

  const handleChange = async(event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("in Validation", registerRoute);
      const{password, username, email} = values;
      const {data} = await axios.post(registerRoute,{
        username,
        email,
        password,
      });
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true){
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  const handleValidation = () => {
    const { password, username, email } = values;
    if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Capa Chat</h1>
          </div>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="johndoe@email.com"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 200vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #000;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 10rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 350px;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: #000;
    color: #fff;
    border: 3px solid #333;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: none;
    outline: none;
    color: white;
    background-color: rgba(21, 21, 21, 0.781);
    box-shadow: inset 5px 8px 12px 6px rgb(5, 5, 5);
    border-radius: 20px;
    font-size: 1rem;
    &:focus {
      border: #00000076 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    padding: 1rem 2rem;
    border-radius: 25px;
    margin-right: 0.5em;
    border: none;
    outline: none;
    transition: 0.5s ease-in-out;
    background-color: goldenrod;
    box-shadow: inset 5px 8px 18px 6px rgb(5, 5, 5);
    color: white;
    font-size: 1rem;
    cursor: pointer;
    text-transform: uppercase;
  }

  button:hover {
    background-color: transparent;
    color: white;
    transition: 0.5s ease-in-out;
  }

  span {
    color: white;
    text-transform: uppercase;

    a {
      color: blue;
      text-transform: none;
      font-weight: bold;
    }
  }
`;

export default Register;
