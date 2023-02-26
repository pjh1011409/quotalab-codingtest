import { rest } from 'msw';

const stakeholders = [
  {
    name: '김대표',
    stockType: '보통주',
    stockAmount: 272301,
    stockPrice: 100,
    grantedAt: new Date('2018-02-01'),
  },
  {
    name: '박이사',
    stockType: '보통주',
    stockAmount: 132442,
    stockPrice: 100,
    grantedAt: new Date('2018-02-11'),
  },
  {
    name: '최이사',
    stockType: '보통주',
    stockAmount: 132024,
    stockPrice: 100,
    grantedAt: new Date('2018-02-11'),
  },
  {
    name: '스플래시 초기투자조합 1호',
    stockType: '상환전환우선주',
    stockAmount: 3829,
    stockPrice: 17250,
    grantedAt: new Date('2018-06-02'),
  },
  {
    name: '주식회사 앤트웍스',
    stockType: '상환우선주',
    stockAmount: 7329,
    stockPrice: 17250,
    grantedAt: new Date('2018-06-11'),
  },
  {
    name: '가온-미래성장동력조합 2호',
    stockType: '상환전환우선주',
    stockAmount: 2093,
    stockPrice: 17250,
    grantedAt: new Date('2018-07-18'),
  },
  {
    name: '익명의 개인투자자',
    stockType: '보통주',
    stockAmount: 2530,
    stockPrice: 53090,
    grantedAt: new Date('2018-12-11'),
  },
  {
    name: '하드락 성장나눔펀드 3호',
    stockType: '전환우선주',
    stockAmount: 898,
    stockPrice: 53090,
    grantedAt: new Date('2019-01-28'),
  },
];

const delay = milliseconds =>
  new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const fetchStakeholders = async (_, res, ctx) => {
  await delay(getRandomNumber(100, 600));
  return res(ctx.status(200), ctx.json(stakeholders));
};

export const createStakeholder = async (req, res, ctx) => {
  const stakeholderName = req.body.name;
  const stockType = req.body.stockType;
  const stockAmount = req.body.stockAmount;

  if (stakeholderName == null || stockType == null || stockAmount == null) {
    return res(ctx.status(400, '필수 값이 입력되지 않았어요'));
  }

  await delay(getRandomNumber(500, 1000));

  const newStakeholder = {
    name: stakeholderName,
    stockType,
    stockAmount: Number(stockAmount),
    stockPrice: 120000,
    grantedAt: new Date(),
  };

  stakeholders.push(newStakeholder);

  return res(ctx.status(201), ctx.json(newStakeholder));
};

export const fetchCompanyInfo = async (_, res, ctx) => {
  await delay(getRandomNumber(100, 600));
  return res(
    ctx.status(200),
    ctx.json({
      name: '주식회사 벨코즈',
      totalStockAmount: stakeholders.reduce((result, current) => (result += current.stockAmount), 0),
    })
  );
};

export const handlers = [
  rest.get('/stakeholders', fetchStakeholders),
  rest.post('/stakeholders', createStakeholder),
  rest.get('/my/companies', fetchCompanyInfo),
];
