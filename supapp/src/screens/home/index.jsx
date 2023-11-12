import React from "react";
import { Container, Text } from "./styles";
import Header from "../../components/header";
import CompanyList from "./../../components/companyList/index";
import BottomTab from "./../../components/bottomTab/index";

const Home = () => {
  return (
    <Container>
      <Header />
      <CompanyList />
      <BottomTab />
    </Container>
  );
};

export default Home;
