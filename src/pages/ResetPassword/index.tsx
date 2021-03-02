import React, { useCallback, useRef } from "react";
import { FiLock } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import logoImg from "../../assets/logo.svg";
import getValidationErrors from "../../utils/getValidationErrors";

import { Container, Content, Background, AnimationContainer } from "./styles";
import { useToast } from "../../hooks/toast";

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required(`Senha obrigatória`),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        history.push("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro ao resetar sua senha",
          description: "Ocorreu um erro ao resetar sua senha, tente novamente",
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              icon={FiLock}
              name="password"
              placeholder="Nova senha"
              type="password"
            />

            <Input
              icon={FiLock}
              name="password_confirmation"
              placeholder="Confirme sua senha"
              type="password"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;