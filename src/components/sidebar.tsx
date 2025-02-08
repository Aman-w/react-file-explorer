import React from "react";
import styled from "styled-components";
import { FaCloud, FaClock, FaDesktop, FaDownload, FaFolder, FaAppStore } from "react-icons/fa";
import { MdAirplanemodeActive } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { selectFolder } from "../redux/slices/folderSlice";

const SidebarContainer = styled.div`
  width: 220px;
  background: #1e1e1e;
  height: 100vh;
  padding: 20px;
  color: white;
  font-size: 14px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background: #333;
    border-radius: 5px;
  }

  svg { 
    color: #3498db;
  }
`;

const TagItem = styled(Item)`
  svg {
    font-size: 10px;
  }
`;

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  // Handle folder selection
  const handleFolderClick = (folderId: string) => {
    dispatch(selectFolder(folderId)); // Dispatch the action with the selected folder ID
  };

  return (
    <SidebarContainer>
      <Section>
        <h4>Favourites</h4>
        <Item onClick={() => handleFolderClick("folder-1")}><MdAirplanemodeActive /> AirDrop</Item>
        <Item onClick={() => handleFolderClick("folder-2")}><FaClock /> Recents</Item>
        <Item onClick={() => handleFolderClick("folder-3")}><FaAppStore /> Applications</Item>
        <Item onClick={() => handleFolderClick("folder-4")}><FaDesktop /> Desktop</Item>
        <Item onClick={() => handleFolderClick("folder-5")}><FaFolder /> Documents</Item>
        <Item onClick={() => handleFolderClick("folder-6")}><FaDownload /> Downloads</Item>
      </Section>
      <Section>
        <h4>Locations</h4>
        <Item><FaCloud /> iCloud Drive</Item>
      </Section>
      <Section>
        <h4>Tags</h4>
        <TagItem><BsCircleFill style={{ color: "red" }} /> Red</TagItem>
        <TagItem><BsCircleFill style={{ color: "orange" }} /> Orange</TagItem>
        <TagItem><BsCircleFill style={{ color: "yellow" }} /> Yellow</TagItem>
        <TagItem><BsCircleFill style={{ color: "green" }} /> Green</TagItem>
        <TagItem><BsCircleFill style={{ color: "blue" }} /> Blue</TagItem>
        <TagItem><BsCircleFill style={{ color: "purple" }} /> Purple</TagItem>
        <TagItem><BsCircleFill style={{ color: "gray" }} /> Grey</TagItem>
      </Section>
    </SidebarContainer>
  );
};

export default Sidebar;
