import { useState } from "react";
import FlashMessageCtx from "./flashMessageCtx";

const FlashMessageCtxProvider = (props) => {
  const [haveMessage, setHaveMessage] = useState(false);
  const [haveError, setHaveError] = useState(false);
  const [message, setMessage] = useState("");

  const removeFlashMessage = () => {
    setTimeout(() => {
      setHaveError(false);
      setHaveMessage(false);
      setMessage("");
    }, 4000);
  };

  const setFlashMessage = (message, haveError = false) => {
    setHaveError(haveError);
    setHaveMessage(true);
    setMessage(message);
    removeFlashMessage();
  };

  return (
    <FlashMessageCtx.Provider
      value={{
        haveMessage,
        haveError,
        message,
        removeFlashMessage,
        setFlashMessage,
      }}
    >
      {props.children}
    </FlashMessageCtx.Provider>
  );
};

export default FlashMessageCtxProvider;
