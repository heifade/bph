import { mergeModel, createBaseModel } from '@/index';
import { IAction } from '@/interface/iAction';
import mockdata from '../mockdata/mockdata';
import { delay } from 'q';

export const NAMESPACE_TABLE1 = 'page.table.card.test.user.table1';

const model = mergeModel(createBaseModel(NAMESPACE_TABLE1), {
  namespace: NAMESPACE_TABLE1,
  state: {
    sorts: [
      { field: 'createDate', type: 'DESC' }
    ],
    condition: {
      keyword2: 'default',
    },
  },
  effects: {
    *onFetchList(action: IAction, { call, put }) {
      yield call(delay, 500);
      return mockdata;
    },
    *onFetchDetail(action: IAction, { call, put }) {
      yield call(delay, 500);
      return action.payload;
    },
    *onSave(action: IAction, { call, put }) {
      yield undefined;
    },
    *onDelete(action: IAction, { call, put }) {
      yield undefined;
    },
    *onDownload(action: IAction, { call, put }) {
      yield undefined;
    },
  },
  reducers: {

  },
});

export default model;
