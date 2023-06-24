export default [
  {
    path: "/index",
    title: "Dashborad",
    name: "dashborad",
    icon: "icon-dashboard",
    parentPath: "",
    children: [
      {
        parentPath: "/index",
        path: "/index/index",
        title: "首页",
        name: "Index",
      },
    ],
  },
  {
    path: "/table",
    title: "Table",
    name: "Table",
    icon: "icon-table",
    parentPath: "",
    children: [
      {
        parentPath: "/table",
        path: "/table/menu",
        title: "菜单",
        name: "TableMenu",
      },
    ],
  },
];
