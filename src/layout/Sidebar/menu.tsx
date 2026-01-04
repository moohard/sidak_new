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
            path: "/pegawai",
            active: false,
            permission: "pegawai:view"
        },
        {
            title: "Absensi",
            icon: "calendar",
            type: "link",
            path: "/absensi",
            active: false,
            permission: "absensi:view"
        }
    ]
  },
  {
    title: "RBAC",
    menucontent: "Access Control",
    Items: [
        {
            title: "Manajemen Role",
            icon: "shield",
            type: "link",
            path: "/admin/rbac/roles",
            active: false,
            permission: "rbac:view"
        },
        {
            title: "Manajemen User",
            icon: "users",
            type: "link",
            path: "/admin/users",
            active: false,
            permission: "users:view"
        }
    ]
  }
];
