import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "antd";
import { ToolOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "./Nav.module.scss";
const menus = [
  {
    title: "基础设置",
    icon: <ToolOutlined />,
    key: "base",
    subs: [
      { key: "/base/role", title: "角色管理" },
      { key: "/base/user", title: "用户管理" },
    ],
  },
];

export default function (props) {
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setselectedKeys] = useState([]);
  const router = useRouter();
  useEffect(() => {
    //防止页面刷新侧边栏又初始化了
    const pathname = router.pathname;
    //获取当前所在的目录层级
    const rank = pathname.split("/");
    switch (rank.length) {
      case 2: //一级目录
        setselectedKeys([pathname]);
        break;
      case 4: //三级目录，要展开两个subMenu
        setOpenKeys([rank.slice(0, 2).join("/"), rank.slice(0, 3).join("/")]);
        setselectedKeys([pathname]);
        break;
      default:
        setOpenKeys([pathname.substr(0, pathname.lastIndexOf("/"))]);
        setselectedKeys([pathname]);
    }
  }, []);
  useEffect(() => {
    setselectedKeys([router.pathname]);
  }, [router.pathname]);

  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <div className={styles.text}>
          {props.collapsed ? (
            <div className={styles.min}>NEXT服务</div>
          ) : (
            "NEXT服务系统"
          )}
        </div>
      </div>
      <Menu
        style={{ fontSize: "16px" }}
        onOpenChange={(openKeys) => {
          onOpenChange(openKeys);
        }}
        onClick={({ key }) => setselectedKeys([key])}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        theme="dark"
        mode="inline"
      >
        {menus &&
          menus.map((item) => {
            return item.subs && item.subs.length > 0
              ? renderSubMenu(item)
              : renderMenuItem(item);
          })}
      </Menu>
    </div>
  );
  function onOpenChange(openKeys) {
    //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
    if (openKeys.length === 0 || openKeys.length === 1) {
      setOpenKeys(openKeys);
      return;
    }

    //最新展开的菜单
    const latestOpenKey = openKeys[openKeys.length - 1];
    //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
    //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
    //只适用于3级菜单
    if (latestOpenKey.includes(openKeys[0])) {
      setOpenKeys(openKeys);
    } else {
      setOpenKeys([latestOpenKey]);
    }
  }
  function renderMenuItem({ key, icon, title }) {
    return (
      <Menu.Item key={key} icon={icon}>
        <Link href={key}>
          <span>{title}</span>
        </Link>
      </Menu.Item>
    );
  }
  function renderSubMenu({ key, icon, title, subs }) {
    return (
      <Menu.SubMenu
        key={key}
        icon={icon ? icon : ""}
        title={<span>{title}</span>}
      >
        {subs &&
          subs.map((item) => {
            return item.subs && item.subs.length > 0
              ? renderSubMenu(item)
              : renderMenuItem(item);
          })}
      </Menu.SubMenu>
    );
  }
}
