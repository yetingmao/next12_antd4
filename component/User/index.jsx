import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dropdown, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
// import Image from "next/image";
import styles from "./User.module.scss";
import { Util } from "/utils";
export default function User(props) {
  const router = useRouter();
  const [username, setUsername] = useState();
  useEffect(() => {
    const username = window.localStorage.getItem("username");
    if (username) {
      setUsername(username);
    } else {
      logout();
    }
  }, []);
  const menu = (
    <Menu className="li_menu">
      <Menu.ItemGroup title="用户中心" className="menu_group">
        <Menu.Item key="name">你好 - {username}</Menu.Item>
        <Menu.Item key="logout">
          <span
            onClick={() => {
              logout();
            }}
          >
            退出登录
          </span>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
  const login = (
    <Dropdown overlay={menu}>
      <img src="/img/defaultUser.jpg" />
    </Dropdown>
  );
  return (
    <div className={styles.user}>
      <div
        className={styles.trigger}
        onClick={() => {
          toggle();
        }}
      >
        {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className={styles.info}>
        <ul className={styles.ul}>
          <li className={styles.li}>{login}</li>
        </ul>
      </div>
    </div>
  );
  function toggle() {
    props.onToggle();
  }
  function logout() {
    window.localStorage.clear();
    // router.push("/login");
    props.out();
  }
}
