import { forwardRef, useCallback } from 'react';
import styled from 'styled-components';

export const FiltersSelect = forwardRef(
  (
    { label, name, options, value, open, setOpenSelect, onChange, onClear },
    ref
  ) => {
    const handleButtonClick = useCallback(() => {
      setOpenSelect(open ? null : name);
    }, [open, name, setOpenSelect]);
    const handleClearClick = useCallback(
      (e) => {
        e.stopPropagation();
        onClear(name);
      },
      [name, onClear]
    );
    const handleOptionClick = useCallback(
      (e) => {
        const opt = e.currentTarget.dataset.value;
        onChange(name, opt);
      },
      [name, onChange]
    );

    return (
      <SelectContainer ref={ref}>
        <SelectButton onClick={handleButtonClick} hasValue={!!value}>
          {value || label}
          {!value && (open ? <UpArrow /> : <DownArrow />)}
          {value && <ClearIcon onClick={handleClearClick}>×</ClearIcon>}
        </SelectButton>

        {open && (
          <OptionsList>
            {options.map((opt) => (
              <OptionItem
                key={opt}
                active={opt === value}
                data-value={opt}
                onClick={handleOptionClick}
              >
                {opt}
              </OptionItem>
            ))}
          </OptionsList>
        )}
      </SelectContainer>
    );
  }
);

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  grid-column: span 2;
`;

const SelectButton = styled.div`
  height: 40px;
  background-color: #263750;
  color: ${({ hasValue }) => (hasValue ? '#f5f5f5' : '#b3b3b3')};
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #83bf46;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  transition: all 0.2s ease;
  text-transform: capitalize;

  &:hover {
    background: #334466;
  }
`;

const ArrowBase = styled.span`
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 12px;
  height: 12px;
  margin-left: 8px;
`;

const DownArrow = styled(ArrowBase)`
  &::after {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 6px;
    border-bottom: 2px solid;
    border-right: 2px solid;
    transform: rotate(45deg);
    left: 2px;
    top: 2px;
    color: currentColor;
  }
`;

const UpArrow = styled(ArrowBase)`
  &::after {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 6px;
    border-top: 2px solid;
    border-right: 2px solid;
    transform: rotate(-45deg);
    left: 2px;
    top: 5px;
    color: currentColor;
  }
`;

const ClearIcon = styled.span`
  color: #ffffff;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    color: #83bf46;
  }
`;

const OptionsList = styled.div`
  position: absolute;
  z-index: 10;
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  margin-top: 5px;
  overflow: hidden;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

const OptionItem = styled.div`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #f5f5f5;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  transition: all 0.2s ease;
  text-transform: capitalize;

  &:hover {
    background: #334466;
  }

  ${({ active }) =>
    active &&
    `
    background: #83bf4622;
  `}
`;
