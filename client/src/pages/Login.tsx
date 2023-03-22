import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../scss/styles.scss";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";
import api_key from "../Services/Api_Url";
import { LoginType, SignupType } from "../../types/mainTypes";
import axios from "axios";
import { useLogin } from "../Context/Login";

let emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Login() {
  let { jwt, setJwt, setIsLoggedIn, isLoggedIn } = useLogin();
  //  email error message
  const emailRef = useRef<HTMLInputElement>(null);
  const emailErrorMessage = useRef<HTMLParagraphElement>(null);
  //  email error message
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordErrorMessage = useRef<HTMLParagraphElement>(null);

  const [isShowPassword, setIsShowPassword] = useState(false);

  const LoginReq = async ({ email, password }: LoginType) => {
    const res = await axios.post(`${api_key}/auth/login`, {
      data: {
        email,
        password,
      },
    });
    let data = res.data;
    setJwt(data.data.accessToken);
    localStorage.setItem("jwt", data.data.accessToken);
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedin", "true");
    window.location.href = window.location.origin;
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // validate email
    if (emailRef.current.value.toLowerCase().match(emailReg) === null) {
      emailErrorMessage.current.innerText = "Please Enter A Valid Email !";
      emailRef.current.classList.add("invalid");
    } else {
      emailErrorMessage.current.innerText = "";
      emailRef.current.classList.remove("invalid");
    }
    // validate password
    if (passwordRef.current.value.length <= 6) {
      passwordErrorMessage.current.innerText = "Password Is Too Short !";
      passwordRef.current.classList.add("invalid");
    } else {
      passwordErrorMessage.current.innerText = "";
      passwordRef.current.classList.remove("invalid");
    }
    let inputs = [emailRef.current, passwordRef.current];
    let invalidInputs = [];
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].classList.contains("invalid")) {
        invalidInputs.push(inputs[i]);
      }
    }

    if (invalidInputs.length === 0) {
      // send req
      console.log(typeof emailRef.current.value);
      console.log(typeof passwordRef.current.value);
      LoginReq({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  }

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
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="text"
            onChange={(e) => validateEmail(e)}
            id="email"
            ref={emailRef}
            autoFocus
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
          You Have Already An Account ? <Link to={"/register"}>Sign up</Link>
        </p>
      </form>
    </>
  );
}
