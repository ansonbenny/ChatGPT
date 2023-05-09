import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setLoading } from "./redux/loading";
import instance from "./config/instance";
import { emptyUser, insertUser } from "./redux/user";
import { emptyAllRes } from "./redux/messages";

const ProtectedRoute = ({ offline, authed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state);

  useLayoutEffect(() => {
    dispatch(setLoading({ api: true, site: true }));
    const getResponse = async () => {
      let res = null;

      try {
        res = await instance.get("/api/user/checkLogged");
        if (res?.data?.data) {
          dispatch(insertUser(res?.data?.data));
        }
      } catch (err) {
        console.log(err);
        dispatch(setLoading({ api: false }));

        if (err?.response?.data?.status === 405) {
          dispatch(emptyUser());
          dispatch(emptyAllRes());
          if (authed) {
            navigate("/login");
          }
        } else if (err?.code !== "ERR_NETWORK") {
          navigate("/something-went-wrong");
        }
      } finally {
        if (res?.data?.status === 208) {
          dispatch(setLoading({ api: false }));
          if (!authed) {
            navigate("/");
          }
        }
      }
    };

    if (!offline) {
      getResponse();
    }
  }, [location]);

  return !loading?.api && user ? authed && <Outlet /> : !authed && <Outlet />;
};

export default ProtectedRoute;
