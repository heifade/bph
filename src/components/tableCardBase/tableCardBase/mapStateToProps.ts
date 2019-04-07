export function tableCardBaseMapStateToProps(pars: any, namespace: string) {
  return {
    tableCardState: pars[namespace],
    fetchListLoading: pars.loading.effects[`${namespace}/onFetchListBase`],
    fetchDetailLoading: pars.loading.effects[`${namespace}/onOpenDetailBase`],
  };
}
