import React from 'react'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';

const SignUp: React.FC = () => {
    function handleSubmit(data:object):void {
        console.log(data);    
    }

    return (
        <Container>
            <Background />

            <Content>
                <img src={logoImg} alt="Gobarber"/>

                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input icon={FiUser} name="name" placeholder="Nome" />
                    <Input icon={FiMail} name="email" placeholder="E-mail" />
                    <Input icon={FiLock} name="senha" placeholder="Senha" type="password" />

                    <Button type="submit">Cadastrar</Button>

                </Form>

                <a href="login">
                    <FiArrowLeft />
                    voltar para logon
                </a>
            </Content>
        </Container>
    )
}

export default SignUp;