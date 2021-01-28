import React, { useCallback } from 'react'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';

const SignUp: React.FC = () => {
    const handleSubmit = useCallback(async(data:object) => {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(`Nome obrigatório`),
                email: Yup.string().required(`E-mail obrigatório`).email(`Digite um email válido`),
                password: Yup.string().min(6, `No minimo 6 dígitos`),
            })

            await schema.validate(data, {
                abortEarly: false,
            });

        } catch (err) {
            console.log(err);          
        }    
    },[])

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