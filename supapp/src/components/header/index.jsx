import React, { useEffect, useContext, useState } from "react";
import { Alert } from "react-native";
import { Container, IconTextContainer, Text } from "./styles";
import { Context } from "../../context/UserContext";
import Icon from "react-native-vector-icons/Feather";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const [user, setUser] = useState({});
  const { logout } = useContext(Context);

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

  const userLogout = () => {
    Alert.alert("Confirmação", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        onPress: logout,
        style: "destructive",
      },
    ]);
  };

  return (
    <Container>
      <Text>
        Olá,{" "}
        <Text style={{ fontSize: 20, fontWeight: "500" }}>{user.nome}</Text>
      </Text>
      <IconTextContainer>
        <Icon
          name="log-out"
          size={22}
          style={{ marginTop: 40, marginRight: 20 }}
          color="#000"
          onPress={userLogout}
        />
        {/* <Text style={{ marginTop: 0, marginLeft: 0, marginTop: 4 }}>Sair</Text> */}
      </IconTextContainer>
    </Container>
  );
};

export default Header;
