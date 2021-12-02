import React, { useState } from "react";
import { Nav, User } from ".";
import { Layout } from "antd";
import Head from 'next/head'
const { Sider, Content } = Layout;

export default function (props) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="layout" style={{ minHeight: "100vh" }}>
            <Head>
                <title>Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Sider collapsible trigger={null} collapsed={collapsed}>
                <Nav collapsed={collapsed} />
            </Sider>
            <Layout>
                <User collapsed={collapsed} onToggle={toggle} />
                <Content >{props.children}</Content>
            </Layout>
        </Layout>
    );
    function toggle() {
        setCollapsed(!collapsed);
    }
}
