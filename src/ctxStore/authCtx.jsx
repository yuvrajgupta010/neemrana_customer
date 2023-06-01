import React from "react";

const AuthCtx = React.createContext({
  isAuthenticated: false,
  token: null,
  userData: {
    email: "",
    contactNo: "",
    customerName: "",
  },
  onSuccessfullLogin: () => {},
  onSuccessfullLogout: () => {},
});

export default AuthCtx;
