import { useRef } from "react";

import classes from "./BookingForm.module.css";

import date from "date-and-time";

const now = new Date();
const todayDate = date.format(now, "YYYY-MM-DD");

const BookingForm = (props) => {
  const { onSubmitForm, onResetForm } = props;

  const checkinRef = useRef();
  const checkoutRef = useRef();
  const adultsRef = useRef();
  const childsRef = useRef();
  const roomTypeRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const userInputs = {
      checkIn: checkinRef.current.value,
      checkOut: checkoutRef.current.value,
      noOfAdult: adultsRef.current.value,
      noOfChild: childsRef.current.value,
      roomType: roomTypeRef.current.value,
    };

    onSubmitForm(userInputs);
  };

  const formResetHandler = (event) => {
    event.preventDefault();
    checkinRef.current.value = "";
    checkoutRef.current.value = "";
    adultsRef.current.value = "";
    childsRef.current.value = "";
    roomTypeRef.current.value = "All";

    onResetForm();
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      onReset={formResetHandler}
      className={classes.form}
    >
      <div className={`${classes.input_field} ${classes.grid_item_1}`}>
        <label htmlFor="checkin">Check-in Date</label>
        <input
          type="date"
          name="CheckIn Date"
          ref={checkinRef}
          id="checkin"
          min={todayDate}
          required
        />
      </div>
      <div className={`${classes.input_field} ${classes.grid_item_2}`}>
        <label htmlFor="checkout">Check-out Date</label>
        <input
          type="date"
          name="CheckOut Date"
          ref={checkoutRef}
          id="checkout"
          min={todayDate}
          required
        />
      </div>
      <div className={`${classes.input_field} ${classes.grid_item_3}`}>
        <label htmlFor="adults">No. of Adults</label>
        <input
          type="number"
          name="No of adults"
          ref={adultsRef}
          id="adults"
          min={1}
          max={5}
          placeholder="1"
          required
        />
      </div>
      <div className={`${classes.input_field} ${classes.grid_item_4}`}>
        <label htmlFor="childs">No of Childs</label>
        <input
          type="number"
          name="No of childs"
          ref={childsRef}
          id="childs"
          min={0}
          max={5}
          placeholder="0"
          required
        />
      </div>
      <div className={`${classes.input_field} ${classes.grid_item_5}`}>
        <label htmlFor="roomType">Room Type</label>
        <select
          name="room type"
          ref={roomTypeRef}
          id="roomType"
          defaultValue={"All"}
        >
          <option value="All">All</option>
          <option value="Super">Super</option>
          <option value="Bussiness">Bussiness</option>
          <option value="Execuitive">Execuitive</option>
        </select>
      </div>
      <div className={`${classes.grid_item_6} ${classes.buttons}`}>
        <button type="submit">Search</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
};

export default BookingForm;
