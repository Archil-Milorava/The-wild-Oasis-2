import styled from "styled-components";

import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import Tag from "../ui/Tag";
import { useState } from "react";
import SignupForm from "../features/authentication/SignupForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4.3rem;
  background-color: var(--color-grey-50);
`;

const StyledSpan = styled.span`
  color: var(--color-brand-600);
  cursor: pointer;

  &:hover {
    color: var(--color-brand-700);
  }
`;

function Login() {
  const [signUpPage, setSignUpPage] = useState(false);

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Please Log in</Heading>
      <Tag>
        use the given credentials for testing purposes or{" "}
        <StyledSpan onClick={() => setSignUpPage(!signUpPage)}>
          {signUpPage ? "log in" : "sign up"}
        </StyledSpan>
      </Tag>

      {!signUpPage ? <LoginForm /> : <SignupForm />}
    </LoginLayout>
  );
}

export default Login;
