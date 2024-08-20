import styled from "styled-components";

import { useState } from "react";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

const Form = styled.form`
  width: 40rem;
  height: 15rem;
`;

const FormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
`;

function LoginForm() {
  const [email, setEmail] = useState("test@archil.com");
  const [password, setPassword] = useState("testpassword");
  const { userLoginWithEmail, isLoggingInWithEmail } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    userLoginWithEmail({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <label htmlFor="email"> Email address</label>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingInWithEmail}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <label htmlFor="password">Password</label>

        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingInWithEmail}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">
          {isLoggingInWithEmail ? <SpinnerMini /> : "Log in"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
