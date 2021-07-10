import { injectable } from 'tsyringe';
import VerEx from 'verbal-expressions';

@injectable()
export class RegExpVerEx {
  urlRegExp(): RegExp {
    return VerEx().startOfLine().then('http').maybe('s').then('://').maybe('www.').anythingBut(' ').endOfLine();
  }
}
