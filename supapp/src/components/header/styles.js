import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  min-height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 2px #999;
  background: #fff;
`;

export const IconTextContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 16px;
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
  color: #000;
`;
