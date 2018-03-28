import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
// import { routerActions } from 'react-router-redux'
import { Menu, Icon, Spin } from 'antd'
import { updateTabList } from 'actions/tabList'

const { SubMenu } = Menu;

@connect((state, props) => ({
  config: state.config,
}))
export default class LeftNav extends Component {
  constructor(props, context) {
    super(props, context);
    const { pathname } = props.location; // 来自base/index.js中组件的属性
    this.state = {
      // current: pathname, // 当前的二级菜单(没用到)
      openKeys: [], // 默认展开key=0的拥有submenu的主菜单项(也就是第一个一级菜单)
      isLeftNavMini: false,
      collapsed: false, // true表示二级菜单是收起状态且不能展开，false表示展开状态且可以展开
    };
    this._handleClick = this._handleClick.bind(this);
    this._handleToggle = this._handleToggle.bind(this);
    this.navMini = this.navMini.bind(this);
    this.renderLeftNav = this.renderLeftNav.bind(this);
  }
  componentWillMount() {
    // // 初始化左侧菜单是mini模式还是正常模式
    // if (sessionStorage.getItem('isLeftNavMini') === 'false') {
    //   this.setState({
    //     isLeftNavMini: false,
    //     collapsed: false,
    //   })
    // }
    // if (sessionStorage.getItem('isLeftNavMini') === 'true') {
    //   this.setState({
    //     isLeftNavMini: true,
    //     collapsed: true,
    //   })
    // }
    const menu = window.gconfig.nav;
    const curPath = `${this.props.location.pathname.replace('/', '')}`;
    // console.log(curPath)
    let len = 0;
    let curSub = 0;
    // 一级菜单遍历
    menu.map((item) => {
      if (item.url && curPath === item.url) {
        curSub = len
      } else if (item.children && item.children.length > 0) {
        // 二级菜单遍历
        item.children.map((record) => {
          if (curPath === record.url) {
            curSub = len
          }
        })
      }
      len++
    });
    // console.log(curSub);
    this.setState({
      openKeys: [`sub${curSub}`],
    })
  }
  _handleClick = (e) => {
    // console.log(e); // e是点击事件
    hashHistory.push(e.key);
    // 更新tablist并保存在sessionStorage中，content没有内容。为了每次刷新时主页右半部分的tab页显示正确
    this.props.dispatch(updateTabList({ title: e.item.props.name, content: '', key: e.key }));
  };
  _handleToggle = (openKeys) => {
    const { state } = this;
    // console.log(state.openKeys); // 传参openKeys是Menu的openKeys属性
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1)); // 最近打开的key(必须是手动点击打开的)
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1)); // 最近关闭的key(必须是手动点击关闭的)
    let nextOpenKeys = [];
    if (latestOpenKey) {
      // nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
      nextOpenKeys = [].concat(latestOpenKey);
    }
    // if (latestCloseKey) {
    //   nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    // }
    this.setState({ openKeys: nextOpenKeys });
  };
  // getAncestorKeys = (key) => {
  //   const map = {
  //     sub3: ['sub2'],
  //   };
  //   return map[key] || [];
  // };
  // 左侧菜单切换显示mini模式或正常模式
  navMini = () => {
    this.setState({
      isLeftNavMini: !this.state.isLeftNavMini,
      collapsed: !this.state.collapsed,
    }, () => {
      // console.log(this.state.isLeftNavMini)
      this.props.leftNavMode(this.state.isLeftNavMini);
      if (this.state.isLeftNavMini === false) {
        this.setState({
          openKeys: ['sub0'],
        })
      }
    })
  };
  // 二级菜单的生成
  renderLeftNav(options) {
    const self = this;
    return options.map((item, index) => {
      // 没有二级菜单时
      if (!item.children) {
        return (
          // <SubMenu key={index} title={item.name}>
          <Menu.Item key={item.url ? item.url : item.id} name={item.name}>
            <Icon type={item.icon} title={item.name} />
            <span className="menu-name">{item.name}</span>
          </Menu.Item>
          // </SubMenu>
        )
      }
      // 有二级菜单时
      return (
        <SubMenu key={`sub${index}`}
          title={
            <span>
              <Icon type="caret-up" title={item.name} />
              <span className="menu-name">{item.name}</span>
            </span>}
        >
          {
            item.url ?
              <Menu.Item key={item.url} name={item.name}>
                <Icon type={item.icon} title={item.name} />
                <span className="menu-name">{item.name}</span>
              </Menu.Item> : null
          }

          {
            item.children && item.children.length > 0 ? self.renderLeftNav(item.children) : null
          }
        </SubMenu>
      )
    })
  }
  render() {
    const selectedKeys = [this.props.location.pathname.replace('/', '')]; // 每次选择二级菜单都会渲染一次
    // console.log(selectedKeys);
    return (
      <div className={this.state.isLeftNavMini ? 'LeftNavMini' : ''}>
        <nav id="mainnav-container" className="mainnav-container">
          <div className="LeftNav-control" onClick={() => this.navMini()}>
            <i className="qqbicon qqbicon-navcontrol" />
          </div>
          <Spin spinning={false}>
            <Menu onClick={this._handleClick} // 点击 MenuItem 调用此函数
              theme="dark"
              openKeys={this.state.openKeys} // 当前展开的 SubMenu 菜单项 key 数组，即哪个SubMenu被展开
              onOpenChange={this._handleToggle} // SubMenu 展开/关闭的回调
              selectedKeys={selectedKeys} // 当前选中的菜单项 key 数组，即选中项被标出不一样的效果
              mode="inline" // 内嵌模式的菜单
              inlineIndent="12" // inline 模式的菜单缩进宽度
              inlineCollapsed={this.state.collapsed}
            >
              {this.renderLeftNav(this.props.config.nav || [])}
            </Menu>
          </Spin>
        </nav>
      </div>
    )
  }
}
