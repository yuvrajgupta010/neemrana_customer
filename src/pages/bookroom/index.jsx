import BookRoom from "@/components/BookRoom/BookRoom";
import Head from "next/head";

const BookRoomPage = (props) => {
  return (
    <>
      <Head>
        <title>Neemrana | Book Room</title>
      </Head>
      <BookRoom />
    </>
  );
};

export default BookRoomPage;
