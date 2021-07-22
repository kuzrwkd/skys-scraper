/**
 * Nodejs core
 */
import http from 'http';

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
