import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import SignupCentered from "views/auth/signup";
import Manager from "views/manager";
import TickBlue from "views/support/tickblue";
import messenger from "views/messenger/App";
import CallVideo from "views/call/callVideo";
import LiveStream from "views/livestream/liveStream";
import UpdateInfo from "views/update/UpdateInfo";
const routes = [
  {
    name: "Trang Chủ",
    layout: "/admin",
    path: "/home",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: NFTMarketplace,
  },
  // {
  //   name: "Top GenzLove",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  {
    name: "Trang Cá Nhân",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Đăng Nhập",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  {
    name: "Đăng Kí",
    layout: "/auth",
    path: "/sign-up",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignupCentered,
  },
  {
    name: "Quản Trị",
    layout: "/manager",
    path: "/settings",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: Manager,
  },
  {
    name: "Đơn Hỗ Trợ",
    layout: "/support",
    path: "/tickblue",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: TickBlue,
  },
  {
    name: "Messenger",
    layout: "/messenger",
    path: "/chat",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: messenger,
  },
  {
    name: "CallVideo",
    layout: "/call",
    path: "/video",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: CallVideo,
  },
  {
    name: "LiveStream",
    layout: "/livestream",
    path: "/call",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: CallVideo,
  },
  {
    name: "Update",
    layout: "/update",
    path: "/info",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: UpdateInfo,
  },
];

export default routes;
