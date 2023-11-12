import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;

export const ContainerImage = styled.View`
  width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

export const ImageLogo = styled.Image`
  width: 500px;
  height: 60px;
  object-fit: contain;
`;

export const Text = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Form = styled.View`
  width: 100%;
  max-height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

export const InputArea = styled.View`
  max-width: 100%;
  max-height: 100%;
  margin: 14px 0;
  display: flex;
  flex-direction: column;
`;
