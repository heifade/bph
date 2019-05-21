import reqwest from 'reqwest';

export async function fetchDepartment(pars) {
  const res = await reqwest({
    url: '/api/fetchDepartment',
    method: 'GET',
    data: pars
  });

  return res;
}
