import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState } from "react";
import AddCategoryDialog from "../molucules/dialog/AddCategoryDialog";
import { ListItemIcon } from "@mui/material";

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

export default function SettingMenu(props: Props) {
  const [AddCategoryDialogOpen, setAddCategoryDialogOpen] =
    useState<boolean>(false);
  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.onClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ mt: 2 }}
      >
        <MenuItem onClick={(): void => setAddCategoryDialogOpen(true)}>
          <ListItemIcon>
            <AddIcon sx={{ color: "gray" }} fontSize="small" />
          </ListItemIcon>

          <span className=" font-sans text-gray-600">カテゴリー追加</span>
        </MenuItem>
        <MenuItem onClick={props.onClose}>
          <ListItemIcon>
            <FileUploadIcon sx={{ color: "gray" }} fontSize="small" />
          </ListItemIcon>
          <span className=" font-sans text-gray-600">ファイルアップロード</span>
        </MenuItem>

        <MenuItem onClick={props.onClose}>Logout</MenuItem>
      </Menu>
      {AddCategoryDialogOpen && (
        <AddCategoryDialog
          open={AddCategoryDialogOpen}
          onClose={() => setAddCategoryDialogOpen(false)}
        />
      )}
    </>
  );
}
