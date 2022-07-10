import path from 'path';
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '/@universal/configs');

import 'dotenv/config';
import App from '@/app';

const app = new App();

app.listen();
