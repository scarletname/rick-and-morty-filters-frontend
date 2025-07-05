import styled from 'styled-components';
import { ReactComponent as Male } from '../assets/genders/male.svg';
import { ReactComponent as Female } from '../assets/genders/female.svg';
import { ReactComponent as Genderless } from '../assets/genders/genderless.svg';

const genderIcons = {
  Male: <Male width={20} height={20} fill="#33b3c8" title="Male" />,
  Female: <Female width={24} height={24} fill="pink" title="Female" />,
  'unknown, Genderless': (
    <Genderless width={24} height={24} fill="#999" title="Genderless" />
  )
};

const statusColors = {
  Alive: '#83bf46',
  Dead: '#ff5152',
  unknown: '#968c9d'
};

export function Card({
  status,
  name,
  species,
  type,
  gender,
  image,
  onClickHandler
}) {
  return (
    <StyledCard onClick={onClickHandler}>
      <CardImg src={image} alt={name} />
      <CardInfo>
        <CardTitle name={name} gender={gender} />
        <CardStatus status={status} species={species} type={type} />
      </CardInfo>
    </StyledCard>
  );
}

export const CardTitle = ({ name, gender, className }) => {
  const iconKey =
    Object.keys(genderIcons).find((key) => key.split(',').includes(gender)) ||
    'unknown, Genderless';

  return (
    <FlexAlign className={className} style={{ marginBottom: 10 }}>
      <CardTitleText className="card-title">{name}</CardTitleText>
      <Flex>{genderIcons[iconKey]}</Flex>
    </FlexAlign>
  );
};

export function CardStatus({ status, species, type, className }) {
  return (
    <FlexWrap className={className}>
      <StatusText status={status}>{status}</StatusText>&nbsp;-&nbsp;
      <span>{species}</span>
      {type && <TypeText>{type}</TypeText>}
    </FlexWrap>
  );
}

const Flex = styled.div`
  display: flex;
`;

const FlexAlign = styled(Flex)`
  align-items: center;
`;

const FlexWrap = styled(Flex)`
  flex-wrap: wrap;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background: #263750;
  border-radius: 10px;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover .card-title {
    color: #83bf46;
  }
`;

const CardImg = styled.img`
  border-radius: 10px 10px 0 0;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 20px;
`;

const CardTitleText = styled.h2`
  margin-right: 8px;
  transition: color 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  font-size: 24px;

  @media (max-width: 450px) {
    max-width: 130px;
    font-size: 18px;
  }
`;

const StatusText = styled.span`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  &::before {
    content: '';
    display: block;
    margin-right: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${({ status }) => statusColors[status] || statusColors.unknown};
  }
`;

const TypeText = styled.p`
  margin-top: 20px;
  width: 100%;
  color: #ddd;
  font-size: 16px;
`;
