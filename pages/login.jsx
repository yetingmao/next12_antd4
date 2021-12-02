import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Checkbox } from "antd";
import { login } from "../api";
import { message } from "antd";
import styles from "../styles/Login.module.scss";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    window.localStorage.clear();
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.title}>NEXT后台管理系统</div>
        <div className={styles.data}>
          <h3 className={styles.title}>登录</h3>
          <Form
            name="login"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input size="large" placeholder="用户名" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password size="large" type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 4, span: 20 }}
            >
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
          <div className={styles.footer}>
            <div>欢迎登陆NEXT后台管理系统</div>
          </div>
        </div>
      </div>
    </div>
  );
  async function handleSubmit(values) {
    const body = {
      username: values.username,
      password: values.password,
    };
    const data = await login(body);
    if (!data || data.code !== 200) {
      message.error("登陆失败");
      return;
    }
    const { token } = data;
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("username", values.username);
    router.push("/");
  }
}
