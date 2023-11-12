import React, { useContext, useState } from "react";
import {
  Container,
  Title,
  ContainerImage,
  ImageLogo,
  Text,
  Form,
  InputArea,
} from "./styles";
import InputComponent from "../../../components/form/inputs";
import ButtonComponent from "../../../components/form/buttons";
import LinkComponent from "./../../../components/form/link/index";
import { useNavigation } from "@react-navigation/native";
import logo from '../../../assets/logo.png'
import { Context } from "../../../context/UserContext";

const SignIn = () => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const { login } = useContext(Context);

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

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

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      login(user);
    } else {
      console.log("Formulário inválido, corrija os erros:", errors);
    }
  };

  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Container>
      <ContainerImage>
        <ImageLogo source={logo} />
      </ContainerImage>
      <Form>
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
        <ButtonComponent onPress={handleSubmit}>Entrar</ButtonComponent>
        <LinkComponent onPress={goToSignUp}>
          Ainda não tem uma conta? <Text style={{ color: "blue" }}>Criar</Text>
        </LinkComponent>
      </Form>
    </Container>
  );
};

export default SignIn;
