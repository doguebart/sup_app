import React from "react";
import { Container, Link, Text } from "./styles";

const LinkComponent = (props) => {
  const { onPress, children } = props;

  return (
    <Container>
      <Link onPress={onPress}>
        <Text>{children}</Text>
      </Link>
    </Container>
  );
};

export default LinkComponent;
