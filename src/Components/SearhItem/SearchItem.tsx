import React, { useEffect } from "react";
import { highlightString } from "@/lib/utils/highlightString";
import { AiOutlineSearch } from "react-icons/ai";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

interface ISearchItemProps {
  isSelect: boolean;
  queryString: string;
  search: string;
}

const SearchItem = ({ queryString, search, isSelect }: ISearchItemProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const enterSearchStringToUrl = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        navigate(`/sick?q=${search}`);
      }
    };

    if (isSelect) {
      window.addEventListener("keydown", enterSearchStringToUrl);
    }

    return () => window.removeEventListener("keydown", enterSearchStringToUrl);
  }, [isSelect, search]);

  return (
    <Container isSelect={isSelect}>
      <SearchIcon />
      <span>{highlightString(queryString, search)}</span>
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
