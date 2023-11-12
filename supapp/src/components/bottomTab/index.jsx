import React from "react";
import { Container, IconContainer, IconTextContainer, Text } from "./styles";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

const BottomTab = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const navigateTo = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <Container>
      <IconContainer>
        <IconTextContainer>
          <Icon name="home" onPress={() => navigateTo("Home")} size={22} />
          <Text>Início</Text>
        </IconTextContainer>
        <IconTextContainer>
          <Icon
            name="message-circle"
            onPress={() => navigateTo("Chat")}
            size={22}
          />
          <Text>Chat</Text>
        </IconTextContainer>
        <IconTextContainer>
          <Icon
            name="database"
            onPress={() => navigateTo("CreateCompany")}
            size={22}
          />
          <Text>Nova Empresa</Text>
        </IconTextContainer>
        <IconTextContainer>
          <Icon name="user" onPress={() => navigateTo("Profile")} size={22} />
          <Text>Perfil</Text>
        </IconTextContainer>
      </IconContainer>
    </Container>
  );
};

export default BottomTab;
