import moment from 'moment';

function generateUser(num: number) {
  return Array.from({ length: num }).map((h, i) => {
    return {
      id: i,
      name: `姓名${i}`,
      email: `email${i}@126.com`,
      department: `${i}`,
      createDate: moment()
        .add('day', i)
        .format('YYYY-MM-DD HH:mm:ss'),
    };
  });
}

export default {
  // 获取过程详情
  'GET /api/fetchUsr': (req, res) => {
    const {
      query: {
        match: { params },
      },
    } = req;

    const { department } = params;

    let list: any[] = [];
    if (department !== '') {
      list = generateUser(10).filter(h => h.department === department);
    } else {
      list = generateUser(10);
    }

    res.send({
      success: true,
      rows: list,
      rowCount: list.length,
    });
  },
};
