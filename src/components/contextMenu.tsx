import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import FolderItem from "./folderItem";
import { RootState } from "@/redux/store";
import { addFolder, deleteFolder, Folder } from "@/redux/slices/folderSlice";
import Sidebar from "./sidebar";
import Topbar from "./topBar";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #1e1e1e;
  color: white;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #191919;
  padding: 10px;
  position: relative;
`;

const FolderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ContextMenu = styled.div<{ visible: boolean; x: number; y: number }>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  background: #333;
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: ${(props) => (props.visible ? "block" : "none")};
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background: #444;
  }
`;

const App: React.FC = () => {
  const folders = useSelector((state: RootState) => state.folder.folders);
  const dispatch = useDispatch();

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    selectedFolder: null as string | null,
  });

  const handleAddFolder = () => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name: "New Folder",
      type: "folder",
    };
    dispatch(addFolder(newFolder));
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleDeleteFolder = () => {
    if (contextMenu.selectedFolder) {
      dispatch(deleteFolder(contextMenu.selectedFolder));
    }
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleContextMenu = (event: React.MouseEvent, folderId: string) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      selectedFolder: folderId,
    });
  };

  return (
    <Container onClick={() => setContextMenu({ ...contextMenu, visible: false })}>
      <Sidebar />
      <MainContent>
        <Topbar onAddFolder={handleAddFolder} />
        <DragDropContext onDragEnd={() => { }}>
          <Droppable droppableId="folders">
            {(provided) => (
              <FolderGrid ref={provided.innerRef} {...provided.droppableProps}>
                {folders.map((folder, index) => (
                  <div key={folder.id} onContextMenu={(e) => handleContextMenu(e, folder.id)}>
                    <FolderItem folder={folder} index={index} />
                  </div>
                ))}
                {provided.placeholder}
              </FolderGrid>
            )}
          </Droppable>
        </DragDropContext>

        <ContextMenu visible={contextMenu.visible} x={contextMenu.x} y={contextMenu.y}>
          <MenuItem onClick={handleAddFolder}>Create Folder</MenuItem>
          <MenuItem onClick={handleDeleteFolder}>Delete Folder</MenuItem>
        </ContextMenu>
      </MainContent>
    </Container>
  );
};

export default App;
