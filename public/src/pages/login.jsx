import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.png";



function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    theme: "dark"
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) { // Corrected the condition
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("in Validation", loginRoute);
      const { password, email } = values;
      try {
        const { data } = await axios.post(loginRoute, { // Update to use loginRoute
          email,
          password
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem('chat-app-user', JSON.stringify(data.user));
          navigate("/");
        }
      } catch (error) {
        console.error("Login Error:", error);
        toast.error("An error occurred while logging in.", toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { password, email } = values;
    if (password === "" || email === "") {
      toast.error("Email and Password are required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
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
            type="email"
            placeholder="johndoe@email.com"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}


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

export default Login;
