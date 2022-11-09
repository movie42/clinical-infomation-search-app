import useGetQuery from "@/lib/hooks/useGetQuery";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { SearchItem } from "@/Components/SearhItem";

interface SickProps {
  sickCd: string;
  sickNm: string;
}

const Search = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isKeySearch, setIsKeySearch] = useState(false);
  const { query, setQuery, data } = useGetQuery<SickProps[]>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isKeySearch) {
      return;
    }
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      navigate(`/sick?q=${query}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) {
      setIsKeySearch(false);
      return;
    }
    if (data?.length === 0) {
      return;
    }

    if (e.key === "ArrowUp") {
      setIsKeySearch(true);

      e.currentTarget.blur();
    }

    if (e.key === "ArrowDown") {
      setIsKeySearch(true);
      e.currentTarget.blur();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (searchInputRef) {
          searchInputRef.current?.focus();
        }
        setIsKeySearch(false);
      }
    };
    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [searchInputRef]);

  return (
    <Container>
      <Headers>
        <h1>국내 모든 임상시험 검색하고 온라인으로 참여하기</h1>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <SearchBarContainer>
              <SearchIcon name="search" />
              <Input
                placeholder="어떤 임상시험을 찾으시나요?"
                type="text"
                onKeyDown={handleKeyDown}
                onChange={handleSearch}
                value={query}
                ref={searchInputRef}
              />
              <Button>검색</Button>
            </SearchBarContainer>
          </Form>
        </FormContainer>
      </Headers>
      {query && (
        <SearchingResultContainer isKeySearch={isKeySearch}>
          {data?.length !== 0 ? (
            <>
              <p>추천 검색어</p>
              <ul>
                {data?.map((value) => (
                  <SearchItem
                    key={value.sickCd}
                    search={value.sickNm}
                    queryString={query}
                  />
                ))}
              </ul>
            </>
          ) : (
            <p>추천 검색어가 없습니다.</p>
          )}
        </SearchingResultContainer>
      )}
    </Container>
  );
};

export default Search;

const Headers = styled.div`
  h1 {
    line-height: 5rem;
    padding: 2rem 0;
    font-size: 3.5rem;
    text-align: center;
    font-weight: 900;
  }
  justify-self: center;
  align-self: flex-end;
  width: 100%;
  max-width: 49rem;
`;

const Container = styled.div`
  box-sizing: border-box;
  padding: 0 5rem;
  display: grid;
  grid-template-rows: 45vh 1fr;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.color.primary};
`;

const FormContainer = styled.div``;

const Form = styled.form`
  width: 100%;
`;

const SearchBarContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 8fr 2fr;
  width: 100%;
`;

const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  top: 50%;
  left: 2rem;
  font-size: 2rem;
  transform: translateY(-50%);
  color: ${(props) => props.theme.color.gray};
`;

const Input = styled.input`
  border: 0;
  border-radius: 3rem 0 0 3rem;
  font-size: 1.7rem;
  padding: 1.7rem 1rem 1.7rem 5rem;
`;

const Button = styled.button`
  border: 0;
  font-size: 1.7rem;
  font-weight: 700;
  background-color: ${(props) => props.theme.color.second};
  color: ${(props) => props.theme.color.white};
  border-radius: 0 3rem 3rem 0;
`;

const SearchingResultContainer = styled.div<{ isKeySearch: boolean }>`
  font-size: 1.7rem;
  box-sizing: border-box;
  justify-self: center;
  border-radius: 3rem;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  max-height: 45vh;
  max-width: 49rem;
  background-color: ${(props) => props.theme.color.white};
  margin-top: 1rem;
  p {
    padding: 2rem 0 0 5rem;
    font-size: 1.4rem;
    color: ${(props) => props.theme.color.gray};
  }
  ul {
    padding: 1rem 0;
    line-height: 4rem;
    li {
      ${({ isKeySearch, theme }) => {
        if (isKeySearch) {
          return css`
            background-color: ${theme.color.second};
            color: ${theme.color.white};
          `;
        }
      }}
    }
  }
`;
