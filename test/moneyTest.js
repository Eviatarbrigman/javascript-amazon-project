import { formatCurency } from '../scripts/utils/money.js';

console.log('test suite: formatCurrency');

console.log('converts cents into dollars');
formatCurency(2095) === '20.95' ? console.log('passed') : console.log('failed');

console.log('works with 0');
formatCurency(0) === '0.00' ? console.log('passed') : console.log('failed');

console.log('rounds up to the nearest cent');
formatCurency(2000.5) === '20.02'
  ? console.log('passed')
  : console.log('failed');
