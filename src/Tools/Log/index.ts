import { createLogger, format, transports } from 'winston';
import { injectable } from 'tsyringe';
import os from 'os';
import { LOG_TYPE } from '@/Tools/Constants/Logger';

@injectable()
export class Log {
  private logProperties = {
    type: '', // 処理種別
    endpoint: '', // アクセスされたAPIエンドポイント
    api_req_param: '', // エンドポイントへ送られたリクエストパラメーター
    api_res_param: '', // リクエストに対して返却したレスポンスパラメーター
    api_status: '', // リクエストに対して返却したstatus
    api_call_timeout: '', // リクエストを受け取ってレスポンスを返すまでの時間
    crawling_url: '', // クローリングをするURL
    crawling_result: '', // クローリングで取得した結果（DBに保存できるレベルの粒度）
    crawling_time: '', // クローリングを開始して結果を取得できるまでの時間
    method: '', // 実行したメソッド名
    exception_class: '', // 実行された例外クラス
    stacktrace: '', // 例外時のスタックトレース
  };

  logFormat = format((info) => {
    info.level = info.level.toUpperCase();
    return info;
  });

  crawlingStart(url) {
    return {
      type: LOG_TYPE.START_CRAWLING,
      crawling_url: url,
      method: '',
    };
  }

  crawlingSuccess(url, result) {
    return {
      type: LOG_TYPE.SUCCESS_CRAWLING,
      crawling_url: url,
      method: '',
      crawling_result: result,
      crawling_time: '',
    };
  }

  crawlingFailed(url, result) {
    return {
      type: LOG_TYPE.FAILED_CRAWLING,
      crawling_url: url,
      method: '',
      crawling_result: result,
      crawling_time: '',
      exception_class: '',
      stacktrace: '',
    };
  }

  get createLogger() {
    return createLogger({
      format: format.combine(this.logFormat(), format.timestamp(), format.json()),
      defaultMeta: {
        hostname: os.hostname(),
      },
      transports: [new transports.Console()],
    });
  }
}
