/* REACT */
import { FC, useEffect } from "react";

/* COMPONENTS */
import PrivatePage from "../components/privatePage";
import Loading from "../components/loading";

/* CONTAINERS */
import { Outlet } from "react-router";
import Header from "../containers/header";
import Footer from "../containers/footer";

/* HOOKS */
import useStatus from "../hooks/useStatus";

const ViewerPage: FC = () => {
  const { loading, updateStatus } = useStatus();

  useEffect(() => {
    updateStatus("started");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PrivatePage className="w-screen h-screen bg-light-grey">
        <Header />
        <Outlet />
        <Footer />
        {loading ? <Loading text={loading} /> : null}
    </PrivatePage>
  );
};

export default ViewerPage;
