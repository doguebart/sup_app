import React from "react";
import { Container, Input, ErrorMessage } from "./styles";

const InputComponent = (props) => {
  const {
    type,
    name,
    onChangeText,
    value,
    placeholder,
    secureTextEntry,
    errorMessage,
  } = props;

  return (
    <Container>
      <Input
        type={type}
        name={name}
        onChangeText={onChangeText}
        value={value}
        isError={!!errorMessage}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

export default InputComponent;
