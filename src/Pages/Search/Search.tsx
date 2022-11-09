import React, { useEffect } from "react";
import useGetQuery from "@/lib/hooks/useGetQuery";
import styled from "styled-components";
import { SearchItem } from "@/Components/SearhItem";
import useKeyboardControl from "./hooks/useKeyboardControl";
import SearchFormContainer from "./SearchFormContainer";

interface SickProps {
  sickCd: string;
  sickNm: string;
}

const Search = () => {
  const { query, setQuery, data } = useGetQuery<SickProps[]>();
  const {
    isKeySearch,
    setQueryStringListlength,
    queryStringListlength,
    searchInputRef,
    handleKeyDown,
    ulRef,
    searchIndex,
    handleEscape,
    setIsKeySearch,
    setSearchIndex
  } = useKeyboardControl();

  useEffect(() => {
    if (data) {
      setQueryStringListlength(data.length);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  return (
    <Container>
      <SearchFormContainer
        query={query}
        setQuery={setQuery}
        queryStringListlength={queryStringListlength}
        isKeySearch={isKeySearch}
        searchInputRef={searchInputRef}
        handleKeyDown={handleKeyDown}
        setIsKeySearch={setIsKeySearch}
        setSearchIndex={setSearchIndex}
      />
      {query && (
        <SearchingResultContainer>
          {data?.length !== 0 ? (
            <>
              <p>추천 검색어</p>
              <ul ref={ulRef}>
                {data?.map((value, index) => (
                  <SearchItem
                    isSelect={index === searchIndex}
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

const Container = styled.div`
  box-sizing: border-box;
  padding: 0 5rem;
  display: grid;
  grid-template-rows: 45vh 1fr;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.color.primary};
`;

const SearchingResultContainer = styled.div`
  position: relative;
  font-size: 1.7rem;
  box-sizing: border-box;
  justify-self: center;
  border-radius: 3rem;
  width: 100%;
  max-width: 49rem;
  background-color: ${(props) => props.theme.color.white};
  margin-top: 1rem;
  height: 100%;
  max-height: 45vh;
  overflow: hidden;

  p {
    padding: 2rem 0 0 5rem;
    font-size: 1.4rem;
    color: ${(props) => props.theme.color.gray};
  }
  ul {
    position: absolute;
    top: 2rem;
    left: 0;
    right: 0;
    height: 45vh;
    margin: 2rem 0;
    line-height: 4rem;
    overflow-y: auto;
  }
`;
