import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'
import { Spin, message, Form, Icon, Input, Button, Row, Col } from 'antd'
import { fetchLogin, userInfo } from 'actions/common'
// antd Form的item用法
const FormItem = Form.Item;
// connect方法用于从UI组件（下面的Login组件，只负责 UI 的呈现）自动生成容器组件（括号里的方法，负责管理数据和逻辑）
@connect((state, props) => ({
  config: state.config, // config.js里面的配置
  loginResponse: state.tabListResult, // reducer里面的action
}))
// 为Login组件生成表单,经Form.create()包装过的组件会自带this.props.form属性，直接传给Form即可
@Form.create({
  // 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
  onFieldsChange(props, items) {
    // console.log(items)
    // props.cacheSearch(items);
  },
})

export default class Login extends Component {
  // 初始化页面常量、绑定事件方法
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this)
    this.checkPass = this.checkPass.bind(this);
    this.checkName = this.checkName.bind(this);
    this.noop = this.noop.bind(this);
  }
  // 提交处理方法
  handleSubmit(e) {
    e.preventDefault();
    // validateFields:校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    // 用法：this.props.form.validateFields([fieldNames: string[]], options: object, callback: Function(errors, values))
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.state.loading = true
        // console.log(values)
        this.setState({
          loading: true
        })
        // values={username:"xxx",password:"xxx"}
        Object.keys(values).map(key => values[key] = (values[key] && values[key].trim()));
        this.props.dispatch(fetchLogin(values, (res) => {
          console.log(res);
          message.success(res.msg);
          if (res.status === 1) {
            // const query = this.props.form.getFieldsValue()
            // global.gconfig.staff = res.data.user
            // sessionStorage.setItem('staff', JSON.stringify({ ...res.data.user }))
            sessionStorage.setItem('token', res.data.token);
            // sessionStorage.setItem('isLeftNavMini', false)
            hashHistory.push('/')
            this.props.dispatch(userInfo(values, (response) => {
              console.log(response)
              sessionStorage.setItem('token', response.data.token)
              hashHistory.push('/')
            }, (response) => {
              message.warning(response)
            }))
          }
        }, (res) => {
          console.log(res);
          message.warning(res.msg);
          this.setState({
            loading: false
          })
        }))
        // sessionStorage.setItem('token', 'dupi');
        // hashHistory.push('/')
      }
    })
  }

  // handleChange(e) {
  //   const newState = {}
  //   newState[e.target.name] = e.target.value
  //   this.setState(newState)
  // }

  // 组件已经加载到dom中
  componentDidMount() {
    // this.props.dispatch(fetchLogin({ currentPage: 1 }))
  }

  checkName = (rule, value, callback) => {
    // const { validateFields } = this.props.form
    if (value) {
      // validateFields([''])
    }
    callback()
  }

  checkPass = (rule, value, callback) => {
    // const { validateFields } = this.props.form
    if (value) {
      // validateFields([''])
    }
    callback()
  }

  noop = () => false;
  // hasFeedback:配合validateStatus属性(可选'success' 'warning' 'error' 'validating')使用，展示校验状态图标，建议只配合 Input 组件使用
  // getFieldDecorator(id, options):
  // 1. id:必填,输入控件唯一标志
  // Link:允许用户浏览应用的主要方式。<Link> 以适当的 href 去渲染一个可访问的锚标签
  render() {
    const { getFieldDecorator } = this.props.form; // getFieldDecorator是this.props.form提供的API,用于和表单进行双向绑定
    return (
      <div className="login">
        <div className="sy_top" />
        <div className="btmLogin">
          <div className="sy_bottom">
            <h1 id="PerformName">登录</h1>
            <Row className="ul-wrap">
              <Col span={24}>
                <Spin spinning={this.state.loading}>
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem hasFeedback>
                      {getFieldDecorator('username', {
                        rules: [
                          { required: true, message: '请输入用户名' },
                          { validator: this.checkName }, // 自定义校验,function(rule, value, callback)（注意，callback 必须被调用）
                          // { pattern: regExpConfig.IDcardTrim, message: '身份证号格式不正确' }
                        ],
                        // validateTrigger: 'onBlur',
                      })(<Input
                        prefix={<Icon type="user" style={{ fontSize: 13 }} />} // 前缀图标
                        placeholder="请输入用户名"
                        type="text"
                      />)}
                    </FormItem>
                    <FormItem hasFeedback>
                      {getFieldDecorator('password', {
                        rules: [
                          { required: true, message: '请输入密码' },
                          // { pattern: regExpConfig.pwd, message: '密码只能是6-16个数字或者字母组成' }
                        ],
                        // validateTrigger: 'onBlur',
                      })(<Input
                        prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                        placeholder="请输入密码"
                        type="password"
                      />)}
                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit">登录</Button>
                      <Link to="/register">注册</Link>
                    </FormItem>
                  </Form>
                </Spin>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
