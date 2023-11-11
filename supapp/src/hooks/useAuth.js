import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const getTokenAndUserId = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");

        setId(userId);

        if (token) {
          api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;
          setIsAuthenticated(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTokenAndUserId();
  }, []);

  const register = async (user) => {
    try {
      await api.post("usuarios/register", user).then((response) => {
        return response.data;
      });

      navigation.navigate("SignIn");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (user) => {
    try {
      const data = await api.post("usuarios/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 403) {
        console.log("Incorrect Username or Password!");
      }
    }
  };

  const del = async (user) => {
    try {
      await api.delete(`usuarios/${id}`).then((response) => {
        return response.data;
      });

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      navigation.navigate("SignUp");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const authUser = async (data) => {
    setIsAuthenticated(true);
    await AsyncStorage.setItem("token", JSON.stringify(data.token));
    await AsyncStorage.setItem("userId", JSON.stringify(data.id));
    navigation.navigate("Home");
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("token");
    api.defaults.headers.authorization = undefined;

    navigation.navigate("SignIn");
  };

  return { isAuthenticated, isLoading, register, login, del, logout };
};

export default useAuth;
