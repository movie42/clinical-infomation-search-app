import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";

interface ISearchFormContainerProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isKeySearch: boolean;
  searchInputRef: React.RefObject<HTMLInputElement>;
  handleKeyDown: (
    dataLength: number
  ) => (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setIsKeySearch: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchIndex: React.Dispatch<React.SetStateAction<number>>;
  queryStringListlength: number;
}

const SearchFormContainer = ({
  query,
  setQuery,
  isKeySearch,
  searchInputRef,
  handleKeyDown,
  setIsKeySearch,
  setSearchIndex,
  queryStringListlength
}: ISearchFormContainerProps) => {
  const navigate = useNavigate();
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

  const handleInputClick = () => {
    setIsKeySearch(false);
    setSearchIndex(-1);
  };
  return (
    <Headers>
      <h1>국내 모든 임상시험 검색하고 온라인으로 참여하기</h1>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <SearchBarContainer>
            <SearchIcon name="search" />
            <Input
              placeholder="어떤 임상시험을 찾으시나요?"
              type="text"
              onKeyDown={handleKeyDown(queryStringListlength)}
              onChange={handleSearch}
              onClick={handleInputClick}
              value={query}
              ref={searchInputRef}
            />
            <Button>검색</Button>
          </SearchBarContainer>
        </Form>
      </FormContainer>
    </Headers>
  );
};

export default SearchFormContainer;

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
