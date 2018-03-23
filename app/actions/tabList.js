// 将reducers/tabList.js里面的handleActions的各个action在这里注册生成
import { createAction } from 'redux-actions'

export const requestTabList = createAction('request tab list');
export const updateTabList = createAction('update tab list');
export const updateTabChecked = createAction('update tab checked');
export const deleteTabFromList = createAction('delete tab from list');
