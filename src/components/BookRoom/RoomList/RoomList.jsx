import Image from "next/image";

import classes from "./RoomList.module.css";

const RoomList = (props) => {
  const { listOfRoom, onBookRoom } = props;

  if (listOfRoom.length === 0) {
    return (
      <p className={classes.p}>
        No room available for selected date or category !
      </p>
    );
  }

  const allRooms = listOfRoom.map((room) => {
    return (
      <li key={room.roomNo}>
        <div className={classes.card}>
          <div className={classes.flex}>
            <p className={classes.sticker}>{room.category}</p>
            <p>
              <span>Max guests :</span>
              <span>
                {room.maxAdult} adult, {room.maxChild} child
              </span>
            </p>
            <p>
              <span>Size :</span>
              <span>
                {room.size}ft<sup>2</sup>
              </span>
              <span>Price :</span>
              <span>&#x20B9; {room.price}</span>
            </p>
            <div>
              <h3>
                <span>Facility</span>
              </h3>
              <ul>
                {room.facilities.map((facility) => {
                  return <li key={facility}>{facility}</li>;
                })}
              </ul>
            </div>
            <div>
              <h3>
                <span>Included</span>
              </h3>
              <ul>
                {room.included.map((include) => {
                  return <li key={include}>{include}</li>;
                })}
              </ul>
            </div>
            <button
              onClick={onBookRoom.bind(null, room.roomNo)}
              className={classes.button}
            >
              Book now!
            </button>
          </div>
        </div>
      </li>
    );
  });

  return (
    <>
      <ul className={classes.cards}>{allRooms}</ul>;
    </>
  );
};

export default RoomList;
