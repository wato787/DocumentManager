import classNames from "classnames";
import Link from "next/link";
import React, { ReactElement } from "react";
import Image from "next/image";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
const navigationItems = [
  {
    href: { pathname: "/", query: { current: "dashboard" } },
    label: "ダッシュボード",
    icon: <DashboardIcon color="primary" />,
    labelEn: "dashboard",
  },
  {
    href: { pathname: "/graph", query: { current: "graph" } },
    label: "グラフ",
    icon: <BarChartIcon color="primary" />,
    labelEn: "graph",
  },
  {
    href: {
      pathname: "/detail",
      query: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        current: "detail",
      },
    },
    label: "月別の詳細",
    icon: <PieChartIcon color="primary" />,
    labelEn: "detail",
  },
  {
    href: {
      pathname: "/history",
      query: {
        current: "history",
      },
    },
    label: "履歴",
    icon: <HistoryIcon color="primary" />,
    labelEn: "history",
  },
  {
    href: { pathname: "/setting", query: { current: "setting" } },
    label: "設定 ＆ 管理",
    icon: <SettingsIcon color="primary" />,
    labelEn: "setting",
  },
];

const PageSideBar = (): ReactElement => {
  // const PageSideBar = ({ current }: Current): ReactElement => {
  return (
    <>
      <div className="z-10 flex h-16 items-center justify-around border-b">
        <Image src="/logo.png" width={40} height={20} alt="doc" />
      </div>

      {navigationItems.map((item) => (
        <Link
          key={item.label}
          className={classNames(
            "hover:bg-white relative flex w-full items-center border-b px-4 py-5",
            // !open && "justify-center",
            // current === item.labelEn ||
            //   (!current && item.labelEn === "dashboard")
            //   ? "bg-white"
            //   : "",
          )}
          href={item.href}
        >
          {item.icon}
        </Link>
      ))}
    </>
  );
};

export default PageSideBar;
