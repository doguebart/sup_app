import React, { useContext, useState } from "react";
import { Container, Title, Text, Form, InputArea } from "./styles";
import InputComponent from "../../../components/form/inputs";
import ButtonComponent from "../../../components/form/buttons";
import LinkComponent from "./../../../components/form/link/index";
import { useNavigation } from "@react-navigation/native";

import { Context } from "../../../context/UserContext";

const SignUp = () => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const { register } = useContext(Context);

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!user.nome) {
      newErrors.nome = "Nome Completo é obrigatório";
      formIsValid = false;
    }

    if (!user.email) {
      newErrors.email = "E-mail é obrigatório";
      formIsValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        newErrors.email = "E-mail inválido";
        formIsValid = false;
      }
    }

    if (!user.senha) {
      newErrors.senha = "Senha é obrigatória";
      formIsValid = false;
    }

    if (!user.cf_senha) {
      newErrors.cf_senha = "Confirme sua senha";
      formIsValid = false;
    } else if (user.senha !== user.cf_senha) {
      newErrors.cf_senha = "As senhas não coincidem";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = () => {
    const { cf_senha, ...userData } = user;
    setUser(userData);

    if (validateForm()) {
      // Chame sua lógica de login aqui, pois o formulário é válido
      console.log("Formulário válido, faça o login:", userData);
    } else {
      console.log("Formulário inválido, corrija os erros:", errors);
    }
  };

  const goToSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <Container>
      <Title>Criar Conta</Title>
      <Form>
        <InputArea>
          <Text>Nome Completo</Text>
          <InputComponent
            type="text"
            name="nome"
            onChangeText={(value) => handleChange("nome", value)}
            placeholder="Digite o seu nome completo"
            errorMessage={errors.nome}
          />
        </InputArea>
        <InputArea>
          <Text>E-mail</Text>
          <InputComponent
            type="email"
            name="email"
            onChangeText={(value) => handleChange("email", value)}
            placeholder="Digite o seu e-mail"
            errorMessage={errors.email}
          />
        </InputArea>
        <InputArea>
          <Text>Senha</Text>
          <InputComponent
            type="password"
            name="senha"
            secureTextEntry={true}
            onChangeText={(value) => handleChange("senha", value)}
            placeholder="Digite a sua senha"
            errorMessage={errors.senha}
          />
        </InputArea>
        <InputArea>
          <Text>Confirme a senha</Text>
          <InputComponent
            type="password"
            name="cf_senha"
            secureTextEntry={true}
            onChangeText={(value) => handleChange("cf_senha", value)}
            placeholder="Confirme a sua senha"
            errorMessage={errors.cf_senha}
          />
        </InputArea>
        <ButtonComponent onPress={handleSubmit}>Registrar</ButtonComponent>
        <LinkComponent onPress={goToSignIn}>
          Já tem uma conta? <Text style={{ color: "blue" }}>Entrar</Text>
        </LinkComponent>
      </Form>
    </Container>
  );
};

export default SignUp;
