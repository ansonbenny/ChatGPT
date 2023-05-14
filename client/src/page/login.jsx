import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GptIcon } from "../assets";
import { LoginComponent } from "../components";
import { setLoading } from "../redux/loading";
import "./style.scss";

const Login = () => {
  const location = useLocation();

  const [auth, setAuth] = useState(false);

  const { user } = useSelector((state) => state);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      if (location?.pathname === "/login/auth") {
        setAuth(true);
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      } else {
        setAuth(false);
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      }
    }
  }, [location]);

  return (
    <div className="Auth">
      <div className="inner">
        {auth ? (
          <LoginComponent />
        ) : (
          <div className="suggection">
            <div>
              <GptIcon />
            </div>

            <div>
              <p>Welcome to ChatGPT</p>
              <p>Log in with your OpenAI account to continue</p>
            </div>

            <div className="btns">
              <button
                onClick={() => {
                  navigate("/login/auth");
                }}
              >
                Log in
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </button>
            </div>
          </div>
        )}

        <div className="bottum">
          <div className="start">
            <a href="https://openai.com/policies/terms-of-use" target="_blank">
              Terms of use
            </a>
          </div>
          <div className="end">
            <a
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
