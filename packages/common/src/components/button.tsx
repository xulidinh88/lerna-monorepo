import styled from "styled-components";

const Button = () => {
	return <StyledButton>Button from common</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
	width: 20rem;
	height: 4rem;
	background-color: #ff7b42;
	color: #fff;
	border-radius: 0.4rem;
	border: none;
`;
