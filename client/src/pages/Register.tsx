import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../scss/styles.scss";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";
import api_key from "../Services/Api_Url";
import axios from "axios";
import { useLogin } from "../Context/Login";
import Alert from "../Components/Alert";
import { SignupType } from "../../types/mainTypes";
import { useSignup } from "../Context/Signup-VerifyAccount";

let emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Register() {
  const { alreadyExist, setAlreadyExist, isSignedUp, setIsSignedUp } =
    useLogin();
  const { setEmail, setPassword } = useSignup();
  // email error message
  const usernameRef = useRef<HTMLInputElement>(null);
  const usernameErrorMessage = useRef<HTMLParagraphElement>(null);
  //  email error message
  const emailRef = useRef<HTMLInputElement>(null);
  const emailErrorMessage = useRef<HTMLParagraphElement>(null);
  //  email error message
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordErrorMessage = useRef<HTMLParagraphElement>(null);

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const Signup = async ({ username, email, password, avatar }: SignupType) => {
    const res = await axios.post(`${api_key}/auth/signup`, {
      data: {
        username,
        email,
        password,
        avatar,
      },
    });
    let data = res.data;
    let message = data.message;
    if (message == "There Is Already User With This Email") {
      setAlreadyExist(true);
    } else {
      setAlreadyExist(false);
      setIsSignedUp(true);
      localStorage.setItem("isSignedup", "true");
      localStorage.setItem("email", email);
      localStorage.setItem("pass", password);
      setTimeout(() => {
        // <Navigate to={"/verify-email"} />;
        window.location.href = window.location.origin;
      }, 400);
    }
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // validate username
    if (usernameRef.current.value === "") {
      usernameErrorMessage.current.innerText = "Please Enter Your Username";
      usernameRef.current.classList.add("invalid");
    } else {
      usernameRef.current.classList.remove("invalid");
    }
    // validate email
    if (emailRef.current.value.toLowerCase().match(emailReg) === null) {
      emailErrorMessage.current.innerText = "Please Enter A Valid Email !";
      emailRef.current.classList.add("invalid");
    } else {
      emailRef.current.classList.remove("invalid");
    }
    // validate password
    if (passwordRef.current.value.length <= 6) {
      passwordErrorMessage.current.innerText = "Password Is Too Short !";
      passwordRef.current.classList.add("invalid");
    } else {
      passwordRef.current.classList.remove("invalid");
    }
    let inputs = [usernameRef.current, emailRef.current, passwordRef.current];
    let invalidInputs = [];
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].classList.contains("invalid")) {
        invalidInputs.push(inputs[i]);
      }
    }
    if (invalidInputs.length === 0) {
      // send request
      Signup({
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        avatar: "../images/profile pic.png",
      });
    }
  }

  const validateUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const errorMessage = usernameErrorMessage.current;
    if (inputValue == "") errorMessage.innerText = "Please Enter Your Username";
    else errorMessage.innerText = "";
  };

  const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const errorMessage = emailErrorMessage.current;
    // validate email
    if (inputValue.toLowerCase().match(emailReg) === null)
      errorMessage.innerText = "Please Enter A Valid Email !";
    else errorMessage.innerText = "";
  };

  const validatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 6) {
      passwordErrorMessage.current.innerText = "Password Is Too Short !";
    } else {
      passwordErrorMessage.current.innerText = "";
    }
  };

  document.body.classList.add("login-page");
  return (
    <>
      {alreadyExist ? Alert("There is already user with submited email") : ""}
      {isSignedUp ? <Navigate to={"/verify-email"} /> : ""}
      <div className="about">
        <h1>Mohamed Montaser's Social Media</h1>
        <p style={{ textTransform: "capitalize" }}>
          Hello I'm mohamed montaser, I'm Building This Project To Improve my
          Fullstack Skills. I Hope You Enjoy With My Social Media Website
        </p>
      </div>
      <form
        id="form"
        className="form-container"
        onSubmit={handleSubmit}
        spellCheck="false"
      >
        <div className="form-control form-username">
          <label htmlFor="username" className="label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => validateUsername(e)}
            ref={usernameRef}
            autoFocus
          />
          <p className="error-msg" ref={usernameErrorMessage}></p>
        </div>

        <div className="form-control form-username">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="text"
            onChange={(e) => validateEmail(e)}
            id="email"
            ref={emailRef}
          />
          <p className="error-msg" ref={emailErrorMessage}></p>
        </div>
        <div className="form-control form-username">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <div className="input">
            <input
              type={isShowPassword ? "text" : "password"}
              id="password"
              ref={passwordRef}
              onChange={(e) => validatePassword(e)}
            />
            <button
              type="button"
              onClick={(e) => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <UilEyeSlash /> : <UilEye />}
            </button>
          </div>
          <p ref={passwordErrorMessage} className="error-msg"></p>
        </div>
        <input type="submit" value="Submit" />
        <p className="register-link">
          You Have Already An Account ? <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </>
  );
}
