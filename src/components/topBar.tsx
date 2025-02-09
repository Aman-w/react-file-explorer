import React from "react";
import styled from "styled-components";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaThLarge,
  FaList,
  FaBars,
  FaGripHorizontal,
  FaSearch,
  FaSync,
  FaPlus,
  FaEllipsisH,
} from "react-icons/fa";

interface TopbarProps {
  onAddFolder: () => void;
}

const TopbarContainer = styled.div`
  display: flex;
  align-items: center;
  background: #222;
  padding: 12px 15px;
  justify-content: space-between;
  color: white;
  font-size: 14px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchBox = styled.input`
  background: #333;
  border: 1px solid #444;
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  width: 150px;

  &:focus {
    border-color: #0078d4;
  }
`;

const IconButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: 0.2s ease-in-out;

  &:hover {
    color: #0078d4;
  }
`;

const Topbar: React.FC<TopbarProps> = ({ onAddFolder }) => {
  return (
    <TopbarContainer>
      <LeftSection>
        
        <IconButton title="Back">
          <FaArrowLeft />
        </IconButton>
        <IconButton title="Forward">
          <FaArrowRight />
        </IconButton>
        <Title>Downloads</Title>

      </LeftSection>
      <RightSection>
      <IconButton title="Up">
          <FaArrowUp />
        </IconButton>

        <IconButton title="Grid View">
          <FaThLarge />
        </IconButton>
        <IconButton title="List View">
          <FaList />
        </IconButton>
        <IconButton title="Menu">
          <FaBars />
        </IconButton>
        <IconButton title="More Views">
          <FaGripHorizontal />
        </IconButton>

        <IconButton title="Search">
          <FaSearch />
        </IconButton>
        <IconButton title="Refresh">
          <FaSync />
        </IconButton>
        <IconButton title="More Options">
          <FaEllipsisH />
        </IconButton>
        <SearchBox type="text" placeholder="Search" />

        <IconButton title="New Folder" onClick={onAddFolder}>
          <FaPlus />
        </IconButton>
       
      </RightSection>
    </TopbarContainer>
  );
};

export default Topbar;
