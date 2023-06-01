import React from "react";

const FlashMessageCtx = React.createContext({
  haveMessage: false,
  haveError: false,
  message: "",
  setFlashMessage: () => {},
  removeFlashMessage: () => {},
});

export default FlashMessageCtx;
