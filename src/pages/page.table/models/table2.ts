import { mergeModel, createBaseModel } from '@/components/index';
import { IAction } from '@/components/interface/iAction';
import mockdata from '../mockdata/mockdata';

export const NAMESPACE_TABLE2 = 'page.table.card.test.table2';

const model = mergeModel(createBaseModel(NAMESPACE_TABLE2), {
  namespace: NAMESPACE_TABLE2,
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
