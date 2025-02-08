import React from "react";
import styled from "styled-components";

const FolderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin: 10px;
`;

const FolderIcon = styled.div`
  width: 60px;
  height: 60px;
  background: url("/folder-icon.png") no-repeat center;
  background-size: contain;
`;

const FolderName = styled.span`
  color: white;
  font-size: 12px;
`;

interface FolderProps {
  name: string;
}

const Folder: React.FC<FolderProps> = ({ name }) => {
  return (
    <FolderContainer>
      <FolderIcon />
      <FolderName>{name}</FolderName>
    </FolderContainer>
  );
};

export default Folder;
