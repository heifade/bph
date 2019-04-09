import { mergeModel, createBaseModel } from '@/index';
import { IAction } from '@/interface/iAction';
import mockdata from '../mockdata/mockdata';

export const NAMESPACE_TABLE2 = 'page.table.card.test.table2';

interface ITable2State {
  keywords: string;
  visible: boolean;
}

const model = mergeModel(createBaseModel(NAMESPACE_TABLE2), {
  namespace: NAMESPACE_TABLE2,
  state: {},
  effects: {
    *onFetchList(action: IAction, { call, put, select }) {
      const keywords = yield select(state => state[NAMESPACE_TABLE2].keywords);
      return mockdata;
    },
    *onFetchDetail(action: IAction, { call, put }) {
      return mockdata.rows[0];
    },
    *onShowTable(action: IAction, { call, put }) {
      yield yield put({
        type: 'onSetConditionExtend',
        payload: {
          diagramConfigurationId2: action.payload.diagramConfigurationId,
        },
      });
      yield yield put({
        type: 'onSearchBase',
        payload: {
          data: action.payload,
        },
      });
    },
  },
  reducers: {
    // onShowTable(state: ITable2State, action: IAction) {
    //   state.keywords = action.payload.diagramConfigurationId;
    //   state.visible = true;
    // },
  },
});

export default model;
