import { useState } from "react";
import classes from "./FlexibleForm.module.css";

const FlexibleForm = (props) => {
  const { formType, formTypeChangeHandler, onSubmitForm } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [question, setQuestion] = useState("pet_name");
  const [answer, setAnswer] = useState("");
  const [contact, setContact] = useState("");

  const [currentPasswordIsVisible, setCurrentPasswordIsVisible] =
    useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    useState(false);

  const showPassword = (which) => {
    if (which === "password") {
      setPasswordIsVisible((prev) => !prev);
    } else if (which === "confirm password") {
      setConfirmPasswordIsVisible((prev) => !prev);
    } else if (which === "current password") {
      setCurrentPasswordIsVisible((prev) => !prev);
    }
  };

  const resetFormHandler = (event) => {
    event.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setQuestion("pet_name");
    setAnswer("");
    setContact("");
    setCurrentPassword("");
  };

  const subitFormHandler = (event) => {
    event.preventDefault();
    const returnedObj = {};
    if (formType === "new user") {
      returnedObj.firstName = firstName;
      returnedObj.lastName = lastName;
      returnedObj.email = email.toLocaleLowerCase();
      returnedObj.password = password;
      returnedObj.confirmPassword = confirmPassword;
      returnedObj.forgetQuestionType = question;
      returnedObj.forgetQuestionAnswer = answer;
      returnedObj.contactNo = contact;
    } else if (formType === "login") {
      returnedObj.email = email.toLocaleLowerCase();
      returnedObj.password = password;
    } else if (formType === "forget password") {
      returnedObj.email = email.toLocaleLowerCase();
      returnedObj.forgetQuestionType = question;
      returnedObj.forgetQuestionAnswer = answer;
    } else if (formType === "new password") {
      returnedObj.password = password;
      returnedObj.confirmPassword = confirmPassword;
    } else if (formType === "change password") {
      returnedObj.currentPassword = currentPassword;
      returnedObj.newPassword = password;
      returnedObj.confirmNewPassword = confirmPassword;
    }
    onSubmitForm(returnedObj);
    resetFormHandler(event);
  };

  const firstNameInput = (
    <>
      <label className={classes.label} htmlFor="first_name">
        First name*
      </label>
      <input
        className={classes.input}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Raj"
        type="text"
        name="first_name"
        id="first_name"
        required
      />
    </>
  );

  const lastNameInput = (
    <>
      <label className={classes.label} htmlFor="last_name">
        Last name
      </label>
      <input
        className={classes.input}
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        type="text"
        name="last_name"
        id="lastName"
      />
    </>
  );

  const emailInput = (
    <>
      <label className={classes.label} htmlFor="email">
        Email*
      </label>
      <input
        className={classes.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="raj@mail.com"
        type="text"
        name="email"
        id="email"
        required
      />
    </>
  );

  const currentPasswordInput = (
    <>
      <label className={classes.label} htmlFor="current_password">
        Current Password
      </label>
      <div className={classes.password_box}>
        <input
          className={classes.input}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type={currentPasswordIsVisible ? "text" : "password"}
          name="current_password"
          id="current_password"
          minLength={6}
          required
        />
        <div>
          <input
            className={classes.input_checkbox}
            type="checkbox"
            onClick={showPassword.bind(null, "current password")}
            name="show_current_password"
            id="show_current_password"
          />
          <label htmlFor="show_password" className={classes.label_checkbox}>
            Show password
          </label>
        </div>
      </div>
    </>
  );
  const passwordInput = (
    <>
      <label className={classes.label} htmlFor="password">
        {formType === "new password" || formType === "change password"
          ? "New password*"
          : "Password*"}
      </label>
      <div className={classes.password_box}>
        <input
          className={classes.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={passwordIsVisible ? "text" : "password"}
          name="password"
          id="password"
          minLength={6}
          required
        />
        <div>
          <input
            className={classes.input_checkbox}
            type="checkbox"
            onClick={showPassword.bind(null, "password")}
            name="show_password"
            id="show_password"
          />
          <label htmlFor="show_password" className={classes.label_checkbox}>
            Show password
          </label>
        </div>
      </div>
    </>
  );

  const confirmPasswordInput = (
    <>
      <label className={classes.label} htmlFor="confirm_password">
        {formType === "new password" || formType === "change password"
          ? "Confirm new password*"
          : "Confirm Password*"}
      </label>
      <div className={classes.password_box}>
        <input
          className={classes.input}
          type={confirmPasswordIsVisible ? "text" : "password"}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          name="confirm_password"
          id="confirm_password"
          minLength={6}
          required
        />
        <div>
          <input
            className={classes.input_checkbox}
            type="checkbox"
            onClick={showPassword.bind(null, "confirm password")}
            name="show_confirm_password"
            id="show_confirm_password"
          />
          <label
            htmlFor="show_confirm_password"
            className={classes.label_checkbox}
          >
            Show password
          </label>
        </div>
      </div>
    </>
  );

  const forgetQuestionInput = (
    <>
      <label className={classes.label} htmlFor="recovery_question">
        Forget password question*
      </label>
      <select
        name="recovery_question"
        onChange={(e) => setQuestion(e.target.value)}
        value={question}
        id="recovery_question"
        required
      >
        <option value={"pet_name"}>What is your pet name ?</option>
        <option value={"nick_name"}>What is nick name ?</option>
        <option value={"favourite_dish"}>What is your favourite dish ?</option>
      </select>
    </>
  );

  const questionAnswer = (
    <>
      <label className={classes.label} htmlFor="recovery_answer">
        Question Answer*
      </label>
      <input
        className={classes.input}
        onChange={(e) => setAnswer(e.target.value)}
        value={answer}
        type="text"
        name="recovery_answer"
        id="recovery_answer"
        required
      />
    </>
  );

  const contactInput = (
    <>
      <label className={classes.label} htmlFor="contact_no">
        Contact no.*
      </label>
      <input
        className={classes.input}
        onChange={(e) => setContact(e.target.value)}
        value={contact}
        type="tel"
        name="contact_no"
        id="contact_no"
        required
      />
    </>
  );

  const allButtons = (
    <>
      <div className={classes.buttons}>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </>
  );

  const paraExistingUser = (
    <p onClick={formTypeChangeHandler.bind(null, "login")}>Existing user</p>
  );
  const paraForgetPassword = (
    <p onClick={formTypeChangeHandler.bind(null, "forget password")}>
      Forget password
    </p>
  );
  const paraNewUser = (
    <p onClick={formTypeChangeHandler.bind(null, "new user")}>
      Create new account
    </p>
  );

  const formBuilder = (formType) => {
    // Form type of Form
    // "login", "forget password", "new user", "new password"

    if (formType === "new user") {
      return (
        <>
          {firstNameInput}
          {lastNameInput}
          {emailInput}
          {passwordInput}
          {confirmPasswordInput}
          {forgetQuestionInput}
          {questionAnswer}
          {contactInput}
          {allButtons}
          <div className={classes.other_links}>
            {paraExistingUser}
            <span>|</span>
            {paraForgetPassword}
          </div>
        </>
      );
    } else if (formType === "login") {
      return (
        <>
          {emailInput}
          {passwordInput}
          {allButtons}
          <div className={classes.other_links}>
            {paraNewUser}
            <span>|</span>
            {paraForgetPassword}
          </div>
        </>
      );
    } else if (formType === "forget password") {
      return (
        <>
          {emailInput}
          {forgetQuestionInput}
          {questionAnswer}
          {allButtons}
          <div className={classes.other_links}>
            {paraExistingUser}
            <span>|</span>
            {paraNewUser}
          </div>
        </>
      );
    } else if (formType === "new password") {
      return (
        <>
          {passwordInput}
          {confirmPasswordInput}
          {allButtons}
          <div className={classes.other_links}>
            {paraNewUser}
            <span>|</span>
            {paraExistingUser}
          </div>
        </>
      );
    } else if (formType === "change password") {
      return (
        <>
          {currentPasswordInput}
          {passwordInput}
          {confirmPasswordInput}
          {allButtons}
        </>
      );
    }
  };

  const buildedForm = formBuilder(formType);

  return (
    <form
      className={classes.form}
      onSubmit={subitFormHandler}
      onReset={resetFormHandler}
    >
      {buildedForm}
    </form>
  );
};

export default FlexibleForm;
