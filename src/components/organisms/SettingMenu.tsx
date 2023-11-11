import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

export default function SettingMenu(props: Props) {
  return (
    <div>
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
        <MenuItem onClick={props.onClose}>Profile</MenuItem>
        <MenuItem onClick={props.onClose}>My account</MenuItem>
        <MenuItem onClick={props.onClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
