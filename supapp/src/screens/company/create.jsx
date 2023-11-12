import React, { useContext, useState } from "react";
import { Container, Title, Text, Form, InputArea } from "./styles";
import { useNavigation } from "@react-navigation/native";
import InputComponent from "../../components/form/inputs";
import ButtonComponent from "../../components/form/buttons";

const CreateCompany = () => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!user.nome) {
      newErrors.nome = "O nome da empresa é obrigatório";
      formIsValid = false;
    }

    if (!user.email) {
      newErrors.email = "Seu e-mail corporativo é obrigatório";
      formIsValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        newErrors.email = "E-mail inválido";
        formIsValid = false;
      }
    }

    if (!user.cargo) {
      newErrors.cargo = "O cargo é obrigatório";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // logica de criação da empresa
      console.log("Formulário válido, faça o login:", user);
    } else {
      console.log("Formulário inválido, corrija os erros:", errors);
    }
  };

  return (
    <Container>
      <Form>
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
            secureTextEntry={true}
            onChangeText={(value) => handleChange("cargo", value)}
            placeholder="Digite o seu cargo"
            errorMessage={errors.cargo}
          />
        </InputArea>
        <ButtonComponent onPress={handleSubmit}>Registrar Empresa</ButtonComponent>
      </Form>
    </Container>
  );
};

export default CreateCompany;
