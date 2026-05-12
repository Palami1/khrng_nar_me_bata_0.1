@echo off
echo Starting Vercel configuration... > vercel_log.txt
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production ltc-workflow --yes >> vercel_log.txt 2>&1
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production ltc-workflow.firebasestorage.app --yes >> vercel_log.txt 2>&1
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production 837786875425 --yes >> vercel_log.txt 2>&1
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production 1:837786875425:web:fbea0ba24cd7afde039560 --yes >> vercel_log.txt 2>&1
vercel --prod --yes >> vercel_log.txt 2>&1
echo Finished. >> vercel_log.txt
