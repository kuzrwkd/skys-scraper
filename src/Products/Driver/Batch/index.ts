/**
 * Nodejs core
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

const dayJs = container.resolve<Tools.IDateTool>('DateTool');
const utcDate = dayJs.getUtc();
const minutes = dayJs.formatMinutesNoZeroPadding(utcDate);

// 3で割り切れる`分`の時以外は起動させない（3分, 6分, 9分, 12分, ..., 57分）
if (Number(minutes) % 3 !== 0) {
  console.log(`Current minutes is ${minutes}, not running.`);
  process.exit(0);
}

const postDataStr = JSON.stringify({
  organizationId: 1,
  contentsId: 1,
  url: [
    'https://www.nikkei.com/news/category/financial/',
    'https://www.nikkei.com/news/category/markets/',
    'https://www.nikkei.com/news/category/technology/',
    'https://www.nikkei.com/news/category/international/',
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
