import "./App.css";
import { AppRoutes } from "./routes";
import { use, useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreAuth } from "@/common/stores/authSlice";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
