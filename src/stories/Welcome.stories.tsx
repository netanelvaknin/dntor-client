import { Meta } from "@storybook/react";
import styled from "styled-components";

const Heading = styled.h1`
  font-weight: bold;
`;

export const Welcome = () => (
  <div>
    <Heading>Welcome to fastor</Heading>
  </div>
);

export default {
  title: "Main/Welcome",
} as Meta;
