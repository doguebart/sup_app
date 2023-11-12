import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container } from "./styles";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";
import api from "../../services/api";

const Chat = () => {
  const [userData, setUserData] = useState({});
  const [company, setCompany] = useState([]);
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [messages, setMessages] = useState([]);

  const route = useRoute();
  const companyId = route.params?.companyId;

  const id = parseInt(companyId);

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
              setUserData(response.data);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");

        if (userId && token && companyId) {
          api
            .get(`empresas/${companyId}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            })
            .then((response) => {
              console.log("Nome da Empresa:", response.data.nome);
              setCompany(response.data);
              setInputPlaceholder(`Inicie o suporte com ${response.data.nome}`);
            })
            .catch((error) => {
              console.error("Error fetching company data:", error);
            });
        }
      } catch (error) {
        console.error("Error reading AsyncStorage:", error);
      }
    };

    fetchData();
  }, [companyId]);

  const onSend = (newMessages = []) => {
    const userMessage = newMessages[0].text.toLowerCase();

    // Process user message

    // Add the user's message first
    setMessages((prevMessages) => [newMessages[0], ...prevMessages.slice()]);

    // Add bot's response
    if (userMessage === "olá" || userMessage === "ola") {
      const botResponse = {
        _id: messages.length + 1,
        text: `Olá ${userData.nome}! Sou o assistente virtual responsável pelo suporte ${company.nome}. Estou aqui para responder às suas perguntas, fornecer informações úteis e auxiliar no que for necessário.`,
        user: {
          _id: 2,
          name: company.nome,
        },
      };

      setMessages((prevMessages) => [botResponse, ...prevMessages.slice()]);
    } else if (userMessage === "como acessar o google cloud?") {
      const botResponse = {
        _id: messages.length + 1,
        text: "Pesquise por 'Google Cloud' e faça login no Google Admin Console. Use sua conta de administrador (não termina em @gmail.com). Para controlar o acesso à criação de projetos do Google Cloud, clique em Configurações da API Cloud Resource Manager.",
        user: {
          _id: 2,
          name: company.nome,
        },
      };

      setMessages((prevMessages) => [botResponse, ...prevMessages.slice()]);
    } else if (userMessage === "obrigado") {
      const botResponse = {
        _id: messages.length + 1,
        text: "De nada! Fico feliz em poder ajudar. Se surgirem mais dúvidas ou se precisar de assistência no futuro, estou sempre por aqui.",
        user: {
          _id: 2,
          name: company.nome,
        },
      };

      setMessages((prevMessages) => [botResponse, ...prevMessages.slice()]);
    }
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 4,
          borderColor: "#CCCCCC",
          borderWidth: 1,
          marginTop: props.currentMessage.user._id === 1 ? 10 : 0,
        },
        right: {
          padding: 4,
          backgroundColor: "darkblue",
        },
      }}
    />
  );

  const renderSend = (props) => (
    <IconButton
      icon="send"
      onPress={() => props.onSend({ text: props.text.trim() }, true)}
    />
  );

  return (
    <Container>
      <GiftedChat
        messages={messages}
        inverted={true}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
          name: "Seu Nome",
        }}
        renderBubble={renderBubble}
        renderTime={() => null}
        renderDay={() => null}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: "#fff",
              borderWidth: 1,
              height: 50,
              borderColor: "#CCCCCC",
              borderTopWidth: 0,
              marginTop: 0,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 10,
            }}
            placeholder={inputPlaceholder || "Digite uma mensagem"}
            renderSend={renderSend}
          />
        )}
        listViewProps={{
          style: { flex: 1, marginTop: 60, marginBottom: 20 },
        }}
      />
    </Container>
  );
};

export default Chat;
