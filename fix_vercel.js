const { execSync } = require('child_process');
const fs = require('fs');

const logFile = 'vercel_log.txt';
fs.writeFileSync(logFile, 'Starting Vercel configuration...\n');

const commands = [
    'vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production ltc-workflow.firebasestorage.app --yes',
    'vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production 837786875425 --yes',
    'vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production 1:837786875425:web:fbea0ba24cd7afde039560 --yes',
    'vercel --prod --yes'
];

commands.forEach(cmd => {
    try {
        fs.appendFileSync(logFile, `Running: ${cmd}\n`);
        const output = execSync(cmd, { stdio: 'pipe' }).toString();
        fs.appendFileSync(logFile, `Output:\n${output}\n`);
    } catch (error) {
        fs.appendFileSync(logFile, `Error running ${cmd}:\n${error.message}\n${error.stdout ? error.stdout.toString() : ''}\n${error.stderr ? error.stderr.toString() : ''}\n`);
    }
});

fs.appendFileSync(logFile, 'Finished.\n');
console.log('Done. Check vercel_log.txt');
