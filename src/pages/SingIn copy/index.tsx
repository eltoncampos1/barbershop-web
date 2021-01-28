import React from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
    <Container>
        <Content>
            <img src={logoImg} alt="Gobarber"/>

            <form action="">
                <h1>Faça seu logon</h1>

                <Input icon={FiMail} name="email" placeholder="E-mail" />
                <Input icon={FiLock} name="senha" placeholder="Senha" type="password" />

                <Button type="button">Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>
            </form>

            <a href="login">
                    <FiLogIn />
                    Criar conta
            </a>
        </Content>
        <Background />
    </Container>
)

export default SignIn;