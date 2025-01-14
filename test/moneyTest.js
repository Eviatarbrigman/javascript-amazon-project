import { formatCurency } from '../scripts/utils/money.js';

formatCurency(2095) === '20.95' ? console.log('passed') : console.log('failed');

formatCurency(0) === '0.00' ? console.log('passed') : console.log('failed');

formatCurency(2000.5) === '20.01'
  ? console.log('passed')
  : console.log('failed');
