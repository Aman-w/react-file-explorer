import React, { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FaFolder, FaRegFile, FaTrashAlt, FaEdit, FaCopy } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteFolder, renameFolder, duplicateFolder } from "../redux/slices/folderSlice";

const shrinkVanish = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.5); opacity: 0.5; }
  100% { transform: scale(0); opacity: 0; }
`;

const FolderWrapper = styled.div<{ isDeleting: boolean }>`
  width: 120px;
  text-align: center;
  margin: 10px;
  padding: 8px;
  border-radius: 5px;
  transition: background 0.2s;
  position: relative;
  user-select: none;

  ${({ isDeleting }) =>
    isDeleting &&
    css`
      animation: ${shrinkVanish} 0.3s forwards;
    `}
`;

const FolderIcon = styled.div`
  font-size: 50px;
  color: #3da9fc;
`;

const FileIcon = styled.div`
  font-size: 50px;
  color: white;
`;

const FolderNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const FolderName = styled.input`
  font-size: 14px;
  color: white;
  background: transparent;
  border: none;
  text-align: center;
  outline: none;
  width: 100%;
  padding: 2px;
  border-radius: 3px;
  &:focus {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ChildFoldersContainer = styled.div`
  padding-left: 15px;
  margin-top: 5px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
`;

const ContextMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #222;
  color: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 10;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContextMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.2s;
  width: 100%;
  justify-content: center;

  &:hover {
    background: #444;
  }
`;

interface FolderProps {
  folder: { id: string; name: string; type: "folder" | "file"; children?: any[]; parentId?: string };
  index: number;
}

const FolderItem: React.FC<FolderProps> = ({ folder, index }) => {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRenaming) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isRenaming]);

  const handleRenameSubmit = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      dispatch(renameFolder({ id: folder.id, newName }));
      setIsRenaming(false);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuVisible(true);
  };

  const handleRename = () => {
    setIsRenaming(true);
    setMenuVisible(false);
  };

  const handleDuplicate = () => {
    dispatch(duplicateFolder(folder.id));
    setMenuVisible(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      dispatch(deleteFolder(folder.id));
    }, 300);
    setMenuVisible(false);
  };

  return (
    <>
      <Draggable draggableId={folder.id} index={index}>
        {(provided) => (
          <FolderWrapper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDeleting={isDeleting}
            onDoubleClick={() => setIsRenaming(true)}
            onContextMenu={handleRightClick}
          >
            {folder.type === "folder" ? (
              <FolderIcon>
                <FaFolder />
              </FolderIcon>
            ) : (
              <FileIcon>
                <FaRegFile />
              </FileIcon>
            )}

            <FolderNameContainer>
              {isRenaming ? (
                <FolderName
                  ref={inputRef}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={handleRenameSubmit}
                  autoFocus
                />
              ) : (
                <FolderName readOnly value={folder.name} />
              )}
            </FolderNameContainer>

            {menuVisible && (
              <ContextMenu ref={menuRef}>
                <ContextMenuItem onClick={handleRename}>
                  <FaEdit style={{ color: "#f4a261" }} />
                  Rename
                </ContextMenuItem>
                <ContextMenuItem onClick={handleDuplicate}>
                  <FaCopy style={{ color: "#3da9fc" }} />
                  Duplicate
                </ContextMenuItem>
                <ContextMenuItem onClick={handleDelete}>
                  <FaTrashAlt style={{ color: "#e63946" }} />
                  Delete
                </ContextMenuItem>
              </ContextMenu>
            )}

            {}
            {folder.type === "folder" && (
              <Droppable droppableId={folder.id} type="folder">
                {(provided) => (
                  <ChildFoldersContainer ref={provided.innerRef} {...provided.droppableProps}>
                    {folder.children?.map((child, childIndex) => (
                      <FolderItem key={child.id} folder={{ ...child, parentId: folder.id }} index={childIndex} />
                    ))}
                    {provided.placeholder}
                  </ChildFoldersContainer>
                )}
              </Droppable>
            )}
          </FolderWrapper>
        )}
      </Draggable>
    </>
  );
};

export default FolderItem;
