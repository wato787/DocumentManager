import { Box, CssBaseline, IconButton, Typography } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from "react";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import SettingMenu from "../organisms/SettingMenu";
import { Category } from "@prisma/client";
import LoadingScreen from "./LoadingScreen";
// import { clearedSearch } from "@/slices/app/search/searchSlice";
// import { useAppDispatch } from "@/store";

interface Props {
  mainClassName?: string | undefined;
  children?: ReactNode;
  fixedHeader?: boolean | undefined;
  categories?: Category[];
  loading?: boolean;
}

const PageLayout = (props: Props): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  const handleMenuOpened = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClosed = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <CssBaseline />
      {!props.loading ? (
        <>
          <div className="flex min-h-screen flex-col">
            <header
              className={classNames(
                "top-0 z-20 bg-white",
                props.fixedHeader ? "fixed w-full" : "sticky",
              )}
            >
              <div className="border-b-2 border-gray-200 px-5">
                <div className="-my-[1px] flex h-14 items-center justify-between">
                  <div className="flex items-center space-x-10">
                    <IconButton
                      aria-label="open drawer"
                      color="inherit"
                      edge="start"
                      onClick={handleMenuOpened}
                    >
                      <MenuIcon />
                    </IconButton>
                    <div>
                      <Link
                        className="flex items-center gap-x-2"
                        href="?categoryId=All"
                      >
                        <Image
                          src="/Icon.png"
                          width={32}
                          height={20}
                          alt="logo"
                        />
                        <Typography sx={{ mt: 0.5 }} fontSize={18} variant="h1">
                          Document Manager
                        </Typography>
                      </Link>
                    </div>

                    <div className="flex h-14 space-x-4">
                      {props.categories?.map((item) => (
                        <Link
                          className={classNames(
                            item?.id === router.query.categoryId
                              ? "text-gray-900 border-b-2 border-pink font-semibold"
                              : "border-transparent hover:text-gray-700 text-gray-500 hover:border-gray-300",
                            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                          )}
                          href={`?categoryId=${item.id}`}
                          key={item.id}
                          // onClick={}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <main
              className={classNames(
                " flex-grow overflow-hidden",
                props.mainClassName,
              )}
            >
              {props.children}
            </main>
          </div>
          {open && (
            <SettingMenu
              onClose={handleMenuClosed}
              open={open}
              anchorEl={anchorEl}
            />
          )}
        </>
      ) : (
        <LoadingScreen />
      )}
    </Box>
  );
};

export default PageLayout;
