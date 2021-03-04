import React, { ChangeEvent, useCallback, useRef } from "react";
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from "react-icons/fi";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AvatarInput } from "./styles";

import { FormHandles } from "@unform/core";
import getValidationErrors from "../../utils/getValidationErrors";
import { useToast } from "../../hooks/toast";
import { useAuth } from "../../hooks/auth";

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();
  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(`Name Required`),
          email: Yup.string()
            .required(`E-mail Required`)
            .email(`Enter a valid email address`),
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: (val: string | any[]) => !!val.length,
            then: Yup.string().required("Required field"),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when("old_password", {
              is: (val: string | any[]) => !!val.length,
              then: Yup.string().required("Required field"),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref("password")], "Incorrect confirmation"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put("/profile", formData);

        updateUser(response.data);

        history.push("/dashboard");

        addToast({
          type: "success",
          title: "Updated profile!",
          description:
            "Your profile information has been updated successfully!",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Update error",
          description:
            "An error occurred while updating profile, please try again",
        });
      }
    },
    [addToast, history]
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        console.log(e.target.files);
        const data = new FormData();

        data.append("avatar", e.target.files[0]);

        api.patch("/users/avatar", data).then((response) => {
          updateUser(response.data);
          addToast({
            type: "success",
            title: "updated successfully",
          });
        });
      }
    },
    [addToast, updateUser]
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>My Profile</h1>

          <Input icon={FiUser} name="name" placeholder="Name" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            containerStyle={{ marginTop: 24 }}
            icon={FiLock}
            name="old_password"
            placeholder="Current password"
            type="password"
          />
          <Input
            icon={FiLock}
            name="password"
            placeholder="New password"
            type="Password"
          />
          <Input
            icon={FiLock}
            name="password_confirmation"
            placeholder="Confirm password"
            type="Password"
          />

          <Button type="submit">Confirm changes</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
