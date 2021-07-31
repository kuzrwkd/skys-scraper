/**
 * Node
 */
import http from 'http';

/**
 * Lib
 */
import 'reflect-metadata';

/**
 * Tools import
 */
import { container } from '@/Tools/Containers/Tools';

const dateTool = container.resolve<Tools.IDateTool>('DateTool');
const utcDate = dateTool.getUtc();
const minutes = dateTool.formatMinutesNoZeroPadding(utcDate);

// 3で割り切れる`分`の時以外は起動させない（3分, 6分, 9分, 12分, ..., 57分）
if (Number(minutes) % 3 !== 0) {
  console.log(`Current minutes is ${minutes}, not running.`);
  process.exit(0);
}

const postDataStr = JSON.stringify({
  data: [
    {
      organizationId: 1,
      contentsId: 1,
      url: 'https://www.nikkei.com/news/category/economy/',
    },
    {
      organizationId: 1,
      contentsId: 2,
      url: 'https://www.nikkei.com/news/category/politics/',
    },
    {
      organizationId: 1,
      contentsId: 3,
      url: 'https://www.nikkei.com/news/category/business/',
    },
    {
      organizationId: 1,
      contentsId: 4,
      url: 'https://www.nikkei.com/news/category/financial/',
    },
    {
      organizationId: 1,
      contentsId: 5,
      url: 'https://www.nikkei.com/news/category/markets/',
    },
    {
      organizationId: 1,
      contentsId: 6,
      url: 'https://www.nikkei.com/news/category/technology/',
    },
    {
      organizationId: 1,
      contentsId: 7,
      url: 'https://www.nikkei.com/news/category/international/',
    },
    {
      organizationId: 1,
      contentsId: 8,
      url: 'https://www.nikkei.com/news/category/society/',
    },
  ],
});

const options = {
  host: 'localhost',
  port: 3000,
  path: '/newsfeed',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postDataStr),
  },
};

const req = http.request(options, (res) => {
  const chunks: string[] = [];
  res.on('data', (chunk) => {
    chunks.push(chunk);
  });

  res.on('end', () => {
    const body = chunks.join(',');
    console.log(body);
  });
});

req.write(postDataStr);
req.end();
