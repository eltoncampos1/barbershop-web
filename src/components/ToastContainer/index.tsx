import React from "react";
import { ToastMessage } from "../../hooks/toast";

import { Container } from "./styles";
import Toast from "./Toast";

interface ToastContainerPorps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerPorps> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message) => (
        <Toast key={message.id} message={message}></Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
