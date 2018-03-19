import { useRouterHistory } from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'

// export default useRouterHistory(createHashHistory)()
// createHashHistory使得路由通过URL的hash部分（#）切换方式（如：example.com/#/some/path）进行
const history = useRouterHistory(createHashHistory)({});
export default history
