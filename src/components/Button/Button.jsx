import { ButtonStyled } from './Button.styled';

const Button = ({ caption, handleClick }) => {
  return (
    <ButtonStyled type="button" onClick={handleClick}>
      {caption}
    </ButtonStyled>
  );
};

export default Button;
