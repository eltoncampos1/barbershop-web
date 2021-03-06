import React from "react";
import { ToastMessage } from "../../hooks/toast";
import { useTransition } from "react-spring";

import { Container } from "./styles";
import Toast from "./Toast";

interface ToastContainerPorps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerPorps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: "-120%", opacity: 0 },
      enter: { right: "0%", opacity: 1 },
      leave: { right: "-120%", opacity: 0 },
    }
  );
  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item}></Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
