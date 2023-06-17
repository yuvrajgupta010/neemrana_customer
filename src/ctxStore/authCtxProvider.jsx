import { useState, useEffect } from "react";
import AuthCtx from "./authCtx";
import { useRouter } from "next/router";

const AuthCtxProvider = (props) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    contactNo: "",
    customerName: "",
  });
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== null) {
      fetch("https://neemrana-hotel-api.onrender.com/customer/get-data", {
        method: "GET",
        headers: {
          Authorization: storedToken,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Not a valid user !");
          }
          return res.json();
        })
        .then((data) => {
          setIsAuthenticated(data.isAuthenticated);
          setUserData(data.user);
          setToken(storedToken);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          router.push("/");
          console.error(err.message);
        });
    }
    setFirstRender(false);
  }, []);

  const onSuccessfullLogin = (data) => {
    if (data.isAuthenticated) {
      localStorage.setItem("token", data.token);
      setIsAuthenticated(data.isAuthenticated);
      setToken(data.token);
      setUserData(data.user);
      router.push("/");
    }
  };

  const onSuccessfullLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");

    setIsAuthenticated(false);
    setToken(null);
    setUserData({
      email: "",
      contactNo: "",
      customerName: "",
    });
    router.push("/");
  };

  return (
    <AuthCtx.Provider
      value={{
        isAuthenticated,
        token,
        userData,
        onSuccessfullLogin,
        onSuccessfullLogout,
      }}
    >
      {firstRender ? "" : props.children}
    </AuthCtx.Provider>
  );
};

export default AuthCtxProvider;
