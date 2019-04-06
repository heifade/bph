import { mergeModel, createBaseModel } from '@/components/index';
import { IAction } from '@/components/interface/iAction';
import mockdata from '../mockdata/mockdata';

export const NAMESPACE_TABLE1 = 'page.table.card.test.table1';

const model = mergeModel(createBaseModel(NAMESPACE_TABLE1), {
  namespace: NAMESPACE_TABLE1,
  state: {},
  effects: {
    *onFetchList(action: IAction, { call, put }) {
      return mockdata;
    },
    *onFetchDetail(action: IAction, { call, put }) {
      return mockdata.rows[0];
    }
  },
  reducers: {},
});

export default model;
