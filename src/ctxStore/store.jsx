import AuthCtxProvider from "./authCtxProvider";
import FlashMessageCtxProvider from "./flashMessageCtxProvider";

const AllCtx = (props) => {
  return (
    <AuthCtxProvider>
      <FlashMessageCtxProvider>{props.children}</FlashMessageCtxProvider>
    </AuthCtxProvider>
  );
};

export default AllCtx;
