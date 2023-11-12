import React, { useEffect, useContext, useState } from "react";
import { Alert } from "react-native";
import {
  Container,
  CompanyContainer,
  CompanyNameContainer,
  UtilsContainer,
  CompanyRegisterContainer,
  CompanyRegisterButton,
  ButtonChat,
  ScrollViewContainer,
  Text,
} from "./styles";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CompanyList = () => {
  const [companys, setCompanys] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const CreateCompany = () => {
    navigation.navigate("CreateCompany");
  };

  const Chat = (companyId) => {
    navigation.navigate("Chat", { companyId });
  };

  const EditCompany = (companyId) => {
    navigation.navigate("EditCompany", { companyId });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");

        if (userId && token) {
          // Check for new company data when the screen is focused
          if (navigation.isFocused() && route.params?.newCompany) {
            setCompanys((prevCompanies) => [
              ...prevCompanies,
              route.params.newCompany,
            ]);
            navigation.setParams({ newCompany: null }); // Reset the parameter
          }

          // Fetch data from the API
          api
            .get(`empresas`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            })
            .then((response) => {
              setCompanys(response.data);
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
  }, [navigation, route.params?.newCompany]);

  const deleteCompany = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await api.delete(`empresas/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        setCompanys((prevCompanies) =>
          prevCompanies.filter((company) => company.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const deleteCompanyWithConfirmation = (id) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir esta empresa?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => deleteCompany(id),
        style: "destructive",
      },
    ]);
  };

  return (
    <Container>
      <CompanyRegisterContainer>
        <Text
          style={{
            marginTop: 20,
            marginLeft: 20,
            marginBottom: 20,
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Empresas Disponíveis
        </Text>
        <CompanyRegisterButton onPress={CreateCompany}>
          <Icon
            name="plus-circle"
            style={{
              marginLeft: 20,
            }}
            size={20}
            color="white"
          />
          <Text style={{ color: "#fff" }}>Adicionar Empresa</Text>
        </CompanyRegisterButton>
      </CompanyRegisterContainer>

      <ScrollViewContainer>
        {companys.map((company, index) => (
          <CompanyContainer key={index}>
            <CompanyNameContainer>
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                {company.nome}
              </Text>
              <UtilsContainer>
                <Icon
                  name="edit"
                  onPress={() => EditCompany(company.id)}
                  size={20}
                  color="darkblue"
                />
                <Icon
                  name="trash"
                  onPress={() => deleteCompanyWithConfirmation(company.id)}
                  size={20}
                  color="red"
                />
              </UtilsContainer>
            </CompanyNameContainer>

            <Text style={{ marginTop: 0, color: "gray" }}>{company.cargo}</Text>
            <Text style={{ marginTop: 0, color: "gray" }}>{company.email}</Text>
            <ButtonChat onPress={() => Chat(company.id)}>
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 14 }}
              >
                Chat
              </Text>
            </ButtonChat>
          </CompanyContainer>
        ))}
      </ScrollViewContainer>
    </Container>
  );
};

export default CompanyList;
