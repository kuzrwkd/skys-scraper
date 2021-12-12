import {
  CreateTableCommand,
  CreateTableCommandInput,
  DeleteTableCommand,
  DeleteTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import { dynamodb } from '@/Tools/Utility/DynamoDBClient';
import { inject, injectable } from 'tsyringe';

@injectable()
class MediaOrganizationSeed {
  private logger: Lib.Logger;

  constructor(@inject('LogTool') private logTool: Tools.ILogTool) {
    this.logger = this.logTool.createLogger();
  }

  async seed() {
    // TODO: 後でやる
  }
}

export default MediaOrganizationSeed;
