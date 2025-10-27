import styled from 'styled-components';
import { Logo } from './Logo';
import { Filters } from './Filters';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filters />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 20px 0;
  margin-bottom: 20px;

  @media (max-width: 930px) {
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 530px) {
    margin-bottom: 10px;
  }
`;
