import path from 'path';
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '/@universal/configs');

import 'dotenv/config';
import App from '@/app';

import BillingRoute from './route/billing.route';

const app = new App([new BillingRoute()]);

app.listen();
