import React, { useEffect, useContext, useState } from "react";
import {
  Container,
  CompanyContainer,
  CompanyNameContainer,
  UtilsContainer,
  CompanyRegisterContainer,
  CompanyRegisterButton,
  ButtonChat,
  Text,
} from "./styles";
import Icon from "react-native-vector-icons/Feather";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComponent from "./../form/buttons/index";

const CompanyList = () => {
  const [companys, setCompanys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");
        if (userId && token) {
          api
            .get(`empresas`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            })
            .then((response) => {
              setCompanys(response.data);
              console.log(companys);
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
        <CompanyRegisterButton>
          <Icon
            name="plus-circle"
            style={{
              marginLeft: 20,
            }}
            size={20}
            color="white"
          />
          <Text style={{ color: "#fff" }}>Registrar Empresa</Text>
        </CompanyRegisterButton>
      </CompanyRegisterContainer>

      {companys.map((company, index) => (
        <CompanyContainer key={index}>
          <CompanyNameContainer>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {company.nome}
            </Text>
            <UtilsContainer>
              <Icon name="edit" size={20} color="darkblue" />
              <Icon name="trash" size={20} color="red" />
            </UtilsContainer>
          </CompanyNameContainer>

          <Text style={{ marginTop: 0, color: "gray" }}>{company.cargo}</Text>
          <Text style={{ marginTop: 0, color: "gray" }}>{company.email}</Text>
          <ButtonChat>
            <Text style={{ color: "white", textAlign: "center", fontSize: 14 }}>Chat</Text>
          </ButtonChat>
        </CompanyContainer>
      ))}
    </Container>
  );
};

export default CompanyList;
