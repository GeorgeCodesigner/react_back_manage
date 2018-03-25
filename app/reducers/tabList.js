import { handleActions } from 'redux-actions' // handleActions用来将所有的action集中在一起处理
// import { hasResponseError } from 'utils'

const tabList = JSON.parse(sessionStorage.getItem('tabList'));

const initialState = {
  list: tabList ? tabList.list : [],
  activeKey: tabList ? tabList.activeKey : '', // 当前选中的tab的key
};

const tabListResult = handleActions({
  'request tab list'(state, action) {
    return { ...state, loading: true }
  },
  // 更新tablist并保存在sessionStorage中所用到的语句
  'update tab list'(state, action) {
    const data = action.payload; // payload是一个对象，用作Action携带数据的载体
    const findList = state.list.find(tab => tab.key === data.key);
    const list = findList === undefined ? [...state.list, data] : state.list;
    sessionStorage.setItem('tabList', JSON.stringify({ list, activeKey: data.key, loading: false }));
    return { list, activeKey: data.key, loading: false }
  },
  // 右半部分tab之间的切换用到的语句
  'update tab checked'(state, action) {
    const { activeKey } = action.payload;
    sessionStorage.setItem('tabList', JSON.stringify({ ...state, activeKey, loading: false }));
    return { ...state, activeKey, loading: false }
  },
  // 点击右半部分tab删除按钮用到的语句
  'delete tab from list'(state, action) {
    const { actions, targetKey } = action.payload;
    const list = [];
    let delIndex = 0;
    let { activeKey } = state;
    state.list.map((tab, index) => {
      tab.key === targetKey ? delIndex = index : list.push(tab);
    });
    // 删除的是当前处于active状态的tab处理的情况
    if (state.activeKey === targetKey) {
      activeKey = list[delIndex] ? list[delIndex].key :
        (list[delIndex - 1] ? list[delIndex - 1].key : '');
      actions.push(activeKey);
    }
    sessionStorage.setItem('tabList', JSON.stringify({ list, activeKey, loading: false }));
    return { list, activeKey, loading: false }
  },
}, initialState);

export { tabListResult as default }
