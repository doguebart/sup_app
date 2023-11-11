import React from "react";
import { Container, Button, Text } from "./styles";

const ButtonComponent = (props) => {
  const { onPress, children } = props;

  return (
    <Container>
      <Button onPress={onPress}>
        <Text>{children}</Text>
      </Button>
    </Container>
  );
};

export default ButtonComponent;
