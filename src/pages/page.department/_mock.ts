import moment from 'moment';

function generateUser(num: number) {
  return Array.from({ length: num }).map((h, i) => {
    return {
      id: i,
      name: `部门${i}`,
      createDate: moment()
        .add('day', i)
        .format('YYYY-MM-DD HH:mm:ss'),
    };
  });
}

export default {
  // 获取过程详情
  'GET /api/fetchDepartment': (req, res) => {
    res.send({
      success: true,
      rows: generateUser(10),
      rowCount: 10,
    });
  },
};
