import '../styles/globals.css'
import 'antd/dist/antd.css'
import { withRouter } from 'next/router'



function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} />)
}

export default withRouter(MyApp)
