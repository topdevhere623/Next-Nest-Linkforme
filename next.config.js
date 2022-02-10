const path = require('path');

module.exports = {
  basePath: process.env.BASE_PATH,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/client/styles')],
  },
  images: {
    domains: ['localhost', 'branch.linkmefor.com', 'linkmefor.com'],
  },
};
