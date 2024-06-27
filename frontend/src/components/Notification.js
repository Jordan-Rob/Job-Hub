import React, { useEffect } from "react";
import styled from "styled-components";

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: lightgreen;
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const Notification = ({ message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 6000); // hide after 6 seconds
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <NotificationContainer visible={visible}>{message}</NotificationContainer>
  );
};

export default Notification;
