const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

console.log(`👀 Starting watcher for ${targetFile}...`);

fs.watchFile(targetFile, { interval: 1000 }, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        console.log('🔄 data.js changed. Updating formsConfig.ts...');
        exec('node data.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Error logic: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`⚠️ Stderr: ${stderr}`);
                return;
            }
            console.log(`✅ Success: ${stdout.trim()}`);
        });
    }
});
