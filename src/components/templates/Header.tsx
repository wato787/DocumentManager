import { Menu, Box } from "@mui/material";
import React, { ReactElement, useCallback, useState } from "react";
import { useRouter } from "next/router";

const Header = (): ReactElement => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();

  //ユーザーメニュー
  const handleOpenUserMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    [],
  );

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return (
    <header className="flex h-16 w-full items-center justify-end border-b bg-secondary px-6 py-1">
      {/* <Tooltip title="プロフィール">
        {/* <IconButton onClick={handleOpenUserMenu}>
          <Avatar
            sx={{ bgcolor: "lightblue" }}
            src={user?.photoURL as string}
          />
        </IconButton> */}
      {/* </Tooltip> */}
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box>
          {/* <MenuItem onClick={handleClickSetting}>
            <ManageAccountsIcon sx={{ mr: 2 }} />
            ユーザ設定
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 2 }} />
            ログアウト
          </MenuItem> */}
        </Box>
      </Menu>
    </header>
  );
};

export default Header;
