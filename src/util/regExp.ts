/**
 * Lib
 */
import VerEx from 'verbal-expressions';

const urlRegExp = (): RegExp => {
  return VerEx().startOfLine().then('http').maybe('s').then('://').maybe('www.').anythingBut(' ').endOfLine();
};
