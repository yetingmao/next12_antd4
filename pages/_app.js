import 'styles/globals.css'
import 'antd/dist/antd.css'
import { withRouter } from 'next/router'
import { useState, useEffect } from 'react';
// function MyApp({ Component, pageProps }) {
//   const getLayout = Component.getLayout || ((page) => page)
//   return getLayout(<Component {...pageProps} />)
// }

// export default withRouter(MyApp)

import { Logged } from "component";
import Login from "./login"


export default function MyApp({ Component, pageProps }) {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    //next默认服务端渲染 页面加载之前获取不到window
    setIsLogin(getLogin());
  }, [])

  const logined = () => {
    setIsLogin(true)
  }
  return (
    <>
      {
        isLogin
          ?
          <Logged >
            <Component {...pageProps} />
          </Logged>
          :
          <Login logined={logined} {...pageProps} />
      }
    </>
  )
  function getLogin() {
    return window.localStorage.getItem("token") ? true : false
  }
}