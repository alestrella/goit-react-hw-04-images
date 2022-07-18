import styled from 'styled-components';
import {
  color,
  space,
  layout,
  grid,
  flexbox,
  background,
  border,
  position,
  typography,
} from 'styled-system';

const Box = styled('div')(
  color,
  space,
  layout,
  grid,
  flexbox,
  background,
  border,
  position,
  typography
);

export default Box;
