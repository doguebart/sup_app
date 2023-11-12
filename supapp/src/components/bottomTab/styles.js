import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  min-height: 110px;
  display: flex;
  position: absolute;
  bottom: 0;
  box-shadow: 0px 2px 4px #999;
  background: #fff;
`;

export const IconContainer = styled.View`
  width: 100%;
  max-height: 100%;
  padding: 0 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const IconTextContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  color: #000;
`;
