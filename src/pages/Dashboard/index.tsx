import React from "react";
import { Container, Header, HeaderContent, Profile } from "./styles";

import logoImg from "../../assets/logo.svg";
import { FiPower } from "react-icons/fi";

const Dashboard: React.FC = () => (
  <Container>
    <Header>
      <HeaderContent>
        <img src={logoImg} alt="GOBarber" />

        <Profile>
          <img
            src="https://avatars.githubusercontent.com/u/56568406?s=460&u=6341df1b4aadb55298fca931b7c88d957896f2c8&v=4"
            alt="Elton Campos"
          />
          <div>
            <span>Bem-vindo,</span>
            <strong>Elton Campos</strong>
          </div>
        </Profile>

        <button type="button">
          <FiPower />
        </button>
      </HeaderContent>
    </Header>
  </Container>
);
export default Dashboard;
