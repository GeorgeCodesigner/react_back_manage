// 主页右半部分的控制
import React, { Component } from 'react'
import { bindActionCreators } from 'redux' // 通过dispatch将action包裹起来，这样可以通过bindActionCreators创建的方法，直接调用dispatch(action)
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux' // 包括push,replace,go,goForward,goBack方法
import { is } from 'immutable' // Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。
import { Tabs } from 'antd'
import { updateTabChecked, deleteTabFromList } from 'actions/tabList'

const { TabPane } = Tabs;

@connect(
  //tabListResult刚开始取的是reducers/tabList.js里面的initialState;后面点击菜单以及菜单之间切换时state会更新，从而使得tabListResult取的是state
  (state, props) => ({ tabList: state.tabListResult }),
  dispatch => ({
    actions: bindActionCreators(routerActions, dispatch),
    dispatch: dispatch,
  }),
)
export default class TabList extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  componentDidMount() {
    // console.log('this.props', this.props);
  }
  onChange(activeKey) {
    const { actions } = this.props;
    this.props.dispatch(updateTabChecked({ activeKey: activeKey }));
    actions.push(activeKey); // 这里调的是routerActions里面的push方法
  }
  onEdit(targetKey, action) {
    this[action](targetKey);
  }
  // tab删除按钮点击触发函数，跟在onEdit下面，固定格式
  remove(targetKey) {
    const { actions } = this.props;
    this.props.dispatch(deleteTabFromList({ actions: actions, targetKey: targetKey }));
  }
  // 接收到新的props的时候才重新渲染
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
      return true;
    }
    for(const key in nextProps) {
      // Immutable.is对两个对象进行值比较，只比较值
      if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    return false;
  }
  render() {
    const { tabList } = this.props;
    // console.log(tabList);
    return (
      <Tabs
        hideAdd // 不赋值说明是true，表示隐藏加号图标
        onChange={this.onChange} // 切换面板的回调
        activeKey={tabList.activeKey} // 当前激活 tab 面板的 key
        type="editable-card"
        onEdit={this.onEdit} // 新增和删除页签的回调
      >
        {
          tabList.list.map(tab =>
            <TabPane tab={tab.title} key={tab.key}>{tab.content}</TabPane> // tab.content没东西
          )
        }
      </Tabs>
    )
  }
}
