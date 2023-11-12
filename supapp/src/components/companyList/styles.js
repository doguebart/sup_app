import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CompanyContainer = styled.View`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  margin: 6px 20px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 0px 2px #999;
`;

export const CompanyRegisterContainer = styled.View`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CompanyRegisterButton = styled.TouchableOpacity`
  max-width: 55%;
  max-height: 100%;
  margin: 0 20px;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: darkblue;
  margin-bottom: 20px;
`;

export const ButtonChat = styled.TouchableOpacity`
  max-width: 30%;
  max-height: 100%;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 4px;
  border: none;
  background-color: darkblue;
  margin-bottom: 20px;
`;

export const CompanyNameContainer = styled.View`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const UtilsContainer = styled.View`
  max-width: 100%;
  max-height: 100%;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const Text = styled.Text`
  font-size: 16px;
  margin: 10px;
  color: #000;
`;
