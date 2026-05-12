const fs = require('fs');

const FORM_MASTER = {
  "FORM_01": {
    name: "ແບບຟອມຂໍເຮັດໃບຢັ້ງຢືນພະນັກງານ ແລະ ເງິນເດືອນ",
    file: "1. ແບບຟອມຂໍເຮັດໃບຢັ້ງຢືນພະນັກງານ ແລະ ເງິນເດືອນ.pdf",
    fields: [
      { id: "empId", label: "ລະຫັດພະນັກງານ", type: "text" },
      { id: "nameLao", label: "ຊື່ ແລະ ນາມສະກຸນ (Lao)", type: "text" },
      { id: "nameEng", label: "Name and Surname (Eng)", type: "text" },
      { id: "deptLao", label: "ພະແນກ/ລລທ ສາຂາແຂວງ (Lao)", type: "text" },
      { id: "deptEng", label: "Department/Branch (Eng)", type: "text" },
      { id: "sectorLao", label: "ພາກສ່ວນ (Lao)", type: "text" },
      { id: "sectorEng", label: "Sector (Eng)", type: "text" },
      { id: "unitLao", label: "ໜ່ວຍງານ (Lao)", type: "text" },
      { id: "unitEng", label: "Unit (Eng)", type: "text" },
      { id: "posLao", label: "ຕຳແໜ່ງ (Lao)", type: "text" },
      { id: "posEng", label: "Position (Eng)", type: "text" },
      { id: "cert_emp", label: "ພະນັກງານ", type: "checkbox" },
      { id: "cert_salary", label: "ເງິນເດືອນ", type: "checkbox" },
      { id: "lang_lao", label: "ພາສາລາວ", type: "checkbox" },
      { id: "lang_eng", label: "ພາສາອັງກິດ", type: "checkbox" },
      { id: "visa_tourist_cb", label: "ວີຊ່າທ່ອງທ່ຽວ (Check)", type: "checkbox", hidden: true },
      { id: "visa_tourist", label: "ວີຊ່າທ່ອງທ່ຽວ (ລະບຸປະເທດ)", type: "text" },
      { id: "visa_study_cb", label: "ວີຊ່າສຶກສາຕໍ່ (Check)", type: "checkbox", hidden: true },
      { id: "visa_study", label: "ວີຊ່າສຶກສາຕໍ່ (ລະບຸປະເທດ)", type: "text" },
      { id: "census", label: "ເຮັດສຳມະໂນຄົວ", type: "checkbox" },
      { id: "id_card", label: "ເຮັດບັດປະຈຳຕົວ", type: "checkbox" },
      { id: "other_purpose_cb", label: "ອື່ນໆ (Check)", type: "checkbox", hidden: true },
      { id: "other_purpose", label: "ອື່ນໆ (ລະບຸ)", type: "text" }
    ],
    coords: {
      empId: { x: 473, y: 607 },
      nameLao: { x: 220, y: 533 },
      nameEng: { x: 420, y: 533 },
      deptLao: { x: 220, y: 503 },
      deptEng: { x: 420, y: 503 },
      sectorLao: { x: 220, y: 475 },
      sectorEng: { x: 420, y: 475 },
      unitLao: { x: 220, y: 445 },
      unitEng: { x: 420, y: 445 },
      posLao: { x: 220, y: 413 },
      posEng: { x: 420, y: 413 },
      cert_emp: { x: 258, y: 346 },
      cert_salary: { x: 395, y: 346 },
      lang_lao: { x: 258, y: 320 },
      lang_eng: { x: 395, y: 320 },
      visa_tourist_cb: { x: 205, y: 295 },
      visa_tourist: { x: 325, y: 297 },
      visa_study_cb: { x: 392, y: 295 },
      visa_study: { x: 501, y: 297 },
      census: { x: 78, y: 268 },
      id_card: { x: 205, y: 268 },
      other_purpose_cb: { x: 393, y: 268 },
      other_purpose: { x: 440, y: 270 }
    }
  },
  "FORM_02": {
    name: "ແບບຟອມການກຳນົດຕຳແໜ່ງງານ",
    file: "2. ແບບຟອມການກຳນົດຕຳແໜ່ງງານ.pdf",
    fields: [
      { id: "sector", label: "1.1 ຂະແໜງ", type: "text" },
      { id: "dept", label: "1.2 ພະແນກ/ລລທ ສາຂາແຂວງ", type: "text" },
      { id: "part", label: "1.3 ພາກສ່ວນ", type: "text" },
      { id: "unit", label: "1.4 ໜ່ວຍງານ", type: "text" },
      { id: "pos_name", label: "2. ແຈ້ງຊື່ຕຳແໜ່ງທີ່ສະເໜີກຳນົດ", type: "text" },
      { id: "report_to", label: "1. ຂຶ້ນກັບ ຫຼື ລາຍງານຕໍ່ (ຕຳແໜ່ງ)", type: "text" },
      { id: "role_main", label: "2. ບົດບາດຕົ້ນຕໍ (ຈຸດປະສົງລວມ)", type: "textarea" },
      { id: "duty_main", label: "1. ໜ້າທີ່ ແລະ ຄວາມຮັບຜິດຊອບຕົ້ນຕໍ (ບັງຄັບ)", type: "textarea" },
      { id: "duty_other", label: "2. ໜ້າທີ່ ແລະ ຄວາມຮັບຜິດຊອບອື່ນໆ (ຖ້າມີ)", type: "textarea" },
      { id: "relation", label: "3. ການພົວພັນ ແລະ ການປະສານງານ", type: "textarea" },
      { id: "scope", label: "4. ຂອບເຂດສິດ (ການຕັດສິນໃຈ)", type: "textarea" },
      { id: "edu_level", label: "1. ລະດັບການສຶກສາທີ່ຕ້ອງການ", type: "text" },
      { id: "gender", label: "2. ເພດ (ຊາຍ, ຍິງ ຫຼື ໄດ້ທັງສອງ)", type: "text" },
      { id: "major", label: "3. ປະເພດວິຊາ ຫຼື ສາຂາວິຊາທີ່ຮຽນມາ", type: "text" },
      { id: "experience", label: "4. ຄວາມຮູ້, ຄວາມສາມາດ ແລະ ປະສົບການ", type: "textarea" },
      { id: "other_condition", label: "5. ເງື່ອນໄຂອື່ນໆ (ຖ້າມີ)", type: "textarea" },
      { id: "creator_name", label: "ຊື່ ແລະ ນາມສະກຸນ (ຜູ້ຂຽນ)", type: "text" },
      { id: "creator_pos", label: "ຕຳແໜ່ງ (ຜູ້ຂຽນ)", type: "text" },
      { id: "creator_date", label: "ວັນທີ, ເດືອນ, ປີ (ຜູ້ຂຽນ)", type: "text" },
      { id: "approver_name", label: "ຊື່ ແລະ ນາມສະກຸນ (ຜູ້ຮັບຮູ້)", type: "text" },
      { id: "approver_pos", label: "ຕຳແໜ່ງ (ຜູ້ຮັບຮູ້)", type: "text" },
      { id: "approver_date", label: "ວັນທີ, ເດືອນ, ປີ (ຜູ້ຮັບຮູ້)", type: "text" }
    ],
    coords: {
      sector: { x: 190, y: 720 },
      dept: { x: 235, y: 698 },
      part: { x: 190, y: 676 },
      unit: { x: 190, y: 654 },
      pos_name: { x: 105, y: 608 },
      report_to: { x: 190, y: 555 },
      role_main: { x: 105, y: 520 },
      duty_main: { x: 105, y: 445 },
      duty_other: { x: 105, y: 380 },
      relation: { x: 105, y: 315 },
      scope: { x: 105, y: 250 },
      edu_level: { x: 215, y: 185 },
      gender: { x: 155, y: 163 },
      major: { x: 255, y: 141 },
      experience: { x: 105, y: 115 },
      other_condition: { x: 105, y: 60 },
      creator_name: { x: 220, y: 755 },
      creator_pos: { x: 220, y: 730 },
      creator_date: { x: 220, y: 705 },
      approver_name: { x: 220, y: 620 },
      approver_pos: { x: 220, y: 595 },
      approver_date: { x: 220, y: 570 }
    }
  },
  "FORM_03": {
    name: "ຂໍ້ຕົກລົງຫ້າມເປີດເຜີຍຄວາມລັບ (NDA)",
    file: "3. ຂໍ້ຕົກລົງຫ້າມເປີດເຜີຍຄວາມລັບ.pdf",
    contract_content: {
      title: "ຂໍ້ຕົກລົງວ່າດ້ວຍການຮັກສາຄວາມລັບ ແລະ ຄວາມປອດໄພຂອງຂໍ້ມູນ",
      intro: "ຂ້າພະເຈົ້າ ຜູ້ທີ່ມີລາຍຊື່ຂ້າງລຸ່ມນີ້ ຂໍໃຫ້ຄຳໝັ້ນສັນຍາ ແລະ ເຫັນດີປະຕິບັດຕາມເງື່ອນໄຂ ດັ່ງນີ້:",
      sections: [
        "I. ການເຂົ້າເຖິງຂໍ້ມູນ (Access Information): (A) ຂ້າພະເຈົ້າຈະເຂົ້າເຖິງຂໍ້ມູນຕາມສິດທີ່ໄດ້ຮັບອະນຸຍາດ...",
        "II. ການຮັກສາຄວາມລັບ (Confidentiality): (B) ຂ້າພະເຈົ້າຈະບໍ່ເປີດເຜີຍຂໍ້ມູນໃດໆ ໃຫ້ບຸກຄົນພາຍນອກ...",
        "III. ຄວາມປອດໄພຂອງລະບົບ (System Security): (C) ຂ້າພະເຈົ້າຈະຮັກສາລະຫັດຜ່ານເປັນຄວາມລັບ...",
        "IV. ມາດຕະການລົງໂທດ (Sanctions): (D) ຫາກລະເມີດ ຂ້າພະເຈົ້າຈະຮັບຜິດຊອບທາງດ້ານກົດໝາຍ..."
      ]
    },
    fields: [
      { id: "ref_no", label: "ເລກທີ (Ref No.)", type: "text", placeholder: "....../ລລທ" },
      { id: "place_date", label: "ສະຖານທີ່/ວັນທີ", type: "text", placeholder: "ນະຄອນຫຼວງວຽງຈັນ, ວັນທີ..." },
      { id: "is_internal", label: "☐ ພະນັກງານ ພາຍໃນ", type: "checkbox" },
      { id: "is_external", label: "☐ ບຸກຄົນ ພາຍນອກ", type: "checkbox" },
      { id: "int_name", label: "1. ທ່ານ/ນາງ (ພາຍໃນ)", type: "text" },
      { id: "int_emp_id", label: "ລະຫັດພະນັກງານ", type: "text" },
      { id: "int_village", label: "ບ້ານ", type: "text" },
      { id: "int_district", label: "ເມືອງ", type: "text" },
      { id: "int_province", label: "ແຂວງ", type: "text" },
      { id: "int_house_no", label: "ເຮືອນເລກທີ", type: "text" },
      { id: "int_unit", label: "ໜ່ວຍ", type: "text" },
      { id: "int_id_card", label: "ຖືບັດປະຈຳຕົວເລກທີ", type: "text" },
      { id: "int_id_at", label: "ອອກໃຫ້ທີ່", type: "text" },
      { id: "int_id_date", label: "ເມື່ອວັນທີ", type: "text" },
      { id: "int_id_expire", label: "ບັດໝົດອາຍຸວັນທີ", type: "text" },
      { id: "int_sector", label: "ເຮັດວຽກສັງກັດຢູ່ ໜ່ວຍງານ", type: "text" },
      { id: "int_part", label: "ພາກສ່ວນ", type: "text" },
      { id: "int_dept", label: "ພະແນກ", type: "text" },
      { id: "ext_office", label: "2. ທີ່ຕັ້ງສຳນັກງານ", type: "text" },
      { id: "ext_reg_no", label: "ຈົດທະບຽນເລກທີ", type: "text" },
      { id: "ext_reg_date", label: "ລົງວັນທີ", type: "text" },
      { id: "ext_road", label: "ຖະໜົນ", type: "text" },
      { id: "ext_village", label: "ບ້ານ (ພາຍນອກ)", type: "text" },
      { id: "ext_district", label: "ເມືອງ (ພາຍນອກ)", type: "text" },
      { id: "ext_province", label: "ແຂວງ (ພາຍນອກ)", type: "text" },
      { id: "ext_contact", label: "ເບີຕິດຕໍ່", type: "text" },
      { id: "ext_rep_name", label: "ໂດຍທ່ານ/ນາງ", type: "text" },
      { id: "ext_pos", label: "ຕຳແໜ່ງ", type: "text" },
      { id: "access_ref", label: "ໃບອະນຸຍາດຂໍໃຊ້ສິດ ເລກທີ", type: "text" },
      { id: "access_date", label: "ລົງວັນທີ (ຂໍໃຊ້ສິດ)", type: "text" },
      { id: "sign_name_confirm", label: "ລົງຊື່ຢັ້ງຢືນ (ທ່ານ/ນາງ)", type: "text" },
      { id: "org_dept_sign", label: "ພະແນກຈັດຕັ້ງ (ລົງຊື່)", type: "signature" },
      { id: "director_sign", label: "ຜູ້ອຳນວຍການໃຫຍ່ (ອະນຸມັດ)", type: "signature" }
    ],
    coords: {
      ref_no: { x: 420, y: 785 },
      place_date: { x: 400, y: 765 },
      is_internal: { x: 142, y: 683 },
      is_external: { x: 387, y: 683 },
      int_name: { x: 100, y: 638 },
      int_emp_id: { x: 325, y: 638 },
      ext_office: { x: 120, y: 463 },
      access_ref: { x: 380, y: 282 },
    }
  },
  "FORM_04": {
    name: "ແບບຟອມຂໍຂໍ້ມູນພະນັກງານ ລລທ",
    file: "4. ແບບຟອມຂໍຂໍ້ມູນພະນັກງານ ລລທ (1).pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ ແລະ ນາມສະກຸນ", type: "text" },
      { id: "empId", label: "ລະຫັດພະນັກງານ", type: "text" },
      { id: "pos", label: "ຕຳແໜ່ງ", type: "text" },
      { id: "dept", label: "ພະແນກ", type: "text" },
      { id: "phone", label: "ເບີໂທ", type: "text" },
      { id: "infoDetail", label: "ລາຍລະອຽດຂໍ້ມູນທີ່ຕ້ອງການ", type: "textarea" }
    ],
    coords: { nameLao: { x: 140, y: 710 }, empId: { x: 140, y: 685 }, pos: { x: 140, y: 660 } }
  },
  "FORM_05": {
    name: "ແບບຟອມຂໍອອະນຸມັດສ້າງຄອບຄົວໃໝ່",
    file: "5. ແບບຟອມຂໍອະນຸມັດສ້າງຄອບຄົວໃໝ່.pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ ແລະ ນາມສະກຸນ", type: "text" },
      { id: "empId", label: "ລະຫັດພະນັກງານ", type: "text" },
      { id: "dob", label: "ວັນເດືອນປີເກີດ", type: "date" },
      { id: "partnerName", label: "ຊື່ຄູ່ສົມລົດ", type: "text" },
      { id: "marriageDate", label: "ວັນທີຈະແຕ່ງງານ", type: "date" }
    ],
    coords: { nameLao: { x: 150, y: 650 }, empId: { x: 350, y: 650 }, dob: { x: 150, y: 625 } }
  },
  "FORM_06": {
    name: "ແບບຟອມຂໍແຈ້ງການຍົກຍ້າຍສະຖານທີ່ຢູ່ອາໃສ",
    file: "6. ແບບຟອມຂໍແຈ້ງການຍົກຍ້າຍສະຖານທີ່ຢູ່ອາໃສ.pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ ແລະ ນາມສະກຸນ", type: "text" },
      { id: "empId", label: "ລະຫັດພະນັກງານ", type: "text" },
      { id: "oldVillage", label: "ບ້ານເກົ່າ", type: "text" },
      { id: "newVillage", label: "ບ້ານໃໝ່", type: "text" },
      { id: "reason", label: "ເຫດຜົນໃນການຍົກຍ້າຍ", type: "textarea" }
    ],
    coords: { nameLao: { x: 140, y: 730 }, oldVillage: { x: 120, y: 600 }, newVillage: { x: 350, y: 600 } }
  },
  "FORM_07": {
    name: "ແບບຟອມບັນທຶກການຝຶກປະຕິບັດວຽກ (OJT)",
    file: "7. ແບບຟອມບັນທຶກການຝຶກປະຕິບັດວຽກ On the Job Training.pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ຜູ້ຖືກຝຶກວຽກ", type: "text" },
      { id: "startDate", label: "ວັນທີເຂົ້າເຮັດວຽກ", type: "date" },
      { id: "pos", label: "ຕຳແໜ່ງ", type: "text" },
      { id: "trainer", label: "ຊື່ຜູ້ສອນວຽກ", type: "text" },
      { id: "topic", label: "ຫົວຂໍ້ການຝຶກ", type: "text" }
    ],
    coords: { nameLao: { x: 160, y: 740 }, startDate: { x: 400, y: 740 }, pos: { x: 160, y: 715 } }
  },
  "FORM_08": {
    name: "ແບບຟອມປະເມີນພະນັກງານ 95% ເປັນ ຖາວອນ",
    file: "8. ແບບຟອມປະເມີນຜົນການປະຕິບັດວຽກຂອງ ພະນັກງານ 95 ເພື່ອເລື່ອນຂຶ້ນເປັນ ພະນັກງານຖາວອນ.pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ຜູ້ຖືກປະເມີນ", type: "text" },
      { id: "jobDuty", label: "ໜ້າທີ່ຮັບຜິດຊອບ", type: "textarea" },
      { id: "dateFrom", label: "ປະເມີນຕັ້ງແຕ່ວັນທີ", type: "date" },
      { id: "dateTo", label: "ເຖິງວັນທີ", type: "date" }
    ],
    coords: { nameLao: { x: 180, y: 765 }, jobDuty: { x: 180, y: 740 } }
  },
  "FORM_09": {
    name: "ແບບຟອມປະເມີນພະນັກງານສັນຍາຈ້າງ ເປັນ 95%",
    file: "9. ແບບຟອມປະເມີນຜົນການປະຕິບັດວຽກຂອງ ພະນັກງານສັນຍາຈ້າງ ເພື່ອເລື່ອນຂຶ້ນເປັນ ພະນັກງານ 95.pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ຜູ້ຖືກປະເມີນ", type: "text" },
      { id: "jobDuty", label: "ໜ້າທີ່ຮັບຜິດຊອບ", type: "textarea" },
      { id: "dateFrom", label: "ປະເມີນຕັ້ງແຕ່ວັນທີ", type: "date" },
      { id: "dateTo", label: "ເຖິງວັນທີ", type: "date" }
    ],
    coords: { nameLao: { x: 180, y: 770 }, jobDuty: { x: 180, y: 745 } }
  },
  "FORM_10": {
    name: "ໃບສຳຫຼວດຕົນເອງ",
    file: "10. ໃບສຳຫຼວດຕົນເອງ.pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ ແລະ ນາມສະກຸນ", type: "text" },
      { id: "dob", label: "ວັນເດືອນປີເກີດ", type: "date" },
      { id: "birthPlace", label: "ບ້ານເກີດ", type: "text" },
      { id: "education", label: "ລະດັບການສຶກສາ", type: "text" },
      { id: "goodPoint", label: "ດ້ານດີເປັນພື້ນຖານ", type: "textarea" },
      { id: "badPoint", label: "ດ້ານອ່ອນທີ່ຍັງຄ້າງ", type: "textarea" }
    ],
    coords: { nameLao: { x: 150, y: 780 }, dob: { x: 400, y: 780 }, birthPlace: { x: 150, y: 755 } }
  },
  "FORM_11": {
    name: "ແບບຟອມຂໍ User ເຂົ້າລະບົບສະຫຼຸບວັນງານ",
    file: "11. ແບບຟອມຂໍ User ເຂົ້າລະບົບສະຫຼຸບວັນງານ.pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ ແລະ ນາມສະກຸນ", type: "text" },
      { id: "empId", label: "ລະຫັດພະນັກງານ", type: "text" },
      { id: "pos", label: "ຕຳແໜ່ງ", type: "text" },
      { id: "dept", label: "ພະແນກ/ສາຂາ", type: "text" },
      { id: "reason", label: "ຈຸດປະສົງ ຫຼື ເຫດຜົນ", type: "textarea" }
    ],
    coords: { nameLao: { x: 150, y: 760 }, empId: { x: 350, y: 760 }, pos: { x: 150, y: 735 }, dept: { x: 350, y: 735 }, reason: { x: 150, y: 700 } }
  },
  "FORM_12": {
    name: "ແບບຟອມຂໍອະນຸມັດເອົາລູກຮັບເບ້ຍລ້ຽງ",
    file: "12.ແບບຟອມຂໍອະນຸມັດເອົາລູກຮັບເບ້ຍລ້ຽງ.pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ ແລະ ນາມສະກຸນພະນັກງານ", type: "text" },
      { id: "empId", label: "ລະຫັດພະນັກງານ", type: "text" },
      { id: "childName", label: "ຊື່ລູກ", type: "text" },
      { id: "childDob", label: "ວັນເດືອນປີເກີດລູກ", type: "date" },
      { id: "childOrder", label: "ລູກຜູ້ທີ", type: "number" }
    ],
    coords: { nameLao: { x: 150, y: 750 }, empId: { x: 350, y: 750 }, childName: { x: 150, y: 725 }, childDob: { x: 350, y: 725 }, childOrder: { x: 150, y: 700 } }
  },
  "FORM_13": {
    name: "ແບບຟອມຂໍເບີກຄ່າປິ່ນປົວພະນັກງານ ແລະ ລູກພະນັກງານ",
    file: "13. ແບບຟອມຂໍເບີກຄ່າປິ່ນປົວພະນັກງານ ແລະ ລູກພະນັກງານ.pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ ແລະ ນາມສະກຸນ", type: "text" },
      { id: "empId", label: "ລະຫັດພະນັກງານ", type: "text" },
      { id: "hospitalName", label: "ຊື່ໂຮງໝໍ/ຄລີນິກ", type: "text" },
      { id: "amount", label: "ຈຳນວນເງິນຂໍເບີກ", type: "number" },
      { id: "billCount", label: "ຈຳນວນໃບບິນ", type: "number" }
    ],
    coords: { nameLao: { x: 150, y: 740 }, empId: { x: 350, y: 740 }, hospitalName: { x: 150, y: 715 }, amount: { x: 350, y: 715 }, billCount: { x: 150, y: 690 } }
  },
  "FORM_14": {
    name: "ແບບຟອມຂໍເຮັດບັດພະນັກງານ",
    file: "14. ແບບຟອມຂໍເຮັດບັດພະນັກງານ.pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ ແລະ ນາມສະກຸນ (ລາວ)", type: "text" },
      { id: "nameEng", label: "ຊື່ ແລະ ນາມສະກຸນ (Eng)", type: "text" },
      { id: "empId", label: "ລະຫັດພະນັກງານ", type: "text" },
      { id: "phone", label: "ເບີໂທຕິດຕໍ່", type: "text" },
      { id: "reason", label: "ເຫດຜົນຂໍເຮັດບັດ", type: "text" }
    ],
    coords: { nameLao: { x: 150, y: 730 }, nameEng: { x: 150, y: 705 }, empId: { x: 350, y: 730 }, phone: { x: 350, y: 705 }, reason: { x: 150, y: 680 } }
  },
  "FORM_15": {
    name: "ແບບຟອມສັນຍາແຮງງານ ສໍາລັບ ພະນັກງານ 95%",
    file: "15. ແບບຟອມສັນຍາແຮງງານ ສໍາລັບ ພະນັກງານ 95%.pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ ແລະ ນາມສະກຸນ", type: "text" },
      { id: "village", label: "ບ້ານ", type: "text" },
      { id: "district", label: "ເມືອງ", type: "text" },
      { id: "province", label: "ແຂວງ", type: "text" },
      { id: "idCard", label: "ຖືບັດປະຈຳຕົວເລກທີ", type: "text" }
    ],
    coords: { nameLao: { x: 150, y: 720 }, village: { x: 150, y: 695 }, district: { x: 350, y: 695 }, province: { x: 150, y: 670 }, idCard: { x: 350, y: 670 } }
  },
  "FORM_16": {
    name: "ແບບຟອມລາຍງານການເສຍຊີວິດ",
    file: "16. ແບບຟອມລາຍງານການເສຍຊີວິດ.pdf",
    fields: [
      { id: "reporterName", label: "ຊື່ຜູ້ລາຍງານ", type: "text" },
      { id: "deceasedName", label: "ຊື່ຜູ້ເສຍຊີວິດ", type: "text" },
      { id: "relation", label: "ກ່ຽວພັນເປັນ", type: "text" },
      { id: "deathDate", label: "ວັນທີເສຍຊີວິດ", type: "date" },
      { id: "cause", label: "ສາເຫດ", type: "text" }
    ],
    coords: { reporterName: { x: 150, y: 710 }, deceasedName: { x: 150, y: 685 }, relation: { x: 350, y: 685 }, deathDate: { x: 150, y: 660 }, cause: { x: 350, y: 660 } }
  },
  "FORM_17": {
    name: "ແບບຟອມສັນຍາແຮງງານ ສໍາລັບ ພະນັກງານຖາວອນ",
    file: "17_gender_change.pdf",
    fields: [
      { id: "nameLao", label: "ຊື່ ແລະ ນາມສະກຸນ", type: "text" },
      { id: "empId", label: "ລະຫັດພະນັກງານ", type: "text" },
      { id: "oldGender", label: "ເພດ (ເກົ່າ)", type: "text" },
      { id: "newGender", label: "ເພດ (ໃໝ່)", type: "text" }
    ],
    coords: { nameLao: { x: 150, y: 700 }, empId: { x: 350, y: 700 }, oldGender: { x: 150, y: 675 }, newGender: { x: 350, y: 675 } }
  },
  "FORM_18": {
    name: "ແບບຟອມຂໍປ່ຽນເບີໂທລະສັບໃນລະບົບຄຸ້ມຄອງພະນັກງານ",
    file: "18_nationality_change.pdf",
    fields: [
      { id: "empId", label: "ລະຫັດພະນັກງານ", type: "text" },
      { id: "oldPhone", label: "ເບີໂທເກົ່າ", type: "text" },
      { id: "newPhone", label: "ເບີໂທໃໝ່", type: "text" }
    ],
    coords: { empId: { x: 150, y: 690 }, oldPhone: { x: 150, y: 665 }, newPhone: { x: 350, y: 665 } }
  },
  "FORM_19": {
    name: "ແບບຟອມຂໍປ່ຽນເບີໂທລະສັບເພື່ອປ່ຽນເບີຮັບນະໂຍບາຍມູນຄ່າໂທ ແລະ DATA",
    file: "19_dob_change.pdf",
    fields: [
      { id: "empId", label: "ລະຫັດພະນັກງານ", type: "text" },
      { id: "oldDob", label: "ວັນເກີດ (ເກົ່າ)", type: "date" },
      { id: "newDob", label: "ວັນເກີດ (ໃໝ່)", type: "date" }
    ],
    coords: { empId: { x: 150, y: 680 }, oldDob: { x: 150, y: 655 }, newDob: { x: 350, y: 655 } }
  },
  "FORM_20": {
    name: "ແບບຟອມສະໝັກເຂົ້າເຮັດວຽກ",
    file: "20. ແບບຟອມສະໝັກເຂົ້າເຮັດວຽກ (13).pdf",
    fields: [
      { id: "pos_applying", label: "ຕຳແໜ່ງທີ່ສະໝັກ", type: "text", section: "ຂໍ້ມູນເບື້ອງຕົ້ນ" },
      { id: "first_name", label: "ຊື່ (First Name)", type: "text", section: "ຂໍ້ມູນເບື້ອງຕົ້ນ" },
      { id: "last_name", label: "ນາມສະກຸນ (Last Name)", type: "text", section: "ຂໍ້ມູນເບື້ອງຕົ້ນ" },
      { id: "sex", label: "ເພດ", type: "text", section: "ຂໍ້ມູນເບື້ອງຕົ້ນ" },
      { id: "dob_day", label: "ວັນ (Day)", type: "text", section: "ຂໍ້ມູນເບື້ອງຕົ້ນ" },
      { id: "dob_month", label: "ເດືອນ (Month)", type: "text", section: "ຂໍ້ມູນເບື້ອງຕົ້ນ" },
      { id: "dob_year", label: "ປີ (Year)", type: "text", section: "ຂໍ້ມູນເບື້ອງຕົ້ນ" },
      { id: "age", label: "ອາຍຸ", type: "text", section: "ຂໍ້ມູນເບື້ອງຕົ້ນ" },

      { id: "nationality", label: "ສັນຊາດ", type: "text", section: "ຂໍ້ມູນຕົວຕົນ" },
      { id: "ethnicity", label: "ຊົນເຜົ່າ", type: "text", section: "ຂໍ້ມູນຕົວຕົນ" },
      { id: "religion", label: "ສາສະໜາ", type: "text", section: "ຂໍ້ມູນຕົວຕົນ" },
      { id: "id_card_no", label: "ເລກບັດປະຈຳຕົວ/ພັດສະປອດ", type: "text", section: "ຂໍ້ມູນຕົວຕົນ" },
      { id: "id_issued_at", label: "ອອກໃຫ້ທີ່", type: "text", section: "ຂໍ້ມູນຕົວຕົນ" },
      { id: "id_issued_date", label: "ວັນທີອອກບັດ", type: "text", section: "ຂໍ້ມູນຕົວຕົນ" },
      { id: "marital_single", label: "ໂສດ", type: "checkbox", section: "ຂໍ້ມູນຕົວຕົນ" },
      { id: "marital_married", label: "ແຕ່ງງານ", type: "checkbox", section: "ຂໍ້ມູນຕົວຕົນ" },
      { id: "marital_widow", label: "ໝ້າຍ", type: "checkbox", section: "ຂໍ້ມູນຕົວຕົນ" },
      { id: "marital_divorced", label: "ຢ່າຮ້າງ", type: "checkbox", section: "ຂໍ້ມູນຕົວຕົນ" },

      { id: "height", label: "ລວງສູງ (cm)", type: "text", section: "ຄຸນລັກສະນະ" },
      { id: "weight", label: "ນ້ຳໜັກ (kg)", type: "text", section: "ຄຸນລັກສະນະ" },
      { id: "blood_type", label: "ໝວດເລືອດ", type: "text", section: "ຄຸນລັກສະນະ" },

      { id: "birth_village", label: "ບ້ານເກີດ", type: "text", section: "ສະຖານທີ່ເກີດ" },
      { id: "birth_district", label: "ເມືອງ (ບ້ານເກີດ)", type: "text", section: "ສະຖານທີ່ເກີດ" },
      { id: "birth_province", label: "ແຂວງ (ບ້ານເກີດ)", type: "text", section: "ສະຖານທີ່ເກີດ" },

      { id: "curr_house_no", label: "ເຮືອນເລກທີ (ປັດຈຸບັນ)", type: "text", section: "ທີ່ຢູ່ປັດຈຸບັນ" },
      { id: "curr_unit", label: "ໜ່ວຍ (ປັດຈຸບັນ)", type: "text", section: "ທີ່ຢູ່ປັດຈຸບັນ" },
      { id: "curr_road", label: "ຖະໜົນ (ປັດຈຸບັນ)", type: "text", section: "ທີ່ຢູ່ປັດຈຸບັນ" },
      { id: "curr_village", label: "ບ້ານ (ທີ່ຢູ່ປັດຈຸບັນ)", type: "text", section: "ທີ່ຢູ່ປັດຈຸບັນ" },
      { id: "curr_district", label: "ເມືອງ (ທີ່ຢູ່ປັດຈຸບັນ)", type: "text", section: "ທີ່ຢູ່ປັດຈຸບັນ" },
      { id: "curr_province", label: "ແຂວງ (ທີ່ຢູ່ປັດຈຸບັນ)", type: "text", section: "ທີ່ຢູ່ປັດຈຸບັນ" },

      { id: "perm_village", label: "ບ້ານ (ສຳມະໂນຄົວ)", type: "text", section: "ທີ່ຢູ່ຕາມສຳມະໂນຄົວ" },
      { id: "perm_district", label: "ເມືອງ (ສຳມະໂນຄົວ)", type: "text", section: "ທີ່ຢູ່ຕາມສຳມະໂນຄົວ" },
      { id: "perm_province", label: "ແຂວງ (ສຳມະໂນຄົວ)", type: "text", section: "ທີ່ຢູ່ຕາມສຳມະໂນຄົວ" },

      { id: "phone", label: "ເບີໂທ", type: "text", section: "ຂໍ້ມູນການຕິດຕໍ່" },
      { id: "email", label: "E-Mail Address", type: "text", section: "ຂໍ້ມູນການຕິດຕໍ່" },
      { id: "edu1_school", label: "ສະຖານທີ່ຮຽນ 1", type: "text", section: "ການສຶກສາ" },
      { id: "edu1_degree", label: "ລະດັບ 1", type: "text", section: "ການສຶກສາ" },
      { id: "edu1_major", label: "ສາຂາ 1", type: "text", section: "ການສຶກສາ" },
      { id: "edu1_year", label: "ປີຈົບ 1", type: "text", section: "ການສຶກສາ" },
      { id: "edu2_school", label: "ສະຖານທີ່ຮຽນ 2", type: "text", section: "ການສຶກສາ" },
      { id: "edu2_degree", label: "ລະດັບ 2", type: "text", section: "ການສຶກສາ" },
      { id: "edu2_major", label: "ສາຂາ 2", type: "text", section: "ການສຶກສາ" },
      { id: "edu2_year", label: "ປີຈົບ 2", type: "text", section: "ການສຶກສາ" },
      { id: "edu3_school", label: "ສະຖານທີ່ຮຽນ 3", type: "text", section: "ການສຶກສາ" },
      { id: "edu3_degree", label: "ລະດັບ 3", type: "text", section: "ການສຶກສາ" },
      { id: "edu3_major", label: "ສາຂາ 3", type: "text", section: "ການສຶກສາ" },
      { id: "edu3_year", label: "ປີຈົບ 3", type: "text", section: "ການສຶກສາ" },

      { id: "train1_topic", label: "ຫົວຂໍ້ຝຶກ 1", type: "text", section: "ການຝຶກອົບຮົມ" },
      { id: "train1_by", label: "ຈັດໂດຍ 1", type: "text", section: "ການຝຶກອົບຮົມ" },
      { id: "train1_date", label: "ວັນທີ 1", type: "text", section: "ການຝຶກອົບຮົມ" },
      { id: "train1_place", label: "ສະຖານທີ່ 1", type: "text", section: "ການຝຶກອົບຮົມ" },
      { id: "train2_topic", label: "ຫົວຂໍ້ຝຶກ 2", type: "text", section: "ການຝຶກອົບຮົມ" },
      { id: "train2_by", label: "ຈັດໂດຍ 2", type: "text", section: "ການຝຶກອົບຮົມ" },
      { id: "train2_date", label: "ວັນທີ 2", type: "text", section: "ການຝຶກອົບຮົມ" },
      { id: "train2_place", label: "ສະຖານທີ່ 2", type: "text", section: "ການຝຶກອົບຮົມ" },

      { id: "com_word_vgood", label: "Word ດີຫຼາຍ", type: "checkbox", section: "ທັກສະຄອມພິວເຕີ" },
      { id: "com_word_good", label: "Word ດີ", type: "checkbox", section: "ທັກສະຄອມພິວເຕີ" },
      { id: "com_word_weak", label: "Word ອ່ອນ", type: "checkbox", section: "ທັກສະຄອມພິວເຕີ" },
      { id: "com_excel_vgood", label: "Excel ດີຫຼາຍ", type: "checkbox", section: "ທັກສະຄອມພິວເຕີ" },
      { id: "com_excel_good", label: "Excel ດີ", type: "checkbox", section: "ທັກສະຄອມພິວເຕີ" },
      { id: "com_excel_weak", label: "Excel ອ່ອນ", type: "checkbox", section: "ທັກສະຄອມພິວເຕີ" },
      { id: "com_ppt_vgood", label: "PPT ດີຫຼາຍ", type: "checkbox", section: "ທັກສະຄອມພິວເຕີ" },
      { id: "com_ppt_good", label: "PPT ດີ", type: "checkbox", section: "ທັກສະຄອມພິວເຕີ" },
      { id: "com_ppt_weak", label: "PPT ອ່ອນ", type: "checkbox", section: "ທັກສະຄອມພິວເຕີ" },
      { id: "com_other", label: "ໂປຣແກຣມອື່ນໆ", type: "text", section: "ທັກສະຄອມພິວເຕີ", colSpan: 2 },

      { id: "lang_eng_read_good", label: "ອັງກິດ ອ່ານ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_eng_read_fair", label: "ອັງກິດ ອ່ານ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_eng_read_weak", label: "ອັງກິດ ອ່ານ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_eng_write_good", label: "ອັງກິດ ຂຽນ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_eng_write_fair", label: "ອັງກິດ ຂຽນ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_eng_write_weak", label: "ອັງກິດ ຂຽນ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_eng_speak_good", label: "ອັງກິດ ເວົ້າ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_eng_speak_fair", label: "ອັງກິດ ເວົ້າ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_eng_speak_weak", label: "ອັງກິດ ເວົ້າ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },

      { id: "lang_chi_read_good", label: "ຈີນ ອ່ານ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_chi_read_fair", label: "ຈີນ ອ່ານ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_chi_read_weak", label: "ຈີນ ອ່ານ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_chi_write_good", label: "ຈີນ ຂຽນ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_chi_write_fair", label: "ຈີນ ຂຽນ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_chi_write_weak", label: "ຈີນ ຂຽນ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_chi_speak_good", label: "ຈີນ ເວົ້າ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_chi_speak_fair", label: "ຈີນ ເວົ້າ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_chi_speak_weak", label: "ຈີນ ເວົ້າ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },

      { id: "lang_vie_read_good", label: "ຫວຽດ ອ່ານ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_vie_read_fair", label: "ຫວຽດ ອ່ານ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_vie_read_weak", label: "ຫວຽດ ອ່ານ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_vie_write_good", label: "ຫວຽດ ຂຽນ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_vie_write_fair", label: "ຫວຽດ ຂຽນ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_vie_write_weak", label: "ຫວຽດ ຂຽນ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_vie_speak_good", label: "ຫວຽດ ເວົ້າ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_vie_speak_fair", label: "ຫວຽດ ເວົ້າ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_vie_speak_weak", label: "ຫວຽດ ເວົ້າ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },

      { id: "lang_hmong_read_good", label: "ມ້ງ ອ່ານ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_hmong_read_fair", label: "ມ້ງ ອ່ານ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_hmong_read_weak", label: "ມ້ງ ອ່ານ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_hmong_write_good", label: "ມ້ງ ຂຽນ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_hmong_write_fair", label: "ມ້ງ ຂຽນ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_hmong_write_weak", label: "ມ້ງ ຂຽນ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_hmong_speak_good", label: "ມ້ງ ເວົ້າ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_hmong_speak_fair", label: "ມ້ງ ເວົ້າ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_hmong_speak_weak", label: "ມ້ງ ເວົ້າ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },

      { id: "lang_other_name", label: "ພາສາອື່ນໆ", type: "text", section: "ທັກສະພາສາ", colSpan: 2 },
      { id: "lang_other_read_good", label: "ອື່ນໆ ອ່ານ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_other_read_fair", label: "ອື່ນໆ ອ່ານ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_other_read_weak", label: "ອື່ນໆ ອ່ານ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_other_write_good", label: "ອື່ນໆ ຂຽນ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_other_write_fair", label: "ອື່ນໆ ຂຽນ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_other_write_weak", label: "ອື່ນໆ ຂຽນ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_other_speak_good", label: "ອື່ນໆ ເວົ້າ ດີ", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_other_speak_fair", label: "ອື່ນໆ ເວົ້າ ພໍໃຊ້", type: "checkbox", section: "ທັກສະພາສາ" },
      { id: "lang_other_speak_weak", label: "ອື່ນໆ ເວົ້າ ອ່ອນ", type: "checkbox", section: "ທັກສະພາສາ" },

      { id: "emp1_company", label: "ບໍລິສັດ 1", type: "text", section: "ປະຫວັດການເຮັດວຽກ" },
      { id: "emp1_start", label: "ວັນເລີ່ມ 1", type: "text", section: "ປະຫວັດການເຮັດວຽກ" },
      { id: "emp1_end", label: "ວັນສີ້ນສຸດ 1", type: "text", section: "ປະຫວັດການເຮັດວຽກ" },
      { id: "emp1_pos", label: "ຕຳແໜ່ງ 1", type: "text", section: "ປະຫວັດການເຮັດວຽກ" },
      { id: "emp1_salary", label: "ເງິນເດືອນ 1", type: "text", section: "ປະຫວັດການເຮັດວຽກ" },
      { id: "emp1_reason", label: "ເຫດຜົນອອກ 1", type: "text", section: "ປະຫວັດການເຮັດວຽກ" },
      { id: "emp1_desc", label: "ໜ້າທີ່ 1", type: "textarea", section: "ປະຫວັດການເຮັດວຽກ", colSpan: 2 },

      { id: "emp2_company", label: "ບໍລິສັດ 2", type: "text", section: "ປະຫວັດການເຮັດວຽກ" },
      { id: "emp2_start", label: "ວັນເລີ່ມ 2", type: "text", section: "ປະຫວັດການເຮັດວຽກ" },
      { id: "emp2_end", label: "ວັນສີ້ນສຸດ 2", type: "text", section: "ປະຫວັດການເຮັດວຽກ" },
      { id: "emp2_pos", label: "ຕຳແໜ່ງ 2", type: "text", section: "ປະຫວັດການເຮັດວຽກ" },
      { id: "emp2_salary", label: "ເງິນເດືອນ 2", type: "text", section: "ປະຫວັດການເຮັດວຽກ" },
      { id: "emp2_reason", label: "ເຫດຜົນອອກ 2", type: "text", section: "ປະຫວັດການເຮັດວຽກ" },
      { id: "emp2_desc", label: "ໜ້າທີ່ 2", type: "textarea", section: "ປະຫວັດການເຮັດວຽກ", colSpan: 2 },

      { id: "motorbike_yes", label: "ຂັບລົດຈັກໄດ້", type: "checkbox", section: "ຂໍ້ມູນອື່ນໆ" },
      { id: "motorbike_no", label: "ຂັບລົດຈັກບໍ່ໄດ້", type: "checkbox", section: "ຂໍ້ມູນອື່ນໆ" },
      { id: "motorbike_lic_yes", label: "ໃບຂັບຂີ່ລົດຈັກ ມີ", type: "checkbox", section: "ຂໍ້ມູນອື່ນໆ" },
      { id: "motorbike_lic_no", label: "ໃບຂັບຂີ່ລົດຈັກ ບໍ່ມີ", type: "checkbox", section: "ຂໍ້ມູນອື່ນໆ" },
      { id: "car_yes", label: "ຂັບລົດໄດ້", type: "checkbox", section: "ຂໍ້ມູນອື່ນໆ" },
      { id: "car_no", label: "ຂັບລົດບໍ່ໄດ້", type: "checkbox", section: "ຂໍ້ມູນອື່ນໆ" },
      { id: "car_lic_yes", label: "ໃບຂັບຂີ່ລົດ ມີ", type: "checkbox", section: "ຂໍ້ມູນອື່ນໆ" },
      { id: "car_lic_no", label: "ໃບຂັບຂີ່ລົດ ບໍ່ມີ", type: "checkbox", section: "ຂໍ້ມູນອື່ນໆ" },
      { id: "car_lic_type", label: "ປະເພດໃບຂັບຂີ່", type: "text", section: "ຂໍ້ມູນອື່ນໆ" },
      { id: "hobbies", label: "ວຽກອະດິເລກ", type: "text", section: "ຂໍ້ມູນອື່ນໆ" },
      { id: "talents", label: "ພອນສະຫວັນພິເສດ", type: "text", section: "ຂໍ້ມູນອື່ນໆ" },
      { id: "emg_name", label: "ຊື່ຕິດຕໍ່ສຸກເສີນ", type: "text", section: "ບຸກຄົນອ້າງອີງສຸກເສີນ" },
      { id: "emg_address", label: "ທີ່ຢູ່", type: "text", section: "ບຸກຄົນອ້າງອີງສຸກເສີນ" },
      { id: "emg_phone", label: "ເບີໂທ", type: "text", section: "ບຸກຄົນອ້າງອີງສຸກເສີນ" },
      { id: "emg_relation", label: "ຄວາມສຳພັນ", type: "text", section: "ບຸກຄົນອ້າງອີງສຸກເສີນ" },
      { id: "sign_date", label: "ວັນທີລົງຊື່", type: "text", section: "ຢືນຢັນຂໍ້ມູນ" }
    ],
    coords: {
      pos_applying: { x: 270, y: 673 },
      first_name: { x: 143, y: 650 },
      last_name: { x: 439, y: 650 },
      dob_day: { x: 130, y: 630 },
      dob_month: { x: 170, y: 630 },
      dob_year: { x: 210, y: 630 },
      age: { x: 515, y: 630 },
      birth_village: { x: 160, y: 610 },
      birth_district: { x: 340, y: 610 },
      birth_province: { x: 460, y: 610 },
      curr_village: { x: 160, y: 590 },
      curr_district: { x: 340, y: 590 },
      curr_province: { x: 460, y: 590 },
      phone: { x: 160, y: 570 },
      email: { x: 340, y: 570 },
      sex: { x: 74, y: 550 },
      nationality: { x: 175, y: 550 },
      ethnicity: { x: 275, y: 550 },
      religion: { x: 360, y: 550 },
      marital_single: { x: 438, y: 550 },
      marital_married: { x: 462, y: 550 },
      marital_widow: { x: 487, y: 550 },
      marital_divorced: { x: 512, y: 550 },
      motorbike_yes: { x: 118, y: 530 },
      motorbike_no: { x: 163, y: 530 },
      motorbike_lic_yes: { x: 280, y: 530 },
      motorbike_lic_no: { x: 325, y: 530 },
      car_yes: { x: 118, y: 515 },
      car_no: { x: 163, y: 515 },
      car_lic_yes: { x: 280, y: 515 },
      car_lic_no: { x: 325, y: 515 },
      car_lic_type: { x: 380, y: 515 },
      edu1_school: { x: 45, y: 497 },
      edu1_degree: { x: 215, y: 497 },
      edu1_major: { x: 305, y: 497 },
      edu1_year: { x: 430, y: 497 },
      edu2_school: { x: 45, y: 479 },
      edu2_degree: { x: 215, y: 479 },
      edu2_major: { x: 305, y: 479 },
      edu2_year: { x: 430, y: 479 },
      edu3_school: { x: 45, y: 461 },
      edu3_degree: { x: 215, y: 461 },
      edu3_major: { x: 305, y: 461 },
      edu3_year: { x: 430, y: 461 },
      train1_topic: { x: 45, y: 423 },
      train1_by: { x: 175, y: 423 },
      train1_date: { x: 285, y: 423 },
      train1_place: { x: 380, y: 423 },
      train2_topic: { x: 45, y: 405 },
      train2_by: { x: 175, y: 405 },
      train2_date: { x: 285, y: 405 },
      train2_place: { x: 380, y: 405 },
      com_word_vgood: { x: 238, y: 375 },
      com_word_good: { x: 316, y: 375 },
      com_word_weak: { x: 394, y: 375 },
      com_excel_vgood: { x: 238, y: 357 },
      com_excel_good: { x: 316, y: 357 },
      com_excel_weak: { x: 394, y: 357 },
      com_ppt_vgood: { x: 238, y: 339 },
      com_ppt_good: { x: 316, y: 339 },
      com_ppt_weak: { x: 394, y: 339 },
      com_other: { x: 115, y: 321 },
      lang_eng_read_good: { x: 177, y: 743, pageIndex: 1 },
      lang_eng_read_fair: { x: 213, y: 743, pageIndex: 1 },
      lang_eng_read_weak: { x: 249, y: 743, pageIndex: 1 },
      lang_eng_write_good: { x: 284, y: 743, pageIndex: 1 },
      lang_eng_write_fair: { x: 320, y: 743, pageIndex: 1 },
      lang_eng_write_weak: { x: 356, y: 743, pageIndex: 1 },
      lang_eng_speak_good: { x: 391, y: 743, pageIndex: 1 },
      lang_eng_speak_fair: { x: 427, y: 743, pageIndex: 1 },
      lang_eng_speak_weak: { x: 463, y: 743, pageIndex: 1 },
      lang_chi_read_good: { x: 177, y: 725, pageIndex: 1 },
      lang_chi_read_fair: { x: 213, y: 725, pageIndex: 1 },
      lang_chi_read_weak: { x: 249, y: 725, pageIndex: 1 },
      lang_chi_write_good: { x: 284, y: 725, pageIndex: 1 },
      lang_chi_write_fair: { x: 320, y: 725, pageIndex: 1 },
      lang_chi_write_weak: { x: 356, y: 725, pageIndex: 1 },
      lang_chi_speak_good: { x: 391, y: 725, pageIndex: 1 },
      lang_chi_speak_fair: { x: 427, y: 725, pageIndex: 1 },
      lang_chi_speak_weak: { x: 463, y: 725, pageIndex: 1 },
      lang_vie_read_good: { x: 177, y: 707, pageIndex: 1 },
      lang_vie_read_fair: { x: 213, y: 707, pageIndex: 1 },
      lang_vie_read_weak: { x: 249, y: 707, pageIndex: 1 },
      lang_vie_write_good: { x: 284, y: 707, pageIndex: 1 },
      lang_vie_write_fair: { x: 320, y: 707, pageIndex: 1 },
      lang_vie_write_weak: { x: 356, y: 707, pageIndex: 1 },
      lang_vie_speak_good: { x: 391, y: 707, pageIndex: 1 },
      lang_vie_speak_fair: { x: 427, y: 707, pageIndex: 1 },
      lang_vie_speak_weak: { x: 463, y: 707, pageIndex: 1 },
      lang_hmong_read_good: { x: 177, y: 689, pageIndex: 1 },
      lang_hmong_read_fair: { x: 213, y: 689, pageIndex: 1 },
      lang_hmong_read_weak: { x: 249, y: 689, pageIndex: 1 },
      lang_hmong_write_good: { x: 284, y: 689, pageIndex: 1 },
      lang_hmong_write_fair: { x: 320, y: 689, pageIndex: 1 },
      lang_hmong_write_weak: { x: 356, y: 689, pageIndex: 1 },
      lang_hmong_speak_good: { x: 391, y: 689, pageIndex: 1 },
      lang_hmong_speak_fair: { x: 427, y: 689, pageIndex: 1 },
      lang_hmong_speak_weak: { x: 463, y: 689, pageIndex: 1 },
      lang_other_name: { x: 80, y: 671, pageIndex: 1 },
      lang_other_read_good: { x: 177, y: 671, pageIndex: 1 },
      lang_other_read_fair: { x: 213, y: 671, pageIndex: 1 },
      lang_other_read_weak: { x: 249, y: 671, pageIndex: 1 },
      lang_other_write_good: { x: 284, y: 671, pageIndex: 1 },
      lang_other_write_fair: { x: 320, y: 671, pageIndex: 1 },
      lang_other_write_weak: { x: 356, y: 671, pageIndex: 1 },
      lang_other_speak_good: { x: 391, y: 671, pageIndex: 1 },
      lang_other_speak_fair: { x: 427, y: 671, pageIndex: 1 },
      lang_other_speak_weak: { x: 463, y: 671, pageIndex: 1 },
      emp1_company: { x: 42, y: 596, pageIndex: 1 },
      emp1_start: { x: 120, y: 596, pageIndex: 1 },
      emp1_end: { x: 190, y: 596, pageIndex: 1 },
      emp1_pos: { x: 270, y: 596, pageIndex: 1 },
      emp1_salary: { x: 360, y: 596, pageIndex: 1 },
      emp1_reason: { x: 415, y: 596, pageIndex: 1 },
      emp1_desc: { x: 42, y: 574, pageIndex: 1 },
      emp2_company: { x: 42, y: 540, pageIndex: 1 },
      emp2_start: { x: 120, y: 540, pageIndex: 1 },
      emp2_end: { x: 190, y: 540, pageIndex: 1 },
      emp2_pos: { x: 270, y: 540, pageIndex: 1 },
      emp2_salary: { x: 360, y: 540, pageIndex: 1 },
      emp2_reason: { x: 415, y: 540, pageIndex: 1 },
      emp2_desc: { x: 42, y: 518, pageIndex: 1 },
      emg_name: { x: 80, y: 462, pageIndex: 1 },
      emg_address: { x: 190, y: 462, pageIndex: 1 },
      emg_phone: { x: 330, y: 462, pageIndex: 1 },
      emg_relation: { x: 435, y: 462, pageIndex: 1 },
      sign_date: { x: 120, y: 355, pageIndex: 1 }
    }
  }
};

const oldDepartments = {
  FORM_01: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_02: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_03: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_04: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_05: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_06: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_07: 'ພະແນກພັດທະນາຊັບພະຍາກອນມະນຸດ',
  FORM_08: 'ພະແນກພັດທະນາຊັບພະຍາກອນມະນຸດ',
  FORM_09: 'ພະແນກພັດທະນາຊັບພະຍາກອນມະນຸດ',
  FORM_10: 'ພະແນກກວດກາ',
  FORM_11: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_12: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_13: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_14: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_15: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_16: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_17: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
  FORM_18: 'ພະແນກບໍລິການເຕັກນິກ (IT)',
  FORM_19: 'ພະແນກບໍລິການເຕັກນິກ (IT)',
  FORM_20: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
}

let result = `export type FormField = {
  id: string;
  type: 'text' | 'date' | 'checkbox' | 'textarea' | 'number' | 'signature';
  label: string;
  pageIndex: number;
  x: number;
  y: number;
  fontSize?: number;
  maxWidth?: number;
  lineHeight?: number;
  placeholder?: string;
  hidden?: boolean;
  required?: boolean;
  section?: string;
  colSpan?: number;
};

export type FormConfig = {
  id: string;
  department: string;
  name: string;
  templatePath: string;
  fields: FormField[];
};

export const formsConfig: Record<string, FormConfig> = {
`;

for (const [key, val] of Object.entries(FORM_MASTER)) {
  const dept = oldDepartments[key] || 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ';
  const tmpl = `/templates/${val.file}`;

  result += `  ${key}: {\n`;
  result += `    id: '${key}',\n`;
  result += `    department: '${dept}',\n`;
  result += `    name: '${val.name}',\n`;
  result += `    templatePath: '${tmpl}',\n`;
  result += `    fields: [\n`;

  for (const field of val.fields) {
    const coords = val.coords && val.coords[field.id] ? val.coords[field.id] : { x: 0, y: 0, pageIndex: 0 };
    const pi = coords.pageIndex !== undefined ? coords.pageIndex : 0;
    const ph = field.placeholder ? `, placeholder: '${field.placeholder}'` : '';
    const hidden = field.hidden ? `, hidden: true` : '';
    const required = field.required ? `, required: true` : '';
    const section = field.section ? `, section: '${field.section}'` : '';
    const colSpan = field.colSpan ? `, colSpan: ${field.colSpan}` : '';
    result += `      { id: '${field.id}', type: '${field.type}', label: '${field.label}', pageIndex: ${pi}, x: ${coords.x}, y: ${coords.y}${ph}${hidden}${required}${section}${colSpan} },\n`;
  }

  result += `    ]\n`;
  result += `  },\n`;
}

result += `};\n`;

fs.writeFileSync('c:/Users/Administrator/Desktop/pojex_nar_me/src/lib/formsConfig.ts', result);
console.log("Done");
