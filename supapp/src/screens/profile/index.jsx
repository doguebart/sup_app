import React, { useEffect, useContext, useState } from "react";
import {
  Container,
  Text,
  ScrollViewContainer,
  Title,
  TitleContainer,
  Form,
  InputArea,
} from "./styles";
import { Alert } from "react-native";
import { Context } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import Icon from "react-native-vector-icons/Feather";

import InputComponent from "../../components/form/inputs";
import ButtonComponent from "../../components/form/buttons";

const Profile = () => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});

  const { del } = useContext(Context);

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
      newErrors.senha =
        "Você precisa digitar sua senha antes de atualizar o usuário";
      formIsValid = false;
    } else if (user.senha !== user.cf_senha) {
      newErrors.cf_senha = "As senhas não coincidem";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const updateUser = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

      if (userId && token) {
        const updatedUserData = {
          nome: user.nome,
          email: user.email,
          senha: user.senha,
        };

        await api.put(`usuarios/${userId}`, updatedUserData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        setUser(updatedUserData);

        console.log("Usuário atualizado:", updatedUserData);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUserWithConfirmation = async () => {
    const userId = await AsyncStorage.getItem("userId");

    Alert.alert("Confirmação", "Tem certeza que deseja excluir a sua conta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => del(userId),
        style: "destructive",
      },
    ]);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      updateUser();
    } else {
      console.log("Formulário inválido, corrija os erros:", errors);
    }
  };

  return (
    <Container>
      <Form>
        <TitleContainer>
          <Title style={{ marginBottom: 40, fontSize: 30, color: "darkblue" }}>
            Meu Perfil
          </Title>
          <Icon
            name="trash"
            onPress={() => deleteUserWithConfirmation(user.id)}
            size={24}
            style={{ marginBottom: 40 }}
            color="red"
          />
        </TitleContainer>
        <ScrollViewContainer>
          <InputArea>
            <Text>Nome Completo</Text>
            <InputComponent
              type="text"
              name="nome"
              onChangeText={(value) => handleChange("nome", value)}
              placeholder={user.nome}
              errorMessage={errors.nome}
            />
          </InputArea>
          <InputArea>
            <Text>E-mail</Text>
            <InputComponent
              type="email"
              name="email"
              onChangeText={(value) => handleChange("email", value)}
              placeholder={user.email}
              errorMessage={errors.email}
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
            <Text>Confirme a Senha</Text>
            <InputComponent
              type="password"
              name="cf_senha"
              secureTextEntry={true}
              onChangeText={(value) => handleChange("cf_senha", value)}
              placeholder="Confirme a sua senha"
              errorMessage={errors.cf_senha}
            />
          </InputArea>
        </ScrollViewContainer>

        <ButtonComponent onPress={handleSubmit}>
          Editar Informações
        </ButtonComponent>
      </Form>
    </Container>
  );
};

export default Profile;
