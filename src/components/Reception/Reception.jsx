import { useContext, useEffect, useState } from "react";

import classes from "./Reception.module.css";

import Status from "../UI/Status/Status";

import { validateNumber } from "@/util/contactNumberVerify";

import AuthCtx from "@/ctxStore/authCtx";
import FlashMessageCtx from "@/ctxStore/flashMessageCtx";

const Reception = (props) => {
  const {
    haveError,
    haveMessage,
    message,
    setFlashMessage,
    removeFlashMessage,
  } = useContext(FlashMessageCtx);
  const { userData, isAuthenticated } = useContext(AuthCtx);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [contact, setContact] = useState("");
  const [queryMessage, setQueryMessage] = useState("");

  const { customerName, contactNo } = userData;

  useEffect(() => {
    if (isAuthenticated) {
      setName(customerName);
      setContact(contactNo);
    }
  }, [isAuthenticated, customerName, contactNo]);

  const resetForm = () => {
    setName("");
    setSubject("");
    setContact("");
    setQueryMessage("");
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
  };

  const contactChangeHandler = (event) => {
    setContact(event.target.value);
  };

  const formResetHandler = (event) => {
    event.preventDefault();
    resetForm();
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (name.trim().length === 0) {
      setFlashMessage("Please enter valid name !", true);
      return;
    } else if (!validateNumber(contact)) {
      setFlashMessage("Please enter valid contact no. !", true);
      return;
    }
    const formatedData = {
      contactNo: contact,
      message: queryMessage,
      name: name,
      subject: subject,
    };
    fetch("https://neemrana-hotel-api.onrender.com/customer/customer-query", {
      method: "POST",
      body: JSON.stringify(formatedData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something bad happened !");
        }
        return res.json();
      })
      .then((data) => {
        resetForm();
        setFlashMessage(data.message, false);
      })
      .catch((err) => {
        console.error(err.message);
        setFlashMessage(err.message, true);
        resetForm();
      });
  };

  return (
    <>
      {haveMessage && <Status error={haveError} message={message} />}
      <section className={classes.section}>
        <div className={classes.flex}>
          <h2 className={classes.secondary_heading}>
            <span>Call on</span>
          </h2>
          <p>7873756677</p>
        </div>
        <p className={classes.middle}>Or</p>
        <form
          onSubmit={formSubmitHandler}
          onReset={formResetHandler}
          className={classes.form}
        >
          <h2 className={classes.secondary_heading}>
            <span>Get callback</span>
          </h2>
          <div className={classes.input_field}>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              name="name"
              onChange={nameChangeHandler}
              value={name}
              id="name"
              required
            />
          </div>
          <div className={classes.input_field}>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              onChange={subjectChangeHandler}
              value={subject}
              id="subject"
            />
          </div>
          <div className={classes.input_field}>
            <label htmlFor="contact">Contact No.*</label>
            <input
              type="tel"
              name="contact"
              onChange={contactChangeHandler}
              value={contact}
              id="contact"
              required
            />
          </div>
          <div className={`${classes.message_box} ${classes.input_field}`}>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              value={queryMessage}
              id="message"
              onChange={(e) => setQueryMessage(e.target.value)}
              rows={6}
            />
          </div>
          <div className={classes.buttons}>
            <button type="submit">{"Submit"}</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Reception;
