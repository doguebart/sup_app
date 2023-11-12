import React, { useContext, useState } from "react";
import { Container, Title, Text, Form, InputArea } from "./styles";
import { useNavigation } from "@react-navigation/native";
import InputComponent from "../../components/form/inputs";
import ButtonComponent from "../../components/form/buttons";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateCompany = () => {
  const [company, setCompany] = useState({});
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setCompany({ ...company, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!company.nome) {
      newErrors.nome = "O nome da empresa é obrigatório";
      formIsValid = false;
    }

    if (!company.email) {
      newErrors.email = "Seu e-mail corporativo é obrigatório";
      formIsValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(company.email)) {
        newErrors.email = "E-mail inválido";
        formIsValid = false;
      }
    }

    if (!company.cargo) {
      newErrors.cargo = "O cargo é obrigatório";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");

        if (userId && token) {
          api
            .post(
              `usuarios/addCompany/${userId}`,
              {
                usuario: parseInt(userId),
                nome: company.nome,
                email: company.email,
                cargo: company.cargo,
              },
              {
                headers: {
                  Authorization: `Bearer ${JSON.parse(token)}`,
                },
              }
            )
            .then((response) => {
              setCompany(response.data);
              navigation.navigate("Home", { newCompany: response.data });
            })
            .catch((error) => {
              console.error("Error posting company data:", error);
            });
        }
      } catch (error) {
        console.error("Error reading AsyncStorage:", error);
      }
    } else {
      console.log("Formulário inválido, corrija os erros:", errors);
    }
  };

  return (
    <Container>
      <Form>
        <Title style={{ marginBottom: 40, fontSize: 30, color: "darkblue" }}>
          Nova Empresa
        </Title>
        <InputArea>
          <Text>Nome da Empresa</Text>
          <InputComponent
            type="text"
            name="nome"
            onChangeText={(value) => handleChange("nome", value)}
            placeholder="Digite o nome da empresa"
            errorMessage={errors.nome}
          />
        </InputArea>
        <InputArea>
          <Text>E-mail Corporativo</Text>
          <InputComponent
            type="email"
            name="email"
            onChangeText={(value) => handleChange("email", value)}
            placeholder="Digite o seu e-mail corporativo"
            errorMessage={errors.email}
          />
        </InputArea>
        <InputArea>
          <Text>Cargo</Text>
          <InputComponent
            type="text"
            name="cargo"
            onChangeText={(value) => handleChange("cargo", value)}
            placeholder="Digite o seu cargo"
            errorMessage={errors.cargo}
          />
        </InputArea>
        <ButtonComponent onPress={handleSubmit}>
          Adicionar Empresa
        </ButtonComponent>
      </Form>
    </Container>
  );
};

export default CreateCompany;
