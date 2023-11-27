import { useContext } from "react";
import Notification from "../UI/notification";
import MainHeader from "./main-header";
import NotificationContext from "../../store/notification-context";
const Layout = (props) => {
  const ctx = useContext(NotificationContext);

  const notification = ctx.notification;
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
};

export default Layout;
