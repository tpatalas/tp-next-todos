const fs = require('fs');

const version = Date.now().toString();
const filePath = './public/service-worker.js';

fs.readFile(filePath, 'utf8', (error, data) => {
  if (error) {
    throw error;
  }

  const updatedData = data.replace(/const version = '[^']+';/, `const version = 'v${version}';`);

  fs.writeFile(filePath, updatedData, 'utf8', (error) => {
    if (error) {
      throw error;
    }
    console.log('service-worker version updated successfully!');
  });
});
