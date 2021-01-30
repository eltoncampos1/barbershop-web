import React, { useCallback, useContext, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import * as Yup from "yup";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import logoImg from "../../assets/logo.svg";
import getValidationErrors from "../../utils/getValidationErrors";
import { AuthContext } from "../../context/AuthContext";

import { Container, Content, Background } from "./styles";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required(`E-mail obrigatório`)
            .email(`Digite um email válido`),
          password: Yup.string().required(`Senha obrigatória`),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [signIn]
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Gobarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            placeholder="Senha"
            type="password"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
