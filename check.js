const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function checkPdf() {
    const filePath = path.join(process.cwd(), 'public', 'templates', '20. ແບບຟອມສະໝັກເຂົ້າເຮັດວຽກ (13).pdf');
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const { width, height } = pages[0].getSize();
    console.log(`Page size: ${width} x ${height}`);
    console.log(`Page count: ${pages.length}`);
}

checkPdf().catch(console.error);
