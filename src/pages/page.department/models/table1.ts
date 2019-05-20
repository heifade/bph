import { mergeModel, createBaseModel } from '@/index';
import { IAction } from '@/interface/iAction';
import mockdata from '../mockdata/mockdata';
import { delay } from 'q';

export const NAMESPACE_TABLE1 = 'page.table.card.test.table1';

const model = mergeModel(createBaseModel(NAMESPACE_TABLE1), {
  namespace: NAMESPACE_TABLE1,
  state: {
    sorts: [{ field: 'gmtCreate', type: 'DESC' }],
  },
  effects: {
    *onFetchList(action: IAction, { call, put }) {
      yield call(delay, 500);
      console.log(999, action.payload);
      return mockdata;
    },
    *onFetchDetail(action: IAction, { call, put }) {
      yield call(delay, 500);
      return action.payload;
    },
    *onSave(action: IAction, { call, put }) {
    },
    *onDelete(action: IAction, { call, put }) {
      yield undefined;
    },
    *onDownload(action: IAction, { call, put }) {
      yield undefined;
    },
  },
  reducers: {},
});

export default model;
