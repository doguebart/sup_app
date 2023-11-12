import React from "react";
import { Container, Button, Text } from "./styles";

const ButtonComponent = (props) => {
  const { onPress, style, children } = props;

  return (
    <Container>
      <Button style={style} onPress={onPress}>
        <Text>{children}</Text>
      </Button>
    </Container>
  );
};

export default ButtonComponent;
