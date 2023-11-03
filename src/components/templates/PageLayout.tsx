import classNames from "classnames";
import { ReactNode } from "react";

import Header from "./Header";
import PageSideBar from "./PageSideBar";

interface Props {
  children: ReactNode;
  current?: string | undefined | null;
  grayBg?: boolean;
}

const PageLayout = (props: Props) => {
  // const open = useSelector((state: RootState) => state.drawer.open);

  return (
    <>
      <div className="fixed flex w-full ">
        <aside
          className={classNames(
            "relative  flex h-screen w-1/5 flex-col justify-between bg-secondary",
          )}
        >
          <div>
            <PageSideBar />
            {/* <PageSideBar current={props.current} /> */}
          </div>

          {/* <div
            className={classNames(
              "flex justify-end border-t p-4",
              !open && "justify-center",
            )}
          >
            {open ? (
              <IconButton size="small" onClick={handleToggleDrawer}>
                <ArrowBackIosNewIcon />
              </IconButton>
            ) : (
              <IconButton size="small" onClick={handleToggleDrawer}>
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </div> */}
        </aside>
        {/* ヘッダーとchidrenを縦並び */}
        <div className="flex h-screen w-full flex-col">
          <Header />

          <div
            className={classNames("m-6 flex-1", props.grayBg && "bg-secondary")}
          >
            {/* {isLoading && <LoadingScreen />} */}
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
