export function tableCardBaseMapStateToProps(pars: any, namespace: string) {
  return {
    tableCardState: pars[namespace],
    fetchListLoading: pars.loading.effects[`${namespace}/onFetchList`],
    fetchDetailLoading: pars.loading.effects[`${namespace}/onFetchDetail`],
  };
}
