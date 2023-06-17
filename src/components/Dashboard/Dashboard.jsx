import { useContext, useEffect, useState } from "react";
import classes from "./Dashboard.module.css";
import { dommyfetch } from "@/util/fetchfunctions";
import FlexibleForm from "../UI/FlexibleForm/FlexibleForm";
import Status from "../UI/Status/Status";
import { formInputValidation } from "@/util/userInputValidation";
import AuthCtx from "@/ctxStore/authCtx";
import { useRouter } from "next/router";
import FlashMessageCtx from "@/ctxStore/flashMessageCtx";

const bookedRoom = [
  {
    bookingId: 33,
    dateOfBooking: "10/02/2023",
    noOfAdult: 2,
    noOfChild: 1,
    checkIn: "12/02/2023",
    checkOut: "12/02/2023",
    roomType: "Bussieness",
  },
  {
    bookingId: 32,
    dateOfBooking: "10/02/2023",
    noOfAdult: 2,
    noOfChild: 1,
    checkIn: "12/02/2023",
    checkOut: "12/02/2023",
    roomType: "Bussieness",
  },
  {
    bookingId: 54,
    dateOfBooking: "10/02/2023",
    noOfAdult: 2,
    noOfChild: 1,
    checkIn: "12/02/2023",
    checkOut: "12/02/2023",
    roomType: "Bussieness",
  },
];

const Dashboard = (props) => {
  const router = useRouter();
  const {
    haveMessage,
    message,
    setFlashMessage,
    haveError: statusError,
  } = useContext(FlashMessageCtx);
  const { isAuthenticated, token } = useContext(AuthCtx);

  const [dashboardOption, setDashboardOption] = useState("presentBooking");
  const [presentBookingData, setPresentBookingData] = useState([]);
  const [pastBookingData, setPastBookingData] = useState([]);
  const [haveError, setHaveError] = useState(false);
  const [haveStatus, setHaveStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const formType = "change password";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      return;
    }
    fetch("https://neemrana-hotel-api.onrender.com/customer/present-bookings", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { presentBookings = [] } = data;
        setPresentBookingData(presentBookings);
        return fetch(
          "https://neemrana-hotel-api.onrender.com/customer/past-bookings",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { pastBookings } = data;

        setPastBookingData(pastBookings);
      });
  }, [isAuthenticated, router, token, dashboardOption]);

  if (isAuthenticated === false) {
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
      const formatedData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      fetch("https://neemrana-hotel-api.onrender.com/customer/reset-password", {
        method: "POST",
        body: JSON.stringify(formatedData),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("please enter right current password !");
          }
          return res.json();
        })
        .then((data) => {
          setFlashMessage(data.message);
        })
        .catch((err) => {
          setFlashMessage(err.message, true);
          console.error(err.message);
        });
    }
  };

  const cancelBookingHandler = (bookId) => {
    const isConfirm = confirm("Are you sure to cancel booking ?");
    if (isConfirm) {
      const filteredBooking = presentBookingData.filter((booking) => {
        return booking.bookingId !== bookId;
      });
      setPresentBookingData(filteredBooking);
      fetch("https://neemrana-hotel-api.onrender.com/customer/cancel-booking", {
        method: "POST",
        body: JSON.stringify({ bookingId: bookId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setFlashMessage(data.message);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  const jsxForPresentBooking =
    dashboardOption === "presentBooking" ? (
      <ul className={classes.cards}>
        {presentBookingData.length === 0 ? (
          <h2>No recent booking available</h2>
        ) : (
          presentBookingData.map((bookData) => {
            return (
              <li key={bookData.bookingId} className={classes.card}>
                <div className={classes.grid}>
                  <p className={classes.p}>
                    <span>Booking Id:</span>
                    <span>{bookData.bookingId}</span>
                  </p>
                  <p className={classes.p}>
                    <span>Date of Booking:</span>
                    <span>{bookData.dateOfBooking}</span>
                  </p>
                  <p className={classes.p}>
                    <span>No of adult:</span>
                    <span>{bookData.noOfAdult}</span>
                  </p>
                  <p className={classes.p}>
                    <span>No of child:</span>
                    <span>{bookData.noOfChild}</span>
                  </p>
                  <p className={classes.p}>
                    <span>Check-in Date:</span>
                    <span>{bookData.checkIn}</span>
                  </p>
                  <p className={classes.p}>
                    <span>Check-out Date:</span>
                    <span>{bookData.checkOut}</span>
                  </p>
                  <p className={classes.p}>
                    <span>Price:</span>
                    <span>&#x20B9; {bookData.price}</span>
                  </p>
                  <div className={classes.buttons}>
                    <button
                      onClick={cancelBookingHandler.bind(
                        null,
                        bookData.bookingId
                      )}
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    ) : (
      ""
    );

  const jsxForPastBooking =
    dashboardOption === "pastBooking" ? (
      <ul className={classes.cards}>
        {pastBookingData.length === 0 ? (
          <h2>No past booking available</h2>
        ) : (
          pastBookingData.map((bookData) => {
            return (
              <li key={bookData.bookingId} className={classes.card}>
                <div className={classes.grid}>
                  <p className={classes.p}>
                    <span>Booking Id:</span>
                    <span>{bookData.bookingId}</span>
                  </p>
                  <p className={classes.p}>
                    <span>Date of Booking:</span>
                    <span>{bookData.dateOfBooking}</span>
                  </p>
                  <p className={classes.p}>
                    <span>No of adult:</span>
                    <span>{bookData.noOfAdult}</span>
                  </p>
                  <p className={classes.p}>
                    <span>No of child:</span>
                    <span>{bookData.noOfChild}</span>
                  </p>
                  <p className={classes.p}>
                    <span>Check-in Date:</span>
                    <span>{bookData.checkIn}</span>
                  </p>
                  <p className={classes.p}>
                    <span>Check-out Date:</span>
                    <span>{bookData.checkOut}</span>
                  </p>
                  <p className={classes.p}>
                    <span>Price:</span>
                    <span> &#x20B9; {bookData.price}</span>
                  </p>
                </div>
              </li>
            );
          })
        )}
      </ul>
    ) : (
      ""
    );

  const jsxForChangePassword =
    dashboardOption === "resetPassword" ? (
      <FlexibleForm
        formType={formType}
        formTypeChangeHandler={() => {}}
        onSubmitForm={userInputsFromForm}
      />
    ) : (
      ""
    );

  return (
    <section className={classes.section}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li
            onClick={() => setDashboardOption("presentBooking")}
            className={`${
              dashboardOption === "presentBooking" ? classes.active : "df"
            }`}
          >
            Present Booking&apos;s
          </li>
          <li
            onClick={() => setDashboardOption("pastBooking")}
            className={`${
              dashboardOption === "pastBooking" ? classes.active : ""
            }`}
          >
            Past Booking&apos;s
          </li>
          <li
            onClick={() => setDashboardOption("resetPassword")}
            className={`${
              dashboardOption === "resetPassword" ? classes.active : ""
            }`}
          >
            Reset Password
          </li>
        </ul>
      </nav>
      <div className={classes.cards_block}>
        {haveMessage ? <Status message={message} error={statusError} /> : ""}
        {haveStatus ? <Status error={haveError} message={statusMessage} /> : ""}
        {jsxForPresentBooking}
        {jsxForPastBooking}
        {jsxForChangePassword}
      </div>
    </section>
  );
};

export default Dashboard;
