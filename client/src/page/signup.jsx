import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RegisterPendings, SignupComponent } from "../components";
import instance from "../config/instance";
import { setLoading } from "../redux/loading";
import "./style.scss";

const Signup = () => {
  const [pending, setPending] = useState(false);
  const { id } = useParams();
  const { loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const path = window.location.pathname;

  const navigate = useNavigate();

  useEffect(() => {
    if (path === "/signup" || path === "/signup/") {
      setPending(false);
      setTimeout(() => {
        dispatch(setLoading({ site: false }));
      }, 1000);
    } else {
      const checkPending = async () => {
        let res = null;
        try {
          res = await instance.get("/api/user/checkPending", {
            params: {
              _id: id,
            },
          });
        } catch (err) {
          console.log(err);
          if (err?.response?.status === 404) {
            navigate("/404");
          } else {
            alert(err);
            navigate("/signup");
          }
        } finally {
          if (res?.data?.status !== 208) {
            setPending(true);
            setTimeout(() => {
              dispatch(setLoading({ site: false }));
            }, 1000);
          }
        }
      };

      checkPending();
    }
  }, [path, loading]);

  return (
    <div className="Auth">
      <div className="inner">
        {pending ? (
          <RegisterPendings _id={id} />
        ) : (
          <>
            <SignupComponent />

            <div className="bottum">
              <div className="start">
                <a
                  href="https://openai.com/policies/terms-of-use"
                  target="_blank"
                >
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
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
