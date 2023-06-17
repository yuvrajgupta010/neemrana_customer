import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import classes from "./Login.module.css";

import AuthCtx from "@/ctxStore/authCtx";

import { formInputValidation } from "@/util/userInputValidation";

import FlexibleForm from "../UI/FlexibleForm/FlexibleForm";
import Status from "../UI/Status/Status";
import FlashMessageCtx from "@/ctxStore/flashMessageCtx";

const Login = (props) => {
  const { onSuccessfullLogin, isAuthenticated } = useContext(AuthCtx);
  const { message, haveMessage, setFlashMessage } = useContext(FlashMessageCtx);
  const router = useRouter();

  // Form type of Form
  // "login", "forget password", "new user", "new password"
  const [haveError, setHaveError] = useState(false);
  const [haveStatus, setHaveStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [formType, setFormType] = useState("login");
  const [forgetPasswordToken, setForgetPasswordToken] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [router, isAuthenticated]);

  if (isAuthenticated === true) {
    return <p></p>;
  }

  const throwStatus = (message, error = false) => {
    setHaveError(error);
    setHaveStatus(true);
    setStatusMessage(message);
  };

  const resetStatus = () => {
    setHaveError(false);
    setHaveStatus(false);
    setStatusMessage("");
  };

  const userInputsFromForm = (data) => {
    const formIsValid = formInputValidation({
      data,
      formType,
      throwStatus,
      resetStatus,
    });
    if (formIsValid === "valid") {
      if (formType === "new user") {
        const formatedData = {
          contactNo: data.contactNo,
          email: data.email.toLocaleLowerCase(),
          firstName: data.firstName,
          lastName: data.lastName,
          forgetQuestionType: data.forgetQuestionType,
          forgetQuestionAnswer: data.forgetQuestionAnswer,
          password: data.password,
        };

        fetch(
          "https://neemrana-hotel-api.onrender.com/customer/create-account",
          {
            method: "POST",
            body: JSON.stringify(formatedData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("Your email and contact no. already exist !");
            }
            return res.json();
          })
          .then((data) => {
            setFlashMessage(data.message, false);
            setHaveError(false);
            setFormType("login");
          })
          .catch((err) => {
            setFlashMessage(err.message);
            setHaveError(true);
          });
      } else if (formType === "login") {
        const formatedData = {
          email: data.email.toLocaleLowerCase(),
          password: data.password.trim(),
        };
        fetch("https://neemrana-hotel-api.onrender.com/customer/login", {
          method: "POST",
          body: JSON.stringify(formatedData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) {
              if (res.status === 404) {
                throw new Error(
                  "Account doesn't exists, Please create you accounts!"
                );
              } else if (res.status === 401) {
                throw new Error("Please enter valid password !");
              }
            }
            return res.json();
          })
          .then((data) => {
            onSuccessfullLogin(data);
          })
          .catch((err) => {
            setFlashMessage(err.message, true);
            setHaveError(true);
            console.error(err.message);
          });
      } else if (formType === "forget password") {
        const formatedData = data;
        fetch(
          "https://neemrana-hotel-api.onrender.com/customer/forget-password",
          {
            method: "POST",
            body: JSON.stringify(formatedData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (!res.ok) {
              let message;
              if (res.status === 400) {
                message = "Account doesn't exists !";
              } else if (res.status === 401) {
                message = "Wrong selected question or answer !";
              }
              throw new Error(message);
            }
            return res.json();
          })
          .then((data) => {
            setForgetPasswordToken(data.token);
            setFormType("new password");
            setFlashMessage(
              "Answer successfully matched, kindly set your new password !"
            );
            setHaveError(false);
          })
          .catch((err) => {
            setFlashMessage(err.message);
            setHaveError(true);
            console.error(err.message);
          });
      } else if (formType === "new password") {
        console.log("new password");
        const formIsValid = formInputValidation({
          data,
          formType,
          throwStatus,
          resetStatus,
        });
        if (formIsValid === "valid") {
          const formatedData = {
            password: data.password,
          };
          fetch(
            "https://neemrana-hotel-api.onrender.com/customer/new-password",
            {
              method: "POST",
              body: JSON.stringify(formatedData),
              headers: {
                "Content-Type": "application/json",
                Authorization: forgetPasswordToken,
              },
            }
          )
            .then((res) => {
              if (!res.ok) {
                throw new Error("Unauthorised request !");
              }
              return res.json();
            })
            .then((data) => {
              setFlashMessage(data.message, false);
              setHaveError(false);
              setFormType("login");
              setForgetPasswordToken(null);
            })
            .catch((err) => {
              setFlashMessage(err.message, true);
              setHaveError(true);
              setForgetPasswordToken(null);
            });
        }
      }
    }
  };

  const formTypeChangeHandler = (type) => {
    setFormType(type);
  };

  return (
    <section className={classes.section}>
      {haveMessage ? <Status message={message} error={haveError} /> : ""}
      {haveStatus ? <Status error={haveError} message={statusMessage} /> : ""}
      <h2 className={classes.secondary_heading}>
        <span>
          {formType === "login"
            ? "Login"
            : formType === "new user"
            ? "Create New Account"
            : formType === "forget password"
            ? "Forget your password"
            : formType === "new password"
            ? "Your new password"
            : ""}
        </span>
      </h2>
      <FlexibleForm
        formType={formType}
        formTypeChangeHandler={formTypeChangeHandler}
        onSubmitForm={userInputsFromForm}
      />
    </section>
  );
};

export default Login;
