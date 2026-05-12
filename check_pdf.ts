import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function checkPdfSize() {
    const filePath = path.join(process.cwd(), 'public', 'templates', '20. ແບບຟອມສະໝັກເຂົ້າເຮັດວຽກ (13).pdf');
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const { width, height } = pages[0].getSize();
    console.log(`Page size: ${width} x ${height}`);
    console.log(`Page count: ${pages.length}`);
}

checkPdfSize().catch(console.error);
