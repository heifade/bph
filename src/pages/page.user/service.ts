import reqwest from 'reqwest';

export async function fetchList(pars) {
  const res = await reqwest({
    url: '/api/fetchUsr',
    method: 'GET',
    data: {
      results: pars.pageSize,
      page: pars.pageIndex,
      ...pars,
    },
  });

  return res;
}
