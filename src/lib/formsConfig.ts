export type FormField = {
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
  FORM_01: {
    id: 'FORM_01',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມຂໍເຮັດໃບຢັ້ງຢືນພະນັກງານ ແລະ ເງິນເດືອນ',
    templatePath: '/templates/1. ແບບຟອມຂໍເຮັດໃບຢັ້ງຢືນພະນັກງານ ແລະ ເງິນເດືອນ.pdf',
    fields: [
      { id: 'empId', type: 'text', label: 'ລະຫັດພະນັກງານ', pageIndex: 0, x: 473, y: 607 },
      { id: 'nameLao', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ (Lao)', pageIndex: 0, x: 220, y: 533 },
      { id: 'nameEng', type: 'text', label: 'Name and Surname (Eng)', pageIndex: 0, x: 420, y: 533 },
      { id: 'deptLao', type: 'text', label: 'ພະແນກ/ລລທ ສາຂາແຂວງ (Lao)', pageIndex: 0, x: 220, y: 503 },
      { id: 'deptEng', type: 'text', label: 'Department/Branch (Eng)', pageIndex: 0, x: 420, y: 503 },
      { id: 'sectorLao', type: 'text', label: 'ພາກສ່ວນ (Lao)', pageIndex: 0, x: 220, y: 475 },
      { id: 'sectorEng', type: 'text', label: 'Sector (Eng)', pageIndex: 0, x: 420, y: 475 },
      { id: 'unitLao', type: 'text', label: 'ໜ່ວຍງານ (Lao)', pageIndex: 0, x: 220, y: 445 },
      { id: 'unitEng', type: 'text', label: 'Unit (Eng)', pageIndex: 0, x: 420, y: 445 },
      { id: 'posLao', type: 'text', label: 'ຕຳແໜ່ງ (Lao)', pageIndex: 0, x: 220, y: 413 },
      { id: 'posEng', type: 'text', label: 'Position (Eng)', pageIndex: 0, x: 420, y: 413 },
      { id: 'cert_emp', type: 'checkbox', label: 'ພະນັກງານ', pageIndex: 0, x: 258, y: 346 },
      { id: 'cert_salary', type: 'checkbox', label: 'ເງິນເດືອນ', pageIndex: 0, x: 395, y: 346 },
      { id: 'lang_lao', type: 'checkbox', label: 'ພາສາລາວ', pageIndex: 0, x: 258, y: 320 },
      { id: 'lang_eng', type: 'checkbox', label: 'ພາສາອັງກິດ', pageIndex: 0, x: 395, y: 320 },
      { id: 'visa_tourist_cb', type: 'checkbox', label: 'ວີຊ່າທ່ອງທ່ຽວ (Check)', pageIndex: 0, x: 205, y: 295, hidden: true },
      { id: 'visa_tourist', type: 'text', label: 'ວີຊ່າທ່ອງທ່ຽວ (ລະບຸປະເທດ)', pageIndex: 0, x: 325, y: 297 },
      { id: 'visa_study_cb', type: 'checkbox', label: 'ວີຊ່າສຶກສາຕໍ່ (Check)', pageIndex: 0, x: 392, y: 295, hidden: true },
      { id: 'visa_study', type: 'text', label: 'ວີຊ່າສຶກສາຕໍ່ (ລະບຸປະເທດ)', pageIndex: 0, x: 501, y: 297 },
      { id: 'census', type: 'checkbox', label: 'ເຮັດສຳມະໂນຄົວ', pageIndex: 0, x: 78, y: 268 },
      { id: 'id_card', type: 'checkbox', label: 'ເຮັດບັດປະຈຳຕົວ', pageIndex: 0, x: 205, y: 268 },
      { id: 'other_purpose_cb', type: 'checkbox', label: 'ອື່ນໆ (Check)', pageIndex: 0, x: 393, y: 268, hidden: true },
      { id: 'other_purpose', type: 'text', label: 'ອື່ນໆ (ລະບຸ)', pageIndex: 0, x: 440, y: 270 },
    ]
  },
  FORM_02: {
    id: 'FORM_02',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມການກຳນົດຕຳແໜ່ງງານ',
    templatePath: '/templates/2. ແບບຟອມການກຳນົດຕຳແໜ່ງງານ.pdf',
    fields: [
      { id: 'sector', type: 'text', label: '1.1 ຂະແໜງ', pageIndex: 0, x: 190, y: 720 },
      { id: 'dept', type: 'text', label: '1.2 ພະແນກ/ລລທ ສາຂາແຂວງ', pageIndex: 0, x: 235, y: 698 },
      { id: 'part', type: 'text', label: '1.3 ພາກສ່ວນ', pageIndex: 0, x: 190, y: 676 },
      { id: 'unit', type: 'text', label: '1.4 ໜ່ວຍງານ', pageIndex: 0, x: 190, y: 654 },
      { id: 'pos_name', type: 'text', label: '2. ແຈ້ງຊື່ຕຳແໜ່ງທີ່ສະເໜີກຳນົດ', pageIndex: 0, x: 105, y: 608 },
      { id: 'report_to', type: 'text', label: '1. ຂຶ້ນກັບ ຫຼື ລາຍງານຕໍ່ (ຕຳແໜ່ງ)', pageIndex: 0, x: 190, y: 555 },
      { id: 'role_main', type: 'textarea', label: '2. ບົດບາດຕົ້ນຕໍ (ຈຸດປະສົງລວມ)', pageIndex: 0, x: 105, y: 520 },
      { id: 'duty_main', type: 'textarea', label: '1. ໜ້າທີ່ ແລະ ຄວາມຮັບຜິດຊອບຕົ້ນຕໍ (ບັງຄັບ)', pageIndex: 0, x: 105, y: 445 },
      { id: 'duty_other', type: 'textarea', label: '2. ໜ້າທີ່ ແລະ ຄວາມຮັບຜິດຊອບອື່ນໆ (ຖ້າມີ)', pageIndex: 0, x: 105, y: 380 },
      { id: 'relation', type: 'textarea', label: '3. ການພົວພັນ ແລະ ການປະສານງານ', pageIndex: 0, x: 105, y: 315 },
      { id: 'scope', type: 'textarea', label: '4. ຂອບເຂດສິດ (ການຕັດສິນໃຈ)', pageIndex: 0, x: 105, y: 250 },
      { id: 'edu_level', type: 'text', label: '1. ລະດັບການສຶກສາທີ່ຕ້ອງການ', pageIndex: 0, x: 215, y: 185 },
      { id: 'gender', type: 'text', label: '2. ເພດ (ຊາຍ, ຍິງ ຫຼື ໄດ້ທັງສອງ)', pageIndex: 0, x: 155, y: 163 },
      { id: 'major', type: 'text', label: '3. ປະເພດວິຊາ ຫຼື ສາຂາວິຊາທີ່ຮຽນມາ', pageIndex: 0, x: 255, y: 141 },
      { id: 'experience', type: 'textarea', label: '4. ຄວາມຮູ້, ຄວາມສາມາດ ແລະ ປະສົບການ', pageIndex: 0, x: 105, y: 115 },
      { id: 'other_condition', type: 'textarea', label: '5. ເງື່ອນໄຂອື່ນໆ (ຖ້າມີ)', pageIndex: 0, x: 105, y: 60 },
      { id: 'creator_name', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ (ຜູ້ຂຽນ)', pageIndex: 0, x: 220, y: 755 },
      { id: 'creator_pos', type: 'text', label: 'ຕຳແໜ່ງ (ຜູ້ຂຽນ)', pageIndex: 0, x: 220, y: 730 },
      { id: 'creator_date', type: 'text', label: 'ວັນທີ, ເດືອນ, ປີ (ຜູ້ຂຽນ)', pageIndex: 0, x: 220, y: 705 },
      { id: 'approver_name', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ (ຜູ້ຮັບຮູ້)', pageIndex: 0, x: 220, y: 620 },
      { id: 'approver_pos', type: 'text', label: 'ຕຳແໜ່ງ (ຜູ້ຮັບຮູ້)', pageIndex: 0, x: 220, y: 595 },
      { id: 'approver_date', type: 'text', label: 'ວັນທີ, ເດືອນ, ປີ (ຜູ້ຮັບຮູ້)', pageIndex: 0, x: 220, y: 570 },
    ]
  },
  FORM_03: {
    id: 'FORM_03',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ຂໍ້ຕົກລົງຫ້າມເປີດເຜີຍຄວາມລັບ (NDA)',
    templatePath: '/templates/3. ຂໍ້ຕົກລົງຫ້າມເປີດເຜີຍຄວາມລັບ.pdf',
    fields: [
      { id: 'ref_no', type: 'text', label: 'ເລກທີ (Ref No.)', pageIndex: 0, x: 420, y: 785, placeholder: '....../ລລທ' },
      { id: 'place_date', type: 'text', label: 'ສະຖານທີ່/ວັນທີ', pageIndex: 0, x: 400, y: 765, placeholder: 'ນະຄອນຫຼວງວຽງຈັນ, ວັນທີ...' },
      { id: 'is_internal', type: 'checkbox', label: '☐ ພະນັກງານ ພາຍໃນ', pageIndex: 0, x: 142, y: 683 },
      { id: 'is_external', type: 'checkbox', label: '☐ ບຸກຄົນ ພາຍນອກ', pageIndex: 0, x: 387, y: 683 },
      { id: 'int_name', type: 'text', label: '1. ທ່ານ/ນາງ (ພາຍໃນ)', pageIndex: 0, x: 100, y: 638 },
      { id: 'int_emp_id', type: 'text', label: 'ລະຫັດພະນັກງານ', pageIndex: 0, x: 325, y: 638 },
      { id: 'int_village', type: 'text', label: 'ບ້ານ', pageIndex: 0, x: 0, y: 0 },
      { id: 'int_district', type: 'text', label: 'ເມືອງ', pageIndex: 0, x: 0, y: 0 },
      { id: 'int_province', type: 'text', label: 'ແຂວງ', pageIndex: 0, x: 0, y: 0 },
      { id: 'int_house_no', type: 'text', label: 'ເຮືອນເລກທີ', pageIndex: 0, x: 0, y: 0 },
      { id: 'int_unit', type: 'text', label: 'ໜ່ວຍ', pageIndex: 0, x: 0, y: 0 },
      { id: 'int_id_card', type: 'text', label: 'ຖືບັດປະຈຳຕົວເລກທີ', pageIndex: 0, x: 0, y: 0 },
      { id: 'int_id_at', type: 'text', label: 'ອອກໃຫ້ທີ່', pageIndex: 0, x: 0, y: 0 },
      { id: 'int_id_date', type: 'text', label: 'ເມື່ອວັນທີ', pageIndex: 0, x: 0, y: 0 },
      { id: 'int_id_expire', type: 'text', label: 'ບັດໝົດອາຍຸວັນທີ', pageIndex: 0, x: 0, y: 0 },
      { id: 'int_sector', type: 'text', label: 'ເຮັດວຽກສັງກັດຢູ່ ໜ່ວຍງານ', pageIndex: 0, x: 0, y: 0 },
      { id: 'int_part', type: 'text', label: 'ພາກສ່ວນ', pageIndex: 0, x: 0, y: 0 },
      { id: 'int_dept', type: 'text', label: 'ພະແນກ', pageIndex: 0, x: 0, y: 0 },
      { id: 'ext_office', type: 'text', label: '2. ທີ່ຕັ້ງສຳນັກງານ', pageIndex: 0, x: 120, y: 463 },
      { id: 'ext_reg_no', type: 'text', label: 'ຈົດທະບຽນເລກທີ', pageIndex: 0, x: 0, y: 0 },
      { id: 'ext_reg_date', type: 'text', label: 'ລົງວັນທີ', pageIndex: 0, x: 0, y: 0 },
      { id: 'ext_road', type: 'text', label: 'ຖະໜົນ', pageIndex: 0, x: 0, y: 0 },
      { id: 'ext_village', type: 'text', label: 'ບ້ານ (ພາຍນອກ)', pageIndex: 0, x: 0, y: 0 },
      { id: 'ext_district', type: 'text', label: 'ເມືອງ (ພາຍນອກ)', pageIndex: 0, x: 0, y: 0 },
      { id: 'ext_province', type: 'text', label: 'ແຂວງ (ພາຍນອກ)', pageIndex: 0, x: 0, y: 0 },
      { id: 'ext_contact', type: 'text', label: 'ເບີຕິດຕໍ່', pageIndex: 0, x: 0, y: 0 },
      { id: 'ext_rep_name', type: 'text', label: 'ໂດຍທ່ານ/ນາງ', pageIndex: 0, x: 0, y: 0 },
      { id: 'ext_pos', type: 'text', label: 'ຕຳແໜ່ງ', pageIndex: 0, x: 0, y: 0 },
      { id: 'access_ref', type: 'text', label: 'ໃບອະນຸຍາດຂໍໃຊ້ສິດ ເລກທີ', pageIndex: 0, x: 380, y: 282 },
      { id: 'access_date', type: 'text', label: 'ລົງວັນທີ (ຂໍໃຊ້ສິດ)', pageIndex: 0, x: 0, y: 0 },
      { id: 'sign_name_confirm', type: 'text', label: 'ລົງຊື່ຢັ້ງຢືນ (ທ່ານ/ນາງ)', pageIndex: 0, x: 0, y: 0 },
      { id: 'org_dept_sign', type: 'signature', label: 'ພະແນກຈັດຕັ້ງ (ລົງຊື່)', pageIndex: 0, x: 0, y: 0 },
      { id: 'director_sign', type: 'signature', label: 'ຜູ້ອຳນວຍການໃຫຍ່ (ອະນຸມັດ)', pageIndex: 0, x: 0, y: 0 },
    ]
  },
  FORM_04: {
    id: 'FORM_04',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມຂໍຂໍ້ມູນພະນັກງານ ລລທ',
    templatePath: '/templates/4. ແບບຟອມຂໍຂໍ້ມູນພະນັກງານ ລລທ (1).pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ', pageIndex: 0, x: 140, y: 710 },
      { id: 'empId', type: 'text', label: 'ລະຫັດພະນັກງານ', pageIndex: 0, x: 140, y: 685 },
      { id: 'pos', type: 'text', label: 'ຕຳແໜ່ງ', pageIndex: 0, x: 140, y: 660 },
      { id: 'dept', type: 'text', label: 'ພະແນກ', pageIndex: 0, x: 0, y: 0 },
      { id: 'phone', type: 'text', label: 'ເບີໂທ', pageIndex: 0, x: 0, y: 0 },
      { id: 'infoDetail', type: 'textarea', label: 'ລາຍລະອຽດຂໍ້ມູນທີ່ຕ້ອງການ', pageIndex: 0, x: 0, y: 0 },
    ]
  },
  FORM_05: {
    id: 'FORM_05',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມຂໍອອະນຸມັດສ້າງຄອບຄົວໃໝ່',
    templatePath: '/templates/5. ແບບຟອມຂໍອະນຸມັດສ້າງຄອບຄົວໃໝ່.pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ', pageIndex: 0, x: 150, y: 650 },
      { id: 'empId', type: 'text', label: 'ລະຫັດພະນັກງານ', pageIndex: 0, x: 350, y: 650 },
      { id: 'dob', type: 'date', label: 'ວັນເດືອນປີເກີດ', pageIndex: 0, x: 150, y: 625 },
      { id: 'partnerName', type: 'text', label: 'ຊື່ຄູ່ສົມລົດ', pageIndex: 0, x: 0, y: 0 },
      { id: 'marriageDate', type: 'date', label: 'ວັນທີຈະແຕ່ງງານ', pageIndex: 0, x: 0, y: 0 },
    ]
  },
  FORM_06: {
    id: 'FORM_06',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມຂໍແຈ້ງການຍົກຍ້າຍສະຖານທີ່ຢູ່ອາໃສ',
    templatePath: '/templates/6. ແບບຟອມຂໍແຈ້ງການຍົກຍ້າຍສະຖານທີ່ຢູ່ອາໃສ.pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ', pageIndex: 0, x: 140, y: 730 },
      { id: 'empId', type: 'text', label: 'ລະຫັດພະນັກງານ', pageIndex: 0, x: 0, y: 0 },
      { id: 'oldVillage', type: 'text', label: 'ບ້ານເກົ່າ', pageIndex: 0, x: 120, y: 600 },
      { id: 'newVillage', type: 'text', label: 'ບ້ານໃໝ່', pageIndex: 0, x: 350, y: 600 },
      { id: 'reason', type: 'textarea', label: 'ເຫດຜົນໃນການຍົກຍ້າຍ', pageIndex: 0, x: 0, y: 0 },
    ]
  },
  FORM_07: {
    id: 'FORM_07',
    department: 'ພະແນກພັດທະນາຊັບພະຍາກອນມະນຸດ',
    name: 'ແບບຟອມບັນທຶກການຝຶກປະຕິບັດວຽກ (OJT)',
    templatePath: '/templates/7. ແບບຟອມບັນທຶກການຝຶກປະຕິບັດວຽກ On the Job Training.pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ຜູ້ຖືກຝຶກວຽກ', pageIndex: 0, x: 160, y: 740 },
      { id: 'startDate', type: 'date', label: 'ວັນທີເຂົ້າເຮັດວຽກ', pageIndex: 0, x: 400, y: 740 },
      { id: 'pos', type: 'text', label: 'ຕຳແໜ່ງ', pageIndex: 0, x: 160, y: 715 },
      { id: 'trainer', type: 'text', label: 'ຊື່ຜູ້ສອນວຽກ', pageIndex: 0, x: 0, y: 0 },
      { id: 'topic', type: 'text', label: 'ຫົວຂໍ້ການຝຶກ', pageIndex: 0, x: 0, y: 0 },
    ]
  },
  FORM_08: {
    id: 'FORM_08',
    department: 'ພະແນກພັດທະນາຊັບພະຍາກອນມະນຸດ',
    name: 'ແບບຟອມປະເມີນພະນັກງານ 95% ເປັນ ຖາວອນ',
    templatePath: '/templates/8. ແບບຟອມປະເມີນຜົນການປະຕິບັດວຽກຂອງ ພະນັກງານ 95 ເພື່ອເລື່ອນຂຶ້ນເປັນ ພະນັກງານຖາວອນ.pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ຜູ້ຖືກປະເມີນ', pageIndex: 0, x: 180, y: 765 },
      { id: 'jobDuty', type: 'textarea', label: 'ໜ້າທີ່ຮັບຜິດຊອບ', pageIndex: 0, x: 180, y: 740 },
      { id: 'dateFrom', type: 'date', label: 'ປະເມີນຕັ້ງແຕ່ວັນທີ', pageIndex: 0, x: 0, y: 0 },
      { id: 'dateTo', type: 'date', label: 'ເຖິງວັນທີ', pageIndex: 0, x: 0, y: 0 },
    ]
  },
  FORM_09: {
    id: 'FORM_09',
    department: 'ພະແນກພັດທະນາຊັບພະຍາກອນມະນຸດ',
    name: 'ແບບຟອມປະເມີນພະນັກງານສັນຍາຈ້າງ ເປັນ 95%',
    templatePath: '/templates/9. ແບບຟອມປະເມີນຜົນການປະຕິບັດວຽກຂອງ ພະນັກງານສັນຍາຈ້າງ ເພື່ອເລື່ອນຂຶ້ນເປັນ ພະນັກງານ 95.pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ຜູ້ຖືກປະເມີນ', pageIndex: 0, x: 180, y: 770 },
      { id: 'jobDuty', type: 'textarea', label: 'ໜ້າທີ່ຮັບຜິດຊອບ', pageIndex: 0, x: 180, y: 745 },
      { id: 'dateFrom', type: 'date', label: 'ປະເມີນຕັ້ງແຕ່ວັນທີ', pageIndex: 0, x: 0, y: 0 },
      { id: 'dateTo', type: 'date', label: 'ເຖິງວັນທີ', pageIndex: 0, x: 0, y: 0 },
    ]
  },
  FORM_10: {
    id: 'FORM_10',
    department: 'ພະແນກກວດກາ',
    name: 'ໃບສຳຫຼວດຕົນເອງ',
    templatePath: '/templates/10. ໃບສຳຫຼວດຕົນເອງ.pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ', pageIndex: 0, x: 150, y: 780 },
      { id: 'dob', type: 'date', label: 'ວັນເດືອນປີເກີດ', pageIndex: 0, x: 400, y: 780 },
      { id: 'birthPlace', type: 'text', label: 'ບ້ານເກີດ', pageIndex: 0, x: 150, y: 755 },
      { id: 'education', type: 'text', label: 'ລະດັບການສຶກສາ', pageIndex: 0, x: 0, y: 0 },
      { id: 'goodPoint', type: 'textarea', label: 'ດ້ານດີເປັນພື້ນຖານ', pageIndex: 0, x: 0, y: 0 },
      { id: 'badPoint', type: 'textarea', label: 'ດ້ານອ່ອນທີ່ຍັງຄ້າງ', pageIndex: 0, x: 0, y: 0 },
    ]
  },
  FORM_11: {
    id: 'FORM_11',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມຂໍ User ເຂົ້າລະບົບສະຫຼຸບວັນງານ',
    templatePath: '/templates/11. ແບບຟອມຂໍ User ເຂົ້າລະບົບສະຫຼຸບວັນງານ.pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ', pageIndex: 0, x: 150, y: 760 },
      { id: 'empId', type: 'text', label: 'ລະຫັດພະນັກງານ', pageIndex: 0, x: 350, y: 760 },
      { id: 'pos', type: 'text', label: 'ຕຳແໜ່ງ', pageIndex: 0, x: 150, y: 735 },
      { id: 'dept', type: 'text', label: 'ພະແນກ/ສາຂາ', pageIndex: 0, x: 350, y: 735 },
      { id: 'reason', type: 'textarea', label: 'ຈຸດປະສົງ ຫຼື ເຫດຜົນ', pageIndex: 0, x: 150, y: 700 },
    ]
  },
  FORM_12: {
    id: 'FORM_12',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມຂໍອະນຸມັດເອົາລູກຮັບເບ້ຍລ້ຽງ',
    templatePath: '/templates/12.ແບບຟອມຂໍອະນຸມັດເອົາລູກຮັບເບ້ຍລ້ຽງ.pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນພະນັກງານ', pageIndex: 0, x: 150, y: 750 },
      { id: 'empId', type: 'text', label: 'ລະຫັດພະນັກງານ', pageIndex: 0, x: 350, y: 750 },
      { id: 'childName', type: 'text', label: 'ຊື່ລູກ', pageIndex: 0, x: 150, y: 725 },
      { id: 'childDob', type: 'date', label: 'ວັນເດືອນປີເກີດລູກ', pageIndex: 0, x: 350, y: 725 },
      { id: 'childOrder', type: 'number', label: 'ລູກຜູ້ທີ', pageIndex: 0, x: 150, y: 700 },
    ]
  },
  FORM_13: {
    id: 'FORM_13',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມຂໍເບີກຄ່າປິ່ນປົວພະນັກງານ ແລະ ລູກພະນັກງານ',
    templatePath: '/templates/13. ແບບຟອມຂໍເບີກຄ່າປິ່ນປົວພະນັກງານ ແລະ ລູກພະນັກງານ.pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ', pageIndex: 0, x: 150, y: 740 },
      { id: 'empId', type: 'text', label: 'ລະຫັດພະນັກງານ', pageIndex: 0, x: 350, y: 740 },
      { id: 'hospitalName', type: 'text', label: 'ຊື່ໂຮງໝໍ/ຄລີນິກ', pageIndex: 0, x: 150, y: 715 },
      { id: 'amount', type: 'number', label: 'ຈຳນວນເງິນຂໍເບີກ', pageIndex: 0, x: 350, y: 715 },
      { id: 'billCount', type: 'number', label: 'ຈຳນວນໃບບິນ', pageIndex: 0, x: 150, y: 690 },
    ]
  },
  FORM_14: {
    id: 'FORM_14',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມຂໍເຮັດບັດພະນັກງານ',
    templatePath: '/templates/14. ແບບຟອມຂໍເຮັດບັດພະນັກງານ.pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ (ລາວ)', pageIndex: 0, x: 150, y: 730 },
      { id: 'nameEng', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ (Eng)', pageIndex: 0, x: 150, y: 705 },
      { id: 'empId', type: 'text', label: 'ລະຫັດພະນັກງານ', pageIndex: 0, x: 350, y: 730 },
      { id: 'phone', type: 'text', label: 'ເບີໂທຕິດຕໍ່', pageIndex: 0, x: 350, y: 705 },
      { id: 'reason', type: 'text', label: 'ເຫດຜົນຂໍເຮັດບັດ', pageIndex: 0, x: 150, y: 680 },
    ]
  },
  FORM_15: {
    id: 'FORM_15',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມສັນຍາແຮງງານ ສໍາລັບ ພະນັກງານ 95%',
    templatePath: '/templates/15. ແບບຟອມສັນຍາແຮງງານ ສໍາລັບ ພະນັກງານ 95%.pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ', pageIndex: 0, x: 150, y: 720 },
      { id: 'village', type: 'text', label: 'ບ້ານ', pageIndex: 0, x: 150, y: 695 },
      { id: 'district', type: 'text', label: 'ເມືອງ', pageIndex: 0, x: 350, y: 695 },
      { id: 'province', type: 'text', label: 'ແຂວງ', pageIndex: 0, x: 150, y: 670 },
      { id: 'idCard', type: 'text', label: 'ຖືບັດປະຈຳຕົວເລກທີ', pageIndex: 0, x: 350, y: 670 },
    ]
  },
  FORM_16: {
    id: 'FORM_16',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມລາຍງານການເສຍຊີວິດ',
    templatePath: '/templates/16. ແບບຟອມລາຍງານການເສຍຊີວິດ.pdf',
    fields: [
      { id: 'reporterName', type: 'text', label: 'ຊື່ຜູ້ລາຍງານ', pageIndex: 0, x: 150, y: 710 },
      { id: 'deceasedName', type: 'text', label: 'ຊື່ຜູ້ເສຍຊີວິດ', pageIndex: 0, x: 150, y: 685 },
      { id: 'relation', type: 'text', label: 'ກ່ຽວພັນເປັນ', pageIndex: 0, x: 350, y: 685 },
      { id: 'deathDate', type: 'date', label: 'ວັນທີເສຍຊີວິດ', pageIndex: 0, x: 150, y: 660 },
      { id: 'cause', type: 'text', label: 'ສາເຫດ', pageIndex: 0, x: 350, y: 660 },
    ]
  },
  FORM_17: {
    id: 'FORM_17',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມສັນຍາແຮງງານ ສໍາລັບ ພະນັກງານຖາວອນ',
    templatePath: '/templates/17_gender_change.pdf',
    fields: [
      { id: 'nameLao', type: 'text', label: 'ຊື່ ແລະ ນາມສະກຸນ', pageIndex: 0, x: 150, y: 700 },
      { id: 'empId', type: 'text', label: 'ລະຫັດພະນັກງານ', pageIndex: 0, x: 350, y: 700 },
      { id: 'oldGender', type: 'text', label: 'ເພດ (ເກົ່າ)', pageIndex: 0, x: 150, y: 675 },
      { id: 'newGender', type: 'text', label: 'ເພດ (ໃໝ່)', pageIndex: 0, x: 350, y: 675 },
    ]
  },
  FORM_18: {
    id: 'FORM_18',
    department: 'ພະແນກບໍລິການເຕັກນິກ (IT)',
    name: 'ແບບຟອມຂໍປ່ຽນເບີໂທລະສັບໃນລະບົບຄຸ້ມຄອງພະນັກງານ',
    templatePath: '/templates/18_nationality_change.pdf',
    fields: [
      { id: 'empId', type: 'text', label: 'ລະຫັດພະນັກງານ', pageIndex: 0, x: 150, y: 690 },
      { id: 'oldPhone', type: 'text', label: 'ເບີໂທເກົ່າ', pageIndex: 0, x: 150, y: 665 },
      { id: 'newPhone', type: 'text', label: 'ເບີໂທໃໝ່', pageIndex: 0, x: 350, y: 665 },
    ]
  },
  FORM_19: {
    id: 'FORM_19',
    department: 'ພະແນກບໍລິການເຕັກນິກ (IT)',
    name: 'ແບບຟອມຂໍປ່ຽນເບີໂທລະສັບເພື່ອປ່ຽນເບີຮັບນະໂຍບາຍມູນຄ່າໂທ ແລະ DATA',
    templatePath: '/templates/19_dob_change.pdf',
    fields: [
      { id: 'empId', type: 'text', label: 'ລະຫັດພະນັກງານ', pageIndex: 0, x: 150, y: 680 },
      { id: 'oldDob', type: 'date', label: 'ວັນເກີດ (ເກົ່າ)', pageIndex: 0, x: 150, y: 655 },
      { id: 'newDob', type: 'date', label: 'ວັນເກີດ (ໃໝ່)', pageIndex: 0, x: 350, y: 655 },
    ]
  },
  FORM_20: {
    id: 'FORM_20',
    department: 'ພະແນກຈັດຕັ້ງ-ບຸກຄະລາກອນ',
    name: 'ແບບຟອມສະໝັກເຂົ້າເຮັດວຽກ',
    templatePath: '/templates/20. ແບບຟອມສະໝັກເຂົ້າເຮັດວຽກ (13).pdf',
    fields: [
      { id: 'pos_applying', type: 'text', label: 'ຕຳແໜ່ງທີ່ສະໝັກ', pageIndex: 0, x: 270, y: 673, section: 'ຂໍ້ມູນເບື້ອງຕົ້ນ' },
      { id: 'first_name', type: 'text', label: 'ຊື່ (First Name)', pageIndex: 0, x: 130, y: 634, section: 'ຂໍ້ມູນເບື້ອງຕົ້ນ' },
      { id: 'last_name', type: 'text', label: 'ນາມສະກຸນ (Last Name)', pageIndex: 0, x: 29, y: 470, section: 'ຂໍ້ມູນເບື້ອງຕົ້ນ' },
      { id: 'sex', type: 'text', label: 'ເພດ', pageIndex: 0, x: 74, y: 596, section: 'ຂໍ້ມູນເບື້ອງຕົ້ນ' },
      { id: 'dob', type: 'text', label: 'ວັນເດືອນປີເກີດ', pageIndex: 0, x: 112, y: 613, section: 'ຂໍ້ມູນເບື້ອງຕົ້ນ' },
      { id: 'age', type: 'text', label: 'ອາຍຸ', pageIndex: 0, x: 320, y: 609, section: 'ຂໍ້ມູນເບື້ອງຕົ້ນ' },

      { id: 'nationality', type: 'text', label: 'ສັນຊາດ', pageIndex: 0, x: 67, y: 470, section: 'ຂໍ້ມູນຕົວຕົນ' },
      { id: 'ethnicity', type: 'text', label: 'ຊົນເຜົ່າ', pageIndex: 0, x: 113, y: 472, section: 'ຂໍ້ມູນຕົວຕົນ' },
      { id: 'religion', type: 'text', label: 'ສາສະໜາ', pageIndex: 0, x: 156, y: 474, section: 'ຂໍ້ມູນຕົວຕົນ' },
      { id: 'id_card_no', type: 'text', label: 'ເລກບັດປະຈຳຕົວ/ພັດສະປອດ', pageIndex: 0, x: 0, y: 0, section: 'ຂໍ້ມູນຕົວຕົນ' },
      { id: 'id_issued_at', type: 'text', label: 'ອອກໃຫ້ທີ່', pageIndex: 0, x: 0, y: 0, section: 'ຂໍ້ມູນຕົວຕົນ' },
      { id: 'id_issued_date', type: 'text', label: 'ວັນທີອອກບັດ', pageIndex: 0, x: 0, y: 0, section: 'ຂໍ້ມູນຕົວຕົນ' },
      { id: 'marital_single', type: 'checkbox', label: 'ໂສດ', pageIndex: 0, x: 438, y: 598, section: 'ຂໍ້ມູນຕົວຕົນ' },
      { id: 'marital_married', type: 'checkbox', label: 'ແຕ່ງງານ', pageIndex: 0, x: 462, y: 598, section: 'ຂໍ້ມູນຕົວຕົນ' },
      { id: 'marital_widow', type: 'checkbox', label: 'ໝ້າຍ', pageIndex: 0, x: 487, y: 598, section: 'ຂໍ້ມູນຕົວຕົນ' },
      { id: 'marital_divorced', type: 'checkbox', label: 'ຢ່າຮ້າງ', pageIndex: 0, x: 512, y: 598, section: 'ຂໍ້ມູນຕົວຕົນ' },

      { id: 'height', type: 'text', label: 'ລວງສູງ (cm)', pageIndex: 0, x: 0, y: 0, section: 'ຄຸນລັກສະນະ' },
      { id: 'weight', type: 'text', label: 'ນ້ຳໜັກ (kg)', pageIndex: 0, x: 0, y: 0, section: 'ຄຸນລັກສະນະ' },
      { id: 'blood_type', type: 'text', label: 'ໝວດເລືອດ', pageIndex: 0, x: 0, y: 0, section: 'ຄຸນລັກສະນະ' },
      { id: 'motorbike_yes', type: 'checkbox', label: 'ຂັບລົດຈັກໄດ້', pageIndex: 0, x: 118, y: 568, section: 'ທັກສະການຂັບຂີ່' },
      { id: 'motorbike_no', type: 'checkbox', label: 'ຂັບລົດຈັກບໍ່ໄດ້', pageIndex: 0, x: 163, y: 568, section: 'ທັກສະການຂັບຂີ່' },
      { id: 'motorbike_lic_yes', type: 'checkbox', label: 'ໃບຂັບຂີ່ລົດຈັກ ມີ', pageIndex: 0, x: 280, y: 568, section: 'ທັກສະການຂັບຂີ່' },
      { id: 'motorbike_lic_no', type: 'checkbox', label: 'ໃບຂັບຂີ່ລົດຈັກ ບໍ່ມີ', pageIndex: 0, x: 325, y: 568, section: 'ທັກສະການຂັບຂີ່' },
      { id: 'car_yes', type: 'checkbox', label: 'ຂັບລົດໄດ້', pageIndex: 0, x: 118, y: 553, section: 'ທັກສະການຂັບຂີ່' },
      { id: 'car_no', type: 'checkbox', label: 'ຂັບລົດບໍ່ໄດ້', pageIndex: 0, x: 163, y: 553, section: 'ທັກສະການຂັບຂີ່' },
      { id: 'car_lic_yes', type: 'checkbox', label: 'ໃບຂັບຂີ່ລົດ ມີ', pageIndex: 0, x: 280, y: 553, section: 'ທັກສະການຂັບຂີ່' },
      { id: 'car_lic_no', type: 'checkbox', label: 'ໃບຂັບຂີ່ລົດ ບໍ່ມີ', pageIndex: 0, x: 325, y: 553, section: 'ທັກສະການຂັບຂີ່' },
      { id: 'car_lic_type', type: 'text', label: 'ປະເພດໃບຂັບຂີ່', pageIndex: 0, x: 380, y: 553, section: 'ທັກສະການຂັບຂີ່' },

      { id: 'birth_village', type: 'text', label: 'ບ້ານເກີດ', pageIndex: 0, x: 160, y: 661, section: 'ສະຖານທີ່ເກີດ' },
      { id: 'birth_district', type: 'text', label: 'ເມືອງ (ບ້ານເກີດ)', pageIndex: 0, x: 340, y: 661, section: 'ສະຖານທີ່ເກີດ' },
      { id: 'birth_province', type: 'text', label: 'ແຂວງ (ບ້ານເກີດ)', pageIndex: 0, x: 460, y: 661, section: 'ສະຖານທີ່ເກີດ' },

      { id: 'curr_house_no', type: 'text', label: 'ເຮືອນເລກທີ (ປັດຈຸບັນ)', pageIndex: 0, x: 0, y: 0, section: 'ທີ່ຢູ່ປັດຈຸບັນ' },
      { id: 'curr_unit', type: 'text', label: 'ໜ່ວຍ (ປັດຈຸບັນ)', pageIndex: 0, x: 0, y: 0, section: 'ທີ່ຢູ່ປັດຈຸບັນ' },
      { id: 'curr_road', type: 'text', label: 'ຖະໜົນ (ປັດຈຸບັນ)', pageIndex: 0, x: 0, y: 0, section: 'ທີ່ຢູ່ປັດຈຸບັນ' },
      { id: 'curr_village', type: 'text', label: 'ບ້ານ (ທີ່ຢູ່ປັດຈຸບັນ)', pageIndex: 0, x: 160, y: 640, section: 'ທີ່ຢູ່ປັດຈຸບັນ' },
      { id: 'curr_district', type: 'text', label: 'ເມືອງ (ທີ່ຢູ່ປັດຈຸບັນ)', pageIndex: 0, x: 340, y: 640, section: 'ທີ່ຢູ່ປັດຈຸບັນ' },
      { id: 'curr_province', type: 'text', label: 'ແຂວງ (ທີ່ຢູ່ປັດຈຸບັນ)', pageIndex: 0, x: 460, y: 640, section: 'ທີ່ຢູ່ປັດຈຸບັນ' },

      { id: 'perm_village', type: 'text', label: 'ບ້ານ (ສຳມະໂນຄົວ)', pageIndex: 0, x: 0, y: 0, section: 'ທີ່ຢູ່ຕາມສຳມະໂນຄົວ' },
      { id: 'perm_district', type: 'text', label: 'ເມືອງ (ສຳມະໂນຄົວ)', pageIndex: 0, x: 0, y: 0, section: 'ທີ່ຢູ່ຕາມສຳມະໂນຄົວ' },
      { id: 'perm_province', type: 'text', label: 'ແຂວງ (ສຳມະໂນຄົວ)', pageIndex: 0, x: 0, y: 0, section: 'ທີ່ຢູ່ຕາມສຳມະໂນຄົວ' },

      { id: 'phone', type: 'text', label: 'ເບີໂທ', pageIndex: 0, x: 160, y: 619, section: 'ຂໍ້ມູນການຕິດຕໍ່' },
      { id: 'email', type: 'text', label: 'E-Mail Address', pageIndex: 0, x: 340, y: 619, section: 'ຂໍ້ມູນການຕິດຕໍ່' },

      { id: 'edu1_school', type: 'text', label: 'ສະຖານທີ່ຮຽນ 1', pageIndex: 0, x: 45, y: 497, section: 'ການສຶກສາ' },
      { id: 'edu1_degree', type: 'text', label: 'ລະດັບ 1', pageIndex: 0, x: 215, y: 497, section: 'ການສຶກສາ' },
      { id: 'edu1_major', type: 'text', label: 'ສາຂາ 1', pageIndex: 0, x: 305, y: 497, section: 'ການສຶກສາ' },
      { id: 'edu1_year', type: 'text', label: 'ປີຈົບ 1', pageIndex: 0, x: 430, y: 497, section: 'ການສຶກສາ' },
      { id: 'edu2_school', type: 'text', label: 'ສະຖານທີ່ຮຽນ 2', pageIndex: 0, x: 45, y: 479, section: 'ການສຶກສາ' },
      { id: 'edu2_degree', type: 'text', label: 'ລະດັບ 2', pageIndex: 0, x: 215, y: 479, section: 'ການສຶກສາ' },
      { id: 'edu2_major', type: 'text', label: 'ສາຂາ 2', pageIndex: 0, x: 305, y: 479, section: 'ການສຶກສາ' },
      { id: 'edu2_year', type: 'text', label: 'ປີຈົບ 2', pageIndex: 0, x: 430, y: 479, section: 'ການສຶກສາ' },
      { id: 'edu3_school', type: 'text', label: 'ສະຖານທີ່ຮຽນ 3', pageIndex: 0, x: 45, y: 461, section: 'ການສຶກສາ' },
      { id: 'edu3_degree', type: 'text', label: 'ລະດັບ 3', pageIndex: 0, x: 215, y: 461, section: 'ການສຶກສາ' },
      { id: 'edu3_major', type: 'text', label: 'ສາຂາ 3', pageIndex: 0, x: 305, y: 461, section: 'ການສຶກສາ' },
      { id: 'edu3_year', type: 'text', label: 'ປີຈົບ 3', pageIndex: 0, x: 430, y: 461, section: 'ການສຶກສາ' },
      { id: 'train1_topic', type: 'text', label: 'ຫົວຂໍ້ຝຶກ 1', pageIndex: 0, x: 45, y: 423, section: 'ການຝຶກອົບຮົມ' },
      { id: 'train1_by', type: 'text', label: 'ຈັດໂດຍ 1', pageIndex: 0, x: 175, y: 423, section: 'ການຝຶກອົບຮົມ' },
      { id: 'train1_date', type: 'text', label: 'ວັນທີ 1', pageIndex: 0, x: 285, y: 423, section: 'ການຝຶກອົບຮົມ' },
      { id: 'train1_place', type: 'text', label: 'ສະຖານທີ່ 1', pageIndex: 0, x: 380, y: 423, section: 'ການຝຶກອົບຮົມ' },
      { id: 'train2_topic', type: 'text', label: 'ຫົວຂໍ້ຝຶກ 2', pageIndex: 0, x: 45, y: 405, section: 'ການຝຶກອົບຮົມ' },
      { id: 'train2_by', type: 'text', label: 'ຈັດໂດຍ 2', pageIndex: 0, x: 175, y: 405, section: 'ການຝຶກອົບຮົມ' },
      { id: 'train2_date', type: 'text', label: 'ວັນທີ 2', pageIndex: 0, x: 285, y: 405, section: 'ການຝຶກອົບຮົມ' },
      { id: 'train2_place', type: 'text', label: 'ສະຖານທີ່ 2', pageIndex: 0, x: 380, y: 405, section: 'ການຝຶກອົບຮົມ' },

      { id: 'com_word_vgood', type: 'checkbox', label: 'Word ດີຫຼາຍ', pageIndex: 0, x: 238, y: 375, section: 'ທັກສະຄອມພິວເຕີ' },
      { id: 'com_word_good', type: 'checkbox', label: 'Word ດີ', pageIndex: 0, x: 316, y: 375, section: 'ທັກສະຄອມພິວເຕີ' },
      { id: 'com_word_weak', type: 'checkbox', label: 'Word ອ່ອນ', pageIndex: 0, x: 394, y: 375, section: 'ທັກສະຄອມພິວເຕີ' },
      { id: 'com_excel_vgood', type: 'checkbox', label: 'Excel ດີຫຼາຍ', pageIndex: 0, x: 238, y: 357, section: 'ທັກສະຄອມພິວເຕີ' },
      { id: 'com_excel_good', type: 'checkbox', label: 'Excel ດີ', pageIndex: 0, x: 316, y: 357, section: 'ທັກສະຄອມພິວເຕີ' },
      { id: 'com_excel_weak', type: 'checkbox', label: 'Excel ອ່ອນ', pageIndex: 0, x: 394, y: 357, section: 'ທັກສະຄອມພິວເຕີ' },
      { id: 'com_ppt_vgood', type: 'checkbox', label: 'PPT ດີຫຼາຍ', pageIndex: 0, x: 238, y: 339, section: 'ທັກສະຄອມພິວເຕີ' },
      { id: 'com_ppt_good', type: 'checkbox', label: 'PPT ດີ', pageIndex: 0, x: 316, y: 339, section: 'ທັກສະຄອມພິວເຕີ' },
      { id: 'com_ppt_weak', type: 'checkbox', label: 'PPT ອ່ອນ', pageIndex: 0, x: 394, y: 339, section: 'ທັກສະຄອມພິວເຕີ' },
      { id: 'com_other', type: 'text', label: 'ໂປຣແກຣມອື່ນໆ', pageIndex: 0, x: 115, y: 321, section: 'ທັກສະຄອມພິວເຕີ', colSpan: 2 },

      { id: 'lang_eng_read_good', type: 'checkbox', label: 'ອັງກິດ ອ່ານ ດີ', pageIndex: 1, x: 177, y: 743, section: 'ທັກສະພາສາ' },
      { id: 'lang_eng_read_fair', type: 'checkbox', label: 'ອັງກິດ ອ່ານ ພໍໃຊ້', pageIndex: 1, x: 213, y: 743, section: 'ທັກສະພາສາ' },
      { id: 'lang_eng_read_weak', type: 'checkbox', label: 'ອັງກິດ ອ່ານ ອ່ອນ', pageIndex: 1, x: 249, y: 743, section: 'ທັກສະພາສາ' },
      { id: 'lang_eng_write_good', type: 'checkbox', label: 'ອັງກິດ ຂຽນ ດີ', pageIndex: 1, x: 284, y: 743, section: 'ທັກສະພາສາ' },
      { id: 'lang_eng_write_fair', type: 'checkbox', label: 'ອັງກິດ ຂຽນ ພໍໃຊ້', pageIndex: 1, x: 320, y: 743, section: 'ທັກສະພາສາ' },
      { id: 'lang_eng_write_weak', type: 'checkbox', label: 'ອັງກິດ ຂຽນ ອ່ອນ', pageIndex: 1, x: 356, y: 743, section: 'ທັກສະພາສາ' },
      { id: 'lang_eng_speak_good', type: 'checkbox', label: 'ອັງກິດ ເວົ້າ ດີ', pageIndex: 1, x: 391, y: 743, section: 'ທັກສະພາສາ' },
      { id: 'lang_eng_speak_fair', type: 'checkbox', label: 'ອັງກິດ ເວົ້າ ພໍໃຊ້', pageIndex: 1, x: 427, y: 743, section: 'ທັກສະພາສາ' },
      { id: 'lang_eng_speak_weak', type: 'checkbox', label: 'ອັງກິດ ເວົ້າ ອ່ອນ', pageIndex: 1, x: 463, y: 743, section: 'ທັກສະພາສາ' },

      { id: 'lang_chi_read_good', type: 'checkbox', label: 'ຈີນ ອ່ານ ດີ', pageIndex: 1, x: 177, y: 725, section: 'ທັກສະພາສາ' },
      { id: 'lang_chi_read_fair', type: 'checkbox', label: 'ຈີນ ອ່ານ ພໍໃຊ້', pageIndex: 1, x: 213, y: 725, section: 'ທັກສະພາສາ' },
      { id: 'lang_chi_read_weak', type: 'checkbox', label: 'ຈີນ ອ່ານ ອ່ອນ', pageIndex: 1, x: 249, y: 725, section: 'ທັກສະພາສາ' },
      { id: 'lang_chi_write_good', type: 'checkbox', label: 'ຈີນ ຂຽນ ດີ', pageIndex: 1, x: 284, y: 725, section: 'ທັກສະພາສາ' },
      { id: 'lang_chi_write_fair', type: 'checkbox', label: 'ຈີນ ຂຽນ ພໍໃຊ້', pageIndex: 1, x: 320, y: 725, section: 'ທັກສະພາສາ' },
      { id: 'lang_chi_write_weak', type: 'checkbox', label: 'ຈີນ ຂຽນ ອ່ອນ', pageIndex: 1, x: 356, y: 725, section: 'ທັກສະພາສາ' },
      { id: 'lang_chi_speak_good', type: 'checkbox', label: 'ຈີນ ເວົ້າ ດີ', pageIndex: 1, x: 391, y: 725, section: 'ທັກສະພາສາ' },
      { id: 'lang_chi_speak_fair', type: 'checkbox', label: 'ຈີນ ເວົ້າ ພໍໃຊ້', pageIndex: 1, x: 427, y: 725, section: 'ທັກສະພາສາ' },
      { id: 'lang_chi_speak_weak', type: 'checkbox', label: 'ຈີນ ເວົ້າ ອ່ອນ', pageIndex: 1, x: 463, y: 725, section: 'ທັກສະພາສາ' },
      { id: 'lang_vie_read_good', type: 'checkbox', label: 'ຫວຽດ ອ່ານ ດີ', pageIndex: 1, x: 177, y: 707, section: 'ທັກສະພາສາ' },
      { id: 'lang_vie_read_fair', type: 'checkbox', label: 'ຫວຽດ ອ່ານ ພໍໃຊ້', pageIndex: 1, x: 213, y: 707, section: 'ທັກສະພາສາ' },
      { id: 'lang_vie_read_weak', type: 'checkbox', label: 'ຫວຽດ ອ່ານ ອ່ອນ', pageIndex: 1, x: 249, y: 707, section: 'ທັກສະພາສາ' },
      { id: 'lang_vie_write_good', type: 'checkbox', label: 'ຫວຽດ ຂຽນ ດີ', pageIndex: 1, x: 284, y: 707, section: 'ທັກສະພາສາ' },
      { id: 'lang_vie_write_fair', type: 'checkbox', label: 'ຫວຽດ ຂຽນ ພໍໃຊ້', pageIndex: 1, x: 320, y: 707, section: 'ທັກສະພາສາ' },
      { id: 'lang_vie_write_weak', type: 'checkbox', label: 'ຫວຽດ ຂຽນ ອ່ອນ', pageIndex: 1, x: 356, y: 707, section: 'ທັກສະພາສາ' },
      { id: 'lang_vie_speak_good', type: 'checkbox', label: 'ຫວຽດ ເວົ້າ ດີ', pageIndex: 1, x: 391, y: 707, section: 'ທັກສະພາສາ' },
      { id: 'lang_vie_speak_fair', type: 'checkbox', label: 'ຫວຽດ ເວົ້າ ພໍໃຊ້', pageIndex: 1, x: 427, y: 707, section: 'ທັກສະພາສາ' },
      { id: 'lang_vie_speak_weak', type: 'checkbox', label: 'ຫວຽດ ເວົ້າ ອ່ອນ', pageIndex: 1, x: 463, y: 707, section: 'ທັກສະພາສາ' },

      { id: 'lang_hmong_read_good', type: 'checkbox', label: 'ມ້ງ ອ່ານ ດີ', pageIndex: 1, x: 177, y: 689, section: 'ທັກສະພາສາ' },
      { id: 'lang_hmong_read_fair', type: 'checkbox', label: 'ມ້ງ ອ່ານ ພໍໃຊ້', pageIndex: 1, x: 213, y: 689, section: 'ທັກສະພາສາ' },
      { id: 'lang_hmong_read_weak', type: 'checkbox', label: 'ມ້ງ ອ່ານ ອ່ອນ', pageIndex: 1, x: 249, y: 689, section: 'ທັກສະພາສາ' },
      { id: 'lang_hmong_write_good', type: 'checkbox', label: 'ມ້ງ ຂຽນ ດີ', pageIndex: 1, x: 284, y: 689, section: 'ທັກສະພາສາ' },
      { id: 'lang_hmong_write_fair', type: 'checkbox', label: 'ມ້ງ ຂຽນ ພໍໃຊ້', pageIndex: 1, x: 320, y: 689, section: 'ທັກສະພາສາ' },
      { id: 'lang_hmong_write_weak', type: 'checkbox', label: 'ມ້ງ ຂຽນ ອ່ອນ', pageIndex: 1, x: 356, y: 689, section: 'ທັກສະພາສາ' },
      { id: 'lang_hmong_speak_good', type: 'checkbox', label: 'ມ້ງ ເວົ້າ ດີ', pageIndex: 1, x: 391, y: 689, section: 'ທັກສະພາສາ' },
      { id: 'lang_hmong_speak_fair', type: 'checkbox', label: 'ມ້ງ ເວົ້າ ພໍໃຊ້', pageIndex: 1, x: 427, y: 689, section: 'ທັກສະພາສາ' },
      { id: 'lang_hmong_speak_weak', type: 'checkbox', label: 'ມ້ງ ເວົ້າ ອ່ອນ', pageIndex: 1, x: 463, y: 689, section: 'ທັກສະພາສາ' },

      { id: 'lang_other_name', type: 'text', label: 'ພາສາອື່ນໆ', pageIndex: 1, x: 80, y: 671, section: 'ທັກສະພາສາ', colSpan: 2 },
      { id: 'lang_other_read_good', type: 'checkbox', label: 'ອື່ນໆ ອ່ານ ດີ', pageIndex: 1, x: 177, y: 671, section: 'ທັກສະພາສາ' },
      { id: 'lang_other_read_fair', type: 'checkbox', label: 'ອື່ນໆ ອ່ານ ພໍໃຊ້', pageIndex: 1, x: 213, y: 671, section: 'ທັກສະພາສາ' },
      { id: 'lang_other_read_weak', type: 'checkbox', label: 'ອື່ນໆ ອ່ານ ອ່ອນ', pageIndex: 1, x: 249, y: 671, section: 'ທັກສະພາສາ' },
      { id: 'lang_other_write_good', type: 'checkbox', label: 'ອື່ນໆ ຂຽນ ດີ', pageIndex: 1, x: 284, y: 671, section: 'ທັກສະພາສາ' },
      { id: 'lang_other_write_fair', type: 'checkbox', label: 'ອື່ນໆ ຂຽນ ພໍໃຊ້', pageIndex: 1, x: 320, y: 671, section: 'ທັກສະພາສາ' },
      { id: 'lang_other_write_weak', type: 'checkbox', label: 'ອື່ນໆ ຂຽນ ອ່ອນ', pageIndex: 1, x: 356, y: 671, section: 'ທັກສະພາສາ' },
      { id: 'lang_other_speak_good', type: 'checkbox', label: 'ອື່ນໆ ເວົ້າ ດີ', pageIndex: 1, x: 391, y: 671, section: 'ທັກສະພາສາ' },
      { id: 'lang_other_speak_fair', type: 'checkbox', label: 'ອື່ນໆ ເວົ້າ ພໍໃຊ້', pageIndex: 1, x: 427, y: 671, section: 'ທັກສະພາສາ' },
      { id: 'lang_other_speak_weak', type: 'checkbox', label: 'ອື່ນໆ ເວົ້າ ອ່ອນ', pageIndex: 1, x: 463, y: 671, section: 'ທັກສະພາສາ' },

      { id: 'hobbies', type: 'text', label: 'ວຽກອະດິເລກ', pageIndex: 1, x: 0, y: 0, section: 'ອື່ນໆ' },
      { id: 'talents', type: 'text', label: 'ຄວາມສາມາດພິເສດ', pageIndex: 1, x: 0, y: 0, section: 'ອື່ນໆ' },
      { id: 'emp1_company', type: 'text', label: 'ບໍລິສັດ 1', pageIndex: 1, x: 42, y: 596, section: 'ປະສົບການເຮັດວຽກ' },
      { id: 'emp1_start', type: 'text', label: 'ວັນເລີ່ມ 1', pageIndex: 1, x: 120, y: 596, section: 'ປະສົບການເຮັດວຽກ' },
      { id: 'emp1_end', type: 'text', label: 'ວັນສີ້ນສຸດ 1', pageIndex: 1, x: 190, y: 596, section: 'ປະສົບການເຮັດວຽກ' },
      { id: 'emp1_pos', type: 'text', label: 'ຕຳແໜ່ງ 1', pageIndex: 1, x: 270, y: 596, section: 'ປະສົບການເຮັດວຽກ' },
      { id: 'emp1_salary', type: 'text', label: 'ເງິນເດືອນ 1', pageIndex: 1, x: 360, y: 596, section: 'ປະສົບການເຮັດວຽກ' },
      { id: 'emp1_reason', type: 'text', label: 'ເຫດຜົນອອກ 1', pageIndex: 1, x: 415, y: 596, section: 'ປະສົບການເຮັດວຽກ' },
      { id: 'emp1_desc', type: 'textarea', label: 'ໜ້າທີ່ 1', pageIndex: 1, x: 42, y: 574, section: 'ປະສົບການເຮັດວຽກ', colSpan: 2 },
      { id: 'emp2_company', type: 'text', label: 'ບໍລິສັດ 2', pageIndex: 1, x: 42, y: 540, section: 'ປະສົບການເຮັດວຽກ' },
      { id: 'emp2_start', type: 'text', label: 'ວັນເລີ່ມ 2', pageIndex: 1, x: 120, y: 540, section: 'ປະສົບການເຮັດວຽກ' },
      { id: 'emp2_end', type: 'text', label: 'ວັນສີ້ນສຸດ 2', pageIndex: 1, x: 190, y: 540, section: 'ປະສົບການເຮັດວຽກ' },
      { id: 'emp2_pos', type: 'text', label: 'ຕຳແໜ່ງ 2', pageIndex: 1, x: 270, y: 540, section: 'ປະສົບການເຮັດວຽກ' },
      { id: 'emp2_salary', type: 'text', label: 'ເງິນເດືອນ 2', pageIndex: 1, x: 360, y: 540, section: 'ປະສົບການເຮັດວຽກ' },
      { id: 'emp2_reason', type: 'text', label: 'ເຫດຜົນອອກ 2', pageIndex: 1, x: 415, y: 540, section: 'ປະສົບການເຮັດວຽກ' },
      { id: 'emp2_desc', type: 'textarea', label: 'ໜ້າທີ່ 2', pageIndex: 1, x: 42, y: 518, section: 'ປະສົບການເຮັດວຽກ', colSpan: 2 },

      { id: 'emg_name', type: 'text', label: 'ຊື່ຕິດຕໍ່ສຸກເສີນ', pageIndex: 1, x: 80, y: 462, section: 'ບຸກຄົນອ້າງອີງ/ຕິດຕໍ່ສຸກເສີນ' },
      { id: 'emg_address', type: 'text', label: 'ທີ່ຢູ່', pageIndex: 1, x: 190, y: 462, section: 'ບຸກຄົນອ້າງອີງ/ຕິດຕໍ່ສຸກເສີນ' },
      { id: 'emg_phone', type: 'text', label: 'ເບີໂທ', pageIndex: 1, x: 330, y: 462, section: 'ບຸກຄົນອ້າງອີງ/ຕິດຕໍ່ສຸກເສີນ' },
      { id: 'emg_relation', type: 'text', label: 'ຄວາມສຳພັນ', pageIndex: 1, x: 435, y: 462, section: 'ບຸກຄົນອ້າງອີງ/ຕິດຕໍ່ສຸກເສີນ' },

      { id: 'sign_date', type: 'text', label: 'ວັນທີລົງຊື່', pageIndex: 1, x: 120, y: 355, section: 'ການຢືນຢັນ' },
    ]
  },
};
