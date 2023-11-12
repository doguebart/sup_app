import React, { useEffect, useState } from "react";
import { Container, Title, Text, Form, InputArea } from "./styles";
import BottomTab from "./../../components/bottomTab/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";

import InputComponent from "../../components/form/inputs";
import ButtonComponent from "../../components/form/buttons";

const Profile = () => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");

        if (userId && token) {
          api
            .get(`usuarios/${userId}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            })
            .then((response) => {
              setUser(response.data);
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        }
      } catch (error) {
        console.error("Error reading AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);

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
      register(user);
      console.log("Formulário válido, faça o login:", userData);
    } else {
      console.log("Formulário inválido, corrija os erros:", errors);
    }
  };

  return (
    <Container>
      <Form>
        <InputArea>
          <Text>Nome Completo</Text>
          <InputComponent
            type="text"
            name="nome"
            onChangeText={(value) => handleChange("nome", value)}
            placeholder="Digite o seu nome completo"
            errorMessage={errors.nome}
            value={user.nome}
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
            value={user.email}
          />
        </InputArea>
        <InputArea>
          <Text>Senha Anterior</Text>
          <InputComponent
            type="password"
            name="senha_anterior"
            secureTextEntry={true}
            onChangeText={(value) => handleChange("senha_anterior", value)}
            placeholder="Digite a sua senha"
            errorMessage={errors.senha_anterior}
          />
        </InputArea>
        <InputArea>
          <Text>Nova Senha</Text>
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
          <Text>Confirme a Nova Senha</Text>
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
      </Form>
      <BottomTab />
    </Container>
  );
};

export default Profile;
