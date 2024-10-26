import { Outlet } from "react-router-dom";
import { HomeNavbar , Footer} from "../../components";

export default function MainLayout() {
  return (
    <>
      <div
      style={{ background: "var(--primary)", overflow: "hidden" ,minHeight:"380px"}}
      >
        <HomeNavbar />

        <Outlet />
      </div>
      <Footer />
    </>
  );
}
