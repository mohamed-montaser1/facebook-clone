import { useState, useEffect } from "react";
import axios from "axios";
import api_key from "../Services/Api_Url";
import { useLogin } from "../Context/Login";
import { useSignup } from "../Context/Signup-VerifyAccount";

let pattern = /[a-zA-Z]/i;

export default function VerifyEmail() {
  let [code, setCode] = useState<string>("");
  let [inputValue, setInputValue] = useState<string>("");
  const { setIsLoggedIn, setJwt } = useLogin();
  const { email, setEmail, password, setPassword } = useSignup();
  document.body.classList.add("verify-email");
  document.body.classList.remove("login-page");
  useEffect(() => {
    async function VerifyEmailRequest() {
      let res = await axios.get(`${api_key}/verify-email/${email}`);
      setCode(res.data.code);
    }
    VerifyEmailRequest();
  }, []);

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    let loginResponseBody = {
      data: {
        email,
        password,
      },
    };
    if (e.key === "Enter") {
      if (pattern.test(inputValue)) {
        alert("You have to type numbers only");
      } else {
        if (+code === +inputValue) {
          const res = await axios.post(
            `${api_key}/auth/login`,
            loginResponseBody
          );
          let accessToken = res.data.data.accessToken;
          setJwt(accessToken);
          localStorage.clear();
          localStorage.setItem("jwt", accessToken);
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedin", "true");
          window.location.href = window.location.origin;
        } else alert("Code Is Wrong!");
      }
    }
  };

  return (
    <div className="box">
      <h1>Check Your Mail</h1>
      <p>
        We've just sent a link to {email}. Verify your address and we'll get you
        all set up!
      </p>
      <input
        className="input-field"
        type="text"
        autoFocus
        required
        autoComplete="off"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={handleEnter}
        maxLength={4}
      />
    </div>
  );
}
