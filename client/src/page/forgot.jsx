import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ForgotComponent } from "../components";
import instance from "../config/instance";
import { setLoading } from "../redux/loading";
import "./style.scss";

const Forgot = () => {
  const { user } = useSelector((state) => state);

  const { userId = null, secret = null } = useParams();

  const location = useLocation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isRequest, setIsRequest] = useState(true);

  useEffect(() => {
    if (!user) {
      if (
        location?.pathname === "/forgot/" ||
        location?.pathname === "/forgot"
      ) {
        setIsRequest(true);
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      } else {
        const getResponse = async () => {
          let res = null;

          try {
            res = await instance.get("/api/user/forgot-check", {
              params: {
                userId,
                secret,
              },
            });
          } catch (err) {
            console.log(err);
            if (err?.response?.status === 404) {
              navigate("/404");
            } else {
              alert(err);
              navigate("/forgot");
            }
          } finally {
            if (res?.data?.status !== 208) {
              setIsRequest(false);
              setTimeout(() => {
                dispatch(setLoading(false));
              }, 1000);
            }
          }
        };

        getResponse();
      }
    }
  }, [location]);

  return (
    <div className="Auth">
      <div className="inner">
        <ForgotComponent
          isRequest={isRequest}
          userId={userId}
          secret={secret}
        />

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

export default Forgot;
