export function editorBaseMapStateToProps(pars: any, namespace: string) {
  return {
    tableCardState: pars[namespace],
    saveLoading: pars.loading.effects[`${namespace}/onSave`],
  };
}
