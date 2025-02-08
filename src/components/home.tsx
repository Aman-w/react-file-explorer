import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addFolder, reorderFolders } from "../redux/slices/folderSlice";
import { Folder } from "../redux/slices/folderSlice";
import FolderItem from "./folderItem";
import Sidebar from "./sidebar";
import Topbar from "./topBar";
import styled from "styled-components";

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
`;

const FolderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Home: React.FC = () => {
  const folders = useSelector((state: RootState) => state.folder.folders);
  const dispatch = useDispatch();

  const handleAddFolder = () => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name: "New Folder",
      type: "folder",
      parentId: undefined,
      children: [],
    };
    dispatch(addFolder(newFolder));
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const draggedFolder = folders.find(f => f.id === result.draggableId);
    if (!draggedFolder) return;
      dispatch(reorderFolders({ sourceIndex: source.index, destinationIndex: destination.index }));
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Topbar onAddFolder={handleAddFolder} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="folders" type="FOLDER">
            {(provided) => (
              <FolderGrid ref={provided.innerRef} {...provided.droppableProps}>
                {folders.map((folder, index) => (
                  <FolderItem key={folder.id} folder={folder} index={index} />
                ))}
                {provided.placeholder}
              </FolderGrid>
            )}
          </Droppable>
        </DragDropContext>
      </MainContent>
    </Container>
  );
};

export default Home;
