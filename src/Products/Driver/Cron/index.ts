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
import toolsContainer from '@/Tools/Containers/ToolsContainer';

const dateTool = toolsContainer.resolve<Tools.IDateTool>('DateTool');
const logTool = toolsContainer.resolve<Tools.ILogTool>('LogTool');

const utcDate = dateTool.getUtc();
const minutes = dateTool.formatMinutesNoZeroPadding(utcDate);
const logger = logTool.createLogger();

if (process.env.NODE_ENV !== 'development') {
  // 3で割り切れる`分`の時以外は起動させない（3分, 6分, 9分, 12分, ..., 57分）
  if (Number(minutes) % 3 !== 0) {
    console.log(`current minutes is ${minutes}, not running.`);
    process.exit(0);
  }
}

const postData = {
  data: [
    {
      organizationId: 1,
      url: 'https://www.nikkei.com/news/category/economy/',
    },
    {
      organizationId: 1,
      url: 'https://www.nikkei.com/news/category/politics/',
    },
    {
      organizationId: 1,
      url: 'https://www.nikkei.com/news/category/business/',
    },
    {
      organizationId: 1,
      url: 'https://www.nikkei.com/news/category/financial/',
    },
    {
      organizationId: 1,
      url: 'https://www.nikkei.com/news/category/markets/',
    },
    {
      organizationId: 1,
      url: 'https://www.nikkei.com/news/category/technology/',
    },
    {
      organizationId: 1,
      url: 'https://www.nikkei.com/news/category/international/',
    },
    {
      organizationId: 1,
      url: 'https://www.nikkei.com/news/category/society/',
    },
  ],
};

const postDataStr = JSON.stringify(postData);

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

logger.info('バッチ処理開始', logTool.getStartParams<typeof postData>({ tracking_id: 'cron', request_body: postData }));
const startTime = dateTool.processStartTime();
const req = http.request(options, (res) => {
  const chunks: string[] = [];
  res.on('data', (chunk) => {
    chunks.push(chunk);
  });

  res.on('end', () => {
    const body = chunks.join(',');
    const endTime = dateTool.processEndTime(startTime);
    logger.info(
      'バッチ処理終了',
      logTool.getSuccessParams<typeof body>({ tracking_id: 'cron', time: endTime, response_body: body }),
    );
  });
});

req.write(postDataStr);
req.end();
