import { Outlet } from "react-router-dom";
import Sidebar from "./shared/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <div className="">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
