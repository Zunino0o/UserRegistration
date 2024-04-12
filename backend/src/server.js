const app = require('./index.js');
const ip = require('ip');
const logger = require('./utils/logger.js');

const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, () => {
    logger.info(`Server running on http://${ip.address()}:${PORT}`);
  });