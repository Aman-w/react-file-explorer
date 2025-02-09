import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Folder {
  id: string;
  name: string;
  type: "folder" | "file";
  parentId?: string;
  children?: Folder[];
}

interface FolderState {
  folders: Folder[];
  selectedFolderId: string | null; 
  }

const initialState: FolderState = {
  folders: [{ id: "file-1", name: "Default File.txt", type: "file" }],
  selectedFolderId: null, 
};

const findFolderById = (folders: Folder[], id: string): Folder | undefined => {
  for (const folder of folders) {
    if (folder.id === id) return folder;
    if (folder.children) {
      const found = findFolderById(folder.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<{ parentId?: string; name: string }>) => {
      const newFolder: Folder = { id: crypto.randomUUID(), name: action.payload.name, type: "folder", parentId: action.payload.parentId, children: [] };

      if (!action.payload.parentId) {
        state.folders.push(newFolder);
      } else {
        const parentFolder = findFolderById(state.folders, action.payload.parentId);
        if (parentFolder) {
          parentFolder.children = [...(parentFolder.children || []), newFolder];
        }
      }
    },

    renameFolder: (state, action: PayloadAction<{ id: string; newName: string }>) => {
      const folder = findFolderById(state.folders, action.payload.id);
      if (folder) {
        folder.name = action.payload.newName;
      }
    },

    duplicateFolder: (state, action: PayloadAction<string>) => {
      const original = findFolderById(state.folders, action.payload);
      if (!original) return;

      const duplicate = {
        ...original,
        id: crypto.randomUUID(),
        name: `${original.name} (Copy)`,
        children: original.children ? [...original.children] : [],
      };

      state.folders.push(duplicate);
    },

    deleteFolder: (state, action: PayloadAction<string>) => {
      const removeFolder = (folders: Folder[]): Folder[] => {
        return folders.filter(folder => {
          if (folder.id === action.payload) return false;
          if (folder.children) folder.children = removeFolder(folder.children);
          return true;
        });
      };
      state.folders = removeFolder(state.folders);
    },

    reorderFolders: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedItem] = state.folders.splice(sourceIndex, 1);
      state.folders.splice(destinationIndex, 0, movedItem);
    },

    selectFolder: (state, action: PayloadAction<string | null>) => {
      state.selectedFolderId = action.payload;
    },

  },
});

export const { addFolder, renameFolder, duplicateFolder, deleteFolder, reorderFolders, selectFolder } = folderSlice.actions;
export { Folder };

export default folderSlice.reducer;
