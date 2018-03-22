import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { Menu, Dropdown, Button, Modal, message } from 'antd'

const { confirm } = Modal;

@connect((state, props) => ({ config: state.config }))
export default class Header extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      staff: {
        onlineCount: '',
        monthCount: '',
        usertable: JSON.parse(sessionStorage.getItem('staff')),
      },
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  // 登出
  handleLogout() {
    const self = this;
    // const config=this.props.config;
    confirm({
      title: '提示',
      content: '确认退出登录吗？',
      onOk() {
        // self.props.dispatch(fetchLogout({}, (result) => {
        //   // console.log(result)
        //   if (result.status == 1) {
        //     config.staff = {}
        //     hashHistory.push('/login')
        //   } else {
        //     message.error(result.msg)
        //   }
        // }))
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('staff');
        hashHistory.push('/login');
      },
    })
  }
  render() {
    const { staff } = this.state;
    const menu = (
      <Menu className="nav-dropmenu">
        <Menu.Item key="0">
          <span className="label">用户姓名</span><span>{staff.usertable.username}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <span className="label">所属单位</span><span>{staff.usertable.gxdwqc}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <span className="label">手机长号</span><span>{staff.usertable.longmobile}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <span className="label">邮箱</span><span>{staff.usertable.post}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4">
          <span className="label">手机短号</span><span>{staff.usertable.shortmobile}</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Button type="primary" size="small" onClick={this.handleLogout}>退出登录</Button>
        </Menu.Item>
      </Menu>
    );
    return (
      <header id="navbar">
        <div id="navbar-container" className="boxed">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <div className="brand-title">
                <span className="brand-text">后台管理系统</span>
              </div>
            </Link>
          </div>

          <div className="navbar-content clearfix">
            <ul className="nav navbar-top-links pull-right">
              <li className="login-info">
                <Dropdown overlay={menu} trigger={['hover']}>
                  <a className="ant-dropdown-link">{staff.usertable.username}</a>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}
