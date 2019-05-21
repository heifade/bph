import reqwest from 'reqwest';

export async function fetchList(pars) {
  const res = await reqwest({
    url: '/api/fetchUsr',
    method: 'GET',
    data: pars,
  });

  return res;
}
