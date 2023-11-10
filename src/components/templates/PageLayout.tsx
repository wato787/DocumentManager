import { Box, CssBaseline, IconButton, Typography } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
// import { clearedSearch } from "@/slices/app/search/searchSlice";
// import { useAppDispatch } from "@/store";

interface Props {
  mainClassName?: string | undefined;
  children?: ReactNode;
  fixedHeader?: boolean | undefined;
}

const PageLayout = (props: Props): ReactElement => {
  const [open, setOpen] = useState(true);

  const router = useRouter();
  // const dispatch = useAppDispatch();
  console.log(router.query);

  const toggleDrawer = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const navigation = useMemo(() => {
    return [
      {
        name: "カテゴリ1",
        href: "/",
        current: !router.query.searchStatusType,
      },
      {
        name: "カテゴリ2",
        href: "?searchStatusType=PENDING",
        current: router.query.searchStatusType === "PENDING",
        onClick: async (): Promise<void> => {
          // dispatch(clearedSearch());
        },
      },
      {
        name: "カテゴリ3",
        href: "?searchStatusType=RUNNING",
        current: router.query.searchStatusType === "RUNNING",
        onClick: async (): Promise<void> => {
          // dispatch(clearedSearch());
        },
      },
      {
        name: "カテゴリ4",
        href: "?searchStatusType=FINISHED",
        current: router.query.searchStatusType === "FINISHED",
      },
    ];
  }, [router]);

  return (
    <Box>
      <CssBaseline />
      <div className="flex min-h-screen flex-col">
        <header
          className={classNames(
            "bg-white top-0 z-20",
            props.fixedHeader ? "fixed w-full" : "sticky",
          )}
        >
          <div className="border-gray-200 border-b-2 px-5">
            <div className="-my-[1px] flex h-14 items-center justify-between">
              <div className="flex items-center space-x-10">
                <IconButton
                  aria-label="open drawer"
                  color="inherit"
                  edge="start"
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
                <div>
                  <Link className="flex items-center gap-x-2" href="/">
                    <Image src="/Icon.png" width={32} height={20} alt="logo" />
                    <Typography sx={{ mt: 0.5 }} fontSize={18} variant="h1">
                      Document Manager
                    </Typography>
                  </Link>
                </div>

                <div className="flex h-14 space-x-4">
                  {navigation.map((item) => (
                    <Link
                      className={classNames(
                        item.current
                          ? "text-gray-900 border-pink border-b-2 font-semibold"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                      )}
                      href={item.href}
                      key={item.name}
                      onClick={item.onClick}
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
    </Box>
  );
};

export default PageLayout;
