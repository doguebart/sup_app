import React from "react";
import { Container, IconContainer, IconTextContainer, Text } from "./styles";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import CreateCompany from './../../screens/company/create';

const BottomTab = () => {
  const navigation = useNavigation();

  const Home = () => {
    navigation.navigate("Home");
  };

  const Chat = () => {
    navigation.navigate("Home");
  };

  const CreateCompany = () => {
    navigation.navigate("CreateCompany");
  };

  const Profile = () => {
    navigation.navigate("Profile");
  };

  return (
    <Container>
      <IconContainer>
        <IconTextContainer>
          <Icon name="home" onPress={Home} size={25} color="black" />
          <Text>Início</Text>
        </IconTextContainer>
        <IconTextContainer>
          <Icon name="message-circle" onPress={Chat} size={25} color="black" />
          <Text>Chat</Text>
        </IconTextContainer>
        <IconTextContainer>
          <Icon name="database" onPress={CreateCompany} size={25} color="black" />
          <Text>Registrar Empresa</Text>
        </IconTextContainer>
        <IconTextContainer>
          <Icon name="user" onPress={Profile} size={25} color="black" />
          <Text>Perfil</Text>
        </IconTextContainer>
      </IconContainer>
    </Container>
  );
};

export default BottomTab;
