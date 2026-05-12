  # ວິທີການເຊື່ອມຕໍ່ Firebase (Firebase Setup Guide)

  ເພື່ອໃຫ້ລະບົບ **LTC WorkFlow** ສາມາດນຳໃຊ້ໄດ້ຈິງ, ທ່ານຈຳເປັນຕ້ອງມີໂຄງການ Firebase ຂອງຕົນເອງ. ປະຕິບັດຕາມຂັ້ນຕອນລຸ່ມນີ້:

  ## 1. ສ້າງ Project ໃນ Firebase
  1. ເຂົ້າໄປທີ່ [Firebase Console](https://console.firebase.google.com/).
  2. ກົດ **Add project** ແລະ ຕັ້ງຊື່ໂຄງການຂອງທ່ານ.
  3. ເມື່ອສ້າງແລ້ວ, ໃຫ້ກົດທີ່ໄອຄອນ **Web (</>)** ເພື່ອລົງທະບຽນ App.
  4. ກ໋ອບປີ້ (Copy) ຄ່າ `firebaseConfig` ທີ່ໄດ້ມາ.

  ## 2. ຕັ້ງຄ່າ .env.local
  ເປີດໄຟລ໌ `.env.local` ໃນໂຟນເດີຫຼັກ ແລະ ປ່ຽນຄ່າເຫຼົ່ານີ້ໃຫ້ເປັນຂໍ້ມູນຂອງທ່ານ:

  ```env
  NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
  NEXT_PUBLIC_FIREBASE_APP_ID=...
  ```

  ## 3. ສ້າງ Firestore Database
  1. ໃນເມນູດ້ານຊ້າຍ, ເລືອກ **Build > Firestore Database**.
  2. ກົດ **Create database**.
  3. ເລືອກ **Start in test mode** (ເພື່ອໃຫ້ສາມາດຂຽນຂໍ້ມູນໄດ້ທັນທີໃນຕອນທົດສອບ).
  4. ເລືອກ Location ເປັນ **asia-southeast1 (Singapore)**.

  ## 4. ຕັ້ງຄ່າ Security Rules (ສຳຄັນ)
  ເມື່ອທ່ານພ້ອມທີ່ຈະໃຊ້ງານຈິງ (Production), ໃຫ້ປ່ຽນ **Rules** ໃຫ້ເປັນດັ່ງນີ້:

  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /submissions/{docId} {
        // ອະນຸຍາດໃຫ້ທຸກຄົນສົ່ງຟອມໄດ້
        allow create: if true;
        
        // ອະນຸຍາດໃຫ້ Admin ອ່ານ, ແກ້ໄຂ ແລະ ລົບ (ສຳລັບການເລີ່ມຕົ້ນ)
        allow read, update, delete: if true; 
      }
    }
  }
  ```

  ## 5. ການໃຊ້ງານ Admin
  - **Username**: `admin`
  - **Password**: `LTC@admin2026`
  (ທ່ານສາມາດປ່ຽນໄດ້ໃນ `src/app/admin/page.tsx` ແຖວທີ 61)

  ---
  **ໝາຍເຫດ**: ຫາກທ່ານມີບັນຫາໃນການເຊື່ອມຕໍ່, ກະລຸນາແຈ້ງໃຫ້ຂ້ອຍຊາບ!
