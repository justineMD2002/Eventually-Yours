import React, { useContext, useEffect, useState } from "react";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderNotification from "../Main/Notification/HeaderNotification";
import { ModalContext } from "../../Context/ModalContext";
import { UserContext } from "../../Context/LoginContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [modalState, setModalState] = useContext(ModalContext);
  const [isNotifClicked, setIsNotifClicked] = useState(false);
  const [isUserDropdown, setIsUserDropdown] = useState(false);

  const [userData, setUserData] = useContext(UserContext);
  const { userID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://events-api-iuta.onrender.com/user/view-all"
        );
        response.data.forEach((user) => {
          if (user.uid === Number(userID)) {
            setUserData(user);
          }
        });
      } catch (error) {
        // setError(error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className="Header">
      <h2>MetroEvents</h2>
      <ul>
        <li>Welcome, {userData && userData.email}!</li>
        <li className="notif">
          <FontAwesomeIcon
            icon={faBell}
            className="icon"
            onClick={() => setIsNotifClicked(!isNotifClicked)}
          />
          {isNotifClicked && <HeaderNotification />} {/*the notification*/}
        </li>
        <li className="user-icon">
          <FontAwesomeIcon
            icon={faUserCircle}
            onClick={() => setIsUserDropdown(!isUserDropdown)}
          />

          {isUserDropdown && (
            <ul className="user-dropdown">
              <li>Profile</li>
              {userData.user_type !== "organizer" && (
                <>
                  <li>Joined events</li>
                  <li
                    onClick={() => {
                      setModalState({
                        ...modalState,
                        content: "organizerRequestModal",
                        open: true,
                      });
                    }}
                  >
                    Become and organizer
                  </li>
                </>
              )}

              {userData.user_type === "organizer" && (
                <Link to={"/organizer-dashboard"}>
                  <li>Dashboard</li>
                </Link>
              )}

              <li>Logout</li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
