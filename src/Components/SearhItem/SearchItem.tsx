import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styled, { css } from "styled-components";

interface ISearchItemProps {
  isSelect: boolean;
  queryString: string;
  search: string;
}

const SearchItem = ({ queryString, search, isSelect }: ISearchItemProps) => {
  const strong = (queryString: string, search: string): JSX.Element => {
    const matchString = search.split(new RegExp(`(${queryString})`, "gi"));

    return (
      <>
        {matchString.map((string, index) => {
          return string === queryString ? (
            <strong key={index}>{string}</strong>
          ) : (
            <span key={index}>{string}</span>
          );
        })}
      </>
    );
  };
  return (
    <Container isSelect={isSelect}>
      <SearchIcon />
      <span>{strong(queryString, search)}</span>
    </Container>
  );
};

export default SearchItem;

const Container = styled.li<{ isSelect: boolean }>`
  position: relative;
  padding-left: 5rem;
  font-size: 1.7rem;
  color: ${(props) => props.theme.color.black};
  ${({ isSelect }) => {
    if (isSelect) {
      return css`
        background-color: ${(props) => props.theme.color.second};
      `;
    }
    return css`
      background-color: unset;
    `;
  }}
  span {
    font-weight: 400;
  }
  strong {
    font-weight: 900;
  }
`;

const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  top: 50%;
  left: 2rem;
  font-size: 2rem;
  transform: translateY(-50%);
  color: ${(props) => props.theme.color.gray};
`;
