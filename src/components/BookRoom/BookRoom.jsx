import { useContext, useState } from "react";
import { useRouter } from "next/router";

import classes from "./BookRoom.module.css";

import BookingForm from "./BookingForm/BookingForm";
import RoomList from "./RoomList/RoomList";

import Status from "../UI/Status/Status";
import Loading from "../UI/Loading/Loading";

import { dommyfetch } from "@/util/fetchfunctions";
import { compareDates } from "@/util/dateComparion";

import FlashMessageCtx from "@/ctxStore/flashMessageCtx";
import AuthCtx from "@/ctxStore/authCtx";

const filterRooms = (rooms, category) => {
  if (category === "All") {
    return rooms;
  }
  return rooms.filter((room) => {
    return room.category === category;
  });
};

const BookRoom = (props) => {
  const { isAuthenticated, userData, token } = useContext(AuthCtx);
  const { setFlashMessage } = useContext(FlashMessageCtx);
  const router = useRouter();
  const [haveError, setHaveError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [filterIsOn, setFilterIsOn] = useState(false);
  const [roomsData, setRoomsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userSearchInput, setUserSearchInput] = useState(null);

  const errorFunction = (message, isError = true) => {
    setHaveError(isError);
    setErrMessage(message);
  };

  const resetErrorFunction = () => {
    setHaveError(false);
    setErrMessage("");
  };

  const getUserInput = (inputs) => {
    setRoomsData([]);
    setFilterIsOn(false);
    const { checkIn, checkOut, noOfChild, noOfAdult, roomType } = inputs;
    const dateComparionResult = compareDates(checkIn, checkOut);
    if (dateComparionResult !== "lesser") {
      errorFunction(
        "Check-out date always have to be greater than Check-in date"
      );
      setTimeout(resetErrorFunction, 2000);

      return;
    } else if (noOfAdult > 5 || noOfAdult <= 0) {
      errorFunction("Please enter 1 to 5 number of adults!");
      setTimeout(resetErrorFunction, 2000);

      return;
    } else if (noOfChild < 0 || noOfChild > 2) {
      errorFunction(
        "Please enter 0 to 2 no. of childs. Childs greater than 2 count as adults !"
      );
      setTimeout(resetErrorFunction, 2000);

      return;
    }
    setIsLoading(true);
    setUserSearchInput(inputs);

    fetch("https://neemrana-hotel-api.onrender.com/customer/available-room", {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        const { availableRooms } = resData;
        errorFunction("", false);
        setFilterIsOn(true);
        const filteredRoom = filterRooms(availableRooms, roomType);
        setRoomsData(filteredRoom);
      })
      .catch((err) => {
        console.error(err.message);
        errorFunction(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onBookRoom = (roomNo) => {
    const { checkIn, checkOut, noOfAdult, noOfChild } = userSearchInput;

    if (isAuthenticated) {
      const selectedRoom = roomsData.filter((room) => {
        return room.roomNo === roomNo;
      });
      const room = selectedRoom[0];
      const formatedData = {
        checkIn: checkIn,
        checkOut: checkOut,
        noOfAdult,
        noOfChild,
        price: room.price,
        roomNo: roomNo,
        name: userData.customerName,
      };
      fetch("https://neemrana-hotel-api.onrender.com/customer/book-room", {
        method: "POST",
        body: JSON.stringify(formatedData),
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
          router.push("/dashboard");
        })
        .catch((err) => {
          console.error(err.message);
        });
    } else {
      setFlashMessage("For booking user have to be login !");
      router.push("/login");
    }
  };

  const resetFormState = () => {
    setHaveError(false);
    setErrMessage("");
    setFilterIsOn(false);
    setRoomsData([]);
  };

  return (
    <>
      <section className={classes.section}>
        <BookingForm onSubmitForm={getUserInput} onResetForm={resetFormState} />
        {isLoading && <Loading />}
        {haveError && (
          <Status error={true} message={errMessage} title={"Invalid Inputs"} />
        )}
        {!haveError && filterIsOn && (
          <RoomList listOfRoom={roomsData} onBookRoom={onBookRoom} />
        )}
      </section>
    </>
  );
};

export default BookRoom;
