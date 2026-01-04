import { sidebarMenuType } from "Types/LayoutDataType";

export const MenuList: sidebarMenuType[] = [
  {
    title: "General",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Dashboards",
        id: 1,
        icon: "home",
        pathSlice: "dashboard",
        type: "sub",
        badge: "badge badge-light-primary",
        badgetxt: "8",
        children: [
          { path: "/dashboard/default", title: "Default", type: "link" },
        ],
      },
    ],
  },
  {
    title: "Kepegawaian",
    menucontent: "Data Kepegawaian",
    Items: [
        {
            title: "Data Pegawai",
            icon: "user",
            type: "link",
            path: "/kepegawaian/data-pegawai", // Placeholder path
            active: false,
        }
    ]
  }
];
