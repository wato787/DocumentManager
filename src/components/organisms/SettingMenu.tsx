import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState } from "react";
import AddCategoryDialog from "../molucules/dialog/AddCategoryDialog";

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
          <div className="flex items-center gap-x-2.5">
            <AddIcon sx={{ color: "gray" }} fontSize="small" />
            <span className=" font-sans text-gray-600">カテゴリー追加</span>
          </div>
        </MenuItem>
        <MenuItem onClick={props.onClose}>
          <div className="flex items-center gap-x-2.5">
            <FileUploadIcon sx={{ color: "gray" }} fontSize="small" />
            <span className=" font-sans text-gray-600">
              ファイルアップロード
            </span>
          </div>
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
