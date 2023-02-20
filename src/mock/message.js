import Mock from 'mockjs';
import qs from 'query-string';
import avatar1 from '../assets/avatar/avatar1.png';
import avatar2 from '../assets/avatar/avatar2.png';
import avatar3 from '../assets/avatar/avatar3.png';
import avatar4 from '../assets/avatar/avatar4.png';
Mock.mock('/api/message', 'post', {
  code: 0,
  msg: '',
  data: {
    id: '@guid',
    nickname: '@cname',
    content: '@cparagraph(1, 10)',
    createDate: Date.now(),
    'avatar|1': [avatar1, avatar2, avatar3, avatar4],
  },
});

Mock.mock(/^\/api\/message\/?(\?.+)$/, 'get', function (option) {
  const query = qs.parse(option.url);
  return Mock.mock({
    code: 0,
    msg: '',
    data: {
      // "total|1000-2000": 0,
      total: 22,
      [`rows|${query.limit || 10}`]: [
        {
          id: '@guid',
          nickname: '@cname',
          content: '@cparagraph(1, 10)',
          createDate: Date.now(),
          'avatar|1': [avatar1, avatar2, avatar3, avatar4],
        },
      ],
    },
  });
});
