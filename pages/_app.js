import "styles/globals.css";
import "antd/dist/antd.css";
import { useRouter, withRouter } from "next/router";
import { useState, useEffect } from "react";
import App from "next/app";
import { Logged } from "component";
import Login from "./login";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    //next默认服务端渲染 页面加载之前获取不到window
    if (getLogin()) {
      setIsLogin(true);
      //   router.beforePopState(({ url, as, options }) => {
      //     // I only want to allow these two routes!
      //     if (as !== "/" && as !== "/other") {
      //       // Have SSR render bad routes as a 404.
      //       //console.log("isLogin", Component, pageProps);
      //       console.log("as", as);
      //       window.location.href = as;
      //       return false;
      //     }
      //     return true;
      //   });
    }
  }, []);

  const logined = () => {
    setIsLogin(true);
  };

  const logout = () => {
    router.push("/login");
    setIsLogin(false);
  };
  return (
    <>
      {isLogin ? (
        <Logged logout={logout}>
          <Component {...pageProps} />
        </Logged>
      ) : (
        <Login logined={logined} {...pageProps} />
      )}
    </>
  );

  function getLogin() {
    return window.localStorage.getItem("token") ? true : false;
  }
}
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }
// MyApp.getInitialProps = async (appContext) => {
//   const { asPath, pathname } = appContext.router;
//   console.log("process.browser", process.browser);
//   if (asPath !== "/" && asPath !== "/login") {
//     if (process.browser) {
//       window.location.href = asPath;
//     }
//   }

//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps };
// };
export default MyApp;
