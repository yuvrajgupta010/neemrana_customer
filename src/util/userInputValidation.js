import { validateNumber } from "./contactNumberVerify";

export const formInputValidation = ({
  data,
  formType,
  throwStatus: statusFn,
  resetStatus: resetStatusFn,
}) => {
  let formIsVaild = "valid";
  if (formType === "new user") {
    if (data.firstName.trim().length === 0) {
      statusFn("please enter valid name !", true);
      formIsVaild = "unvalid";
    } else if (!data.email.trim().includes("@")) {
      formIsVaild = "unvalid";
      statusFn("Please enter vaild email !", true);
    } else if (
      data.password.trim().length < 6 ||
      data.confirmPassword.trim().length < 6
    ) {
      formIsVaild = "unvalid";

      statusFn(
        "Please enter password of length more than 5 with no space !",
        true
      );
    } else if (data.password.trim() !== data.confirmPassword.trim()) {
      formIsVaild = "unvalid";

      statusFn("Password and Confirm Password must have to be same !", true);
    } else if (!validateNumber(data.contactNo)) {
      formIsVaild = "unvalid";

      statusFn("Please enter vaild contact no. !", true);
    }
  } else if (formType === "login") {
    if (!data.email.trim().includes("@")) {
      formIsVaild = "unvalid";

      statusFn("Please enter vaild email !", true);
    } else if (data.password.trim().length < 6) {
      formIsVaild = "unvalid";

      statusFn(
        "Please enter password of length more than 5 with no space !",
        true
      );
    }
  } else if (formType === "forget password") {
    if (!data.email.trim().includes("@")) {
      formIsVaild = "unvalid";

      statusFn("Please enter vaild email !", true);
    } else if (data.forgetQuestionAnswer.trim().length === 0) {
      formIsVaild = "unvalid";

      statusFn("Answer not have to we empty !", true);
    }
  } else if (formType === "new password") {
    if (
      data.password.trim().length < 6 ||
      data.confirmPassword.trim().length < 6
    ) {
      formIsVaild = "unvalid";

      statusFn(
        "Please enter password of length more than 5 with no space !",
        true
      );
    } else if (data.password.trim() !== data.confirmPassword.trim()) {
      formIsVaild = "unvalid";

      statusFn("Password and Confirm Password must have to be same !", true);
    }
  } else if (formType === "change password") {
    if (
      data.currentPassword.trim().length < 6 ||
      data.newPassword.trim().length < 6 ||
      data.confirmNewPassword.trim().length < 6
    ) {
      formIsVaild = "unvalid";
      statusFn(
        "Please enter password of length more than 5 with no space  !",
        true
      );
    } else if (data.newPassword.trim() !== data.confirmNewPassword.trim()) {
      formIsVaild = "unvalid";
      statusFn(
        "New Password and Confirm Password must have to be same !",
        true
      );
    }
  }

  if (formIsVaild === "unvalid") {
    setTimeout(resetStatusFn, 4000);
  }
  return formIsVaild;
};
