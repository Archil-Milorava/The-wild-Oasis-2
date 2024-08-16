import styled from "styled-components";

const StyleP = styled.p`

text-align: center;
font-size: 2rem;
padding: 2rem;
`




function Empty({ resource }) {
  return <StyleP>No {resource} could be found.</StyleP>;
}

export default Empty;
