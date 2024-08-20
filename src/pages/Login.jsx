import styled from "styled-components";

import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';
import Tag from '../ui/Tag';


const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return <LoginLayout>
    <Logo />
    <Heading as="h4" >Please Log in</Heading>
    <Tag>use the given credentials for testing purposes or sign up</Tag>
    <LoginForm />
  </LoginLayout>;
}

export default Login;
