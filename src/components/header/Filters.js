import { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';
import { FiltersSelect } from './FiltersSelect';
import axios from 'axios';

export function Filters() {
  const { apiURL, setApiURL, setActivePage } = useData();
  const [statusOptions] = useState(['alive', 'dead', 'unknown']);
  const [genderOptions] = useState(['female', 'male', 'genderless', 'unknown']);
  const [speciesOptions, setSpeciesOptions] = useState([]);

  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  const [openSelect, setOpenSelect] = useState(null);
  const selectRefs = useRef({});

  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then(({ data }) => {
        const speciesSet = new Set(data.results.map((char) => char.species));
        setSpeciesOptions(Array.from(speciesSet));
      })
      .catch((error) => console.error('Error fetching species:', error));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectChange = useCallback(
    (name, value) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
      setOpenSelect(null);
    },
    [setFilters, setOpenSelect]
  );

  const clearSelect = useCallback(
    (name) => {
      setFilters((prev) => ({ ...prev, [name]: '' }));
    },
    [setFilters]
  );

  const applyFilters = useCallback(() => {
    const url = new URL(apiURL);
    const params = url.searchParams;
    Object.entries(filters).forEach(([key, value]) => {
      value ? params.set(key, value) : params.delete(key);
    });
    params.set('page', 1);
    setActivePage(0);
    setApiURL(url);
  }, [apiURL, filters, setActivePage, setApiURL]);

  const resetFilters = useCallback(() => {
    const url = new URL(apiURL);
    const params = url.searchParams;
    Object.keys(filters).forEach((key) => params.delete(key));
    params.set('page', 1);
    setFilters({ status: '', gender: '', species: '', name: '', type: '' });
    setActivePage(0);
    setApiURL(url);
  }, [apiURL, filters, setActivePage, setApiURL]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !Object.values(selectRefs.current).some((ref) =>
          ref?.contains(e.target)
        )
      ) {
        setOpenSelect(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Container>
      <Input
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <Input
        name="type"
        value={filters.type}
        onChange={handleChange}
        placeholder="Type"
      />

      <FiltersSelect
        label="Status"
        name="status"
        options={statusOptions}
        value={filters.status}
        open={openSelect === 'status'}
        setOpenSelect={setOpenSelect}
        onChange={handleSelectChange}
        onClear={clearSelect}
        ref={(el) => (selectRefs.current.status = el)}
      />

      <FiltersSelect
        label="Gender"
        name="gender"
        options={genderOptions}
        value={filters.gender}
        open={openSelect === 'gender'}
        setOpenSelect={setOpenSelect}
        onChange={handleSelectChange}
        onClear={clearSelect}
        ref={(el) => (selectRefs.current.gender = el)}
      />

      <FiltersSelect
        label="Species"
        name="species"
        options={speciesOptions}
        value={filters.species}
        open={openSelect === 'species'}
        setOpenSelect={setOpenSelect}
        onChange={handleSelectChange}
        onClear={clearSelect}
        ref={(el) => (selectRefs.current.species = el)}
      />

      <Button onClick={applyFilters}>Apply</Button>
      <ButtonReset onClick={resetFilters}>Reset</ButtonReset>
    </Container>
  );
}

const Container = styled.div`
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  align-items: center;
  font-size: 16px;
  max-width: 800px;

  @media (max-width: 930px) {
    grid-template-columns: repeat(4, 1fr);
    max-width: 550px;
  }

  @media (max-width: 530px) {
    grid-template-columns: repeat(2, 1fr);
    width: 300px;
    margin: 0 auto;
  }
`;

const Input = styled.input`
  background-color: #263750;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #83bf46;
  width: 100%;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #f5f5f5;
  font-size: 14px;
  transition: all 0.2s ease;
  grid-column: span 2;

  &::placeholder {
    color: #b3b3b3;
  }

  &:focus {
    background: #334466;
    border: 1px solid #83bf46;
    outline: none;
  }

  &:hover {
    background: #334466;
  }
`;

const Button = styled.button`
  height: 40px;
  background-color: transparent;
  padding: 10px 16px;
  color: #83bf46;
  border: 1px solid #83bf46;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  width: 100%;
  grid-column: span 1;

  &:hover {
    background-color: #83bf46;
    color: #fff;
  }
`;

const ButtonReset = styled(Button)`
  border-color: #ff5152;
  color: #ff5152;

  &:hover {
    background-color: #ff5152;
    color: #fff;
  }
`;
