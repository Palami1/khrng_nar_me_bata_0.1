import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

import fontkit from '@pdf-lib/fontkit';

export const generateLaosPDF = async (templateUrl: string, userData: any, config: any) => {
  try {
    // 1. Load resources
    const [pdfBytes, fontBytes] = await Promise.all([
      fetch(templateUrl).then(res => {
        if (!res.ok) throw new Error(`Template 404: ${res.status}`);
        return res.arrayBuffer();
      }),
      fetch('/fonts/Phetsarath OT.ttf').then(res => {
        if (!res.ok) throw new Error(`Font 404: ${res.status}`);
        return res.arrayBuffer();
      })
    ]);

    const pdfDoc = await PDFDocument.load(pdfBytes);
    pdfDoc.registerFontkit(fontkit);
    
    // Embed Lao font (subset: true has been reported to help with spacing issues)
    const laosFont = await pdfDoc.embedFont(fontBytes, { subset: true });
    const helveticaFont = await pdfDoc.embedStandardFont(StandardFonts.Helvetica);
    
    const pages = pdfDoc.getPages();

    // 4. Draw fields
    config.fields.forEach((field: any) => {
      const page = pages[field.pageIndex || 0];
      if (!page) {
        console.warn(`Warning: Page index ${field.pageIndex || 0} not found in PDF for field ${field.id}`);
        return;
      }
      let value = userData[field.id];

      // Normalize string and handle potential spacing issues
      if (typeof value === 'string') {
        value = value.normalize('NFC');
      }

      // Auto-tick logic: if text is present, tick the hidden checkbox
      if (config.id === 'FORM_01') {
        const checkField = (targetId: string, sourceId: string) => {
          const sourceValue = userData[sourceId];
          if (field.id === targetId && sourceValue && sourceValue.toString().trim().length > 0) {
            value = true;
          }
        };
        checkField('visa_tourist_cb', 'visa_tourist');
        checkField('visa_study_cb', 'visa_study');
        checkField('other_purpose_cb', 'other_purpose');
      }
      
      if (value !== undefined && value !== null && value !== "" && page) {
        const fontSize = field.fontSize || 11;
        
        if (field.type === 'checkbox') {
          const isChecked = value === true || value === 'true' || value === 'on' || value === '1';
          if (isChecked) {
            // Draw a checkmark using lines
            const cx = field.x + 2; 
            const cy = field.y + 3;
            page.drawLine({
              start: { x: cx, y: cy + 3 },
              end: { x: cx + 3, y: cy },
              thickness: 1.5,
              color: rgb(0, 0.31, 0.63),
            });
            page.drawLine({
              start: { x: cx + 3, y: cy },
              end: { x: cx + 9, y: cy + 8 },
              thickness: 1.5,
              color: rgb(0, 0.31, 0.63),
            });
          }
        } else if (field.type === 'textarea') {
          const maxWidth = field.maxWidth || 350;
          const lineHeight = field.lineHeight || 15;
          let yOffset = field.y;
          
          const rawLines = value.toString().split("\n");
          const segmenter = new Intl.Segmenter('lo', { granularity: 'grapheme' });

          rawLines.forEach((rLine: string) => {
            let tempLine = "";
            const segments = segmenter.segment(rLine);
            
            for (const { segment } of segments) {
              const testLine = tempLine + segment;
              const textWidth = laosFont.widthOfTextAtSize(testLine, fontSize);
              
              if (textWidth > maxWidth) {
                page.drawText(tempLine, { 
                  x: field.x, 
                  y: yOffset, 
                  size: fontSize, 
                  font: laosFont, 
                  color: rgb(0, 0, 0) 
                });
                tempLine = segment;
                yOffset -= lineHeight;
              } else {
                tempLine = testLine;
              }
            }
            if (tempLine) {
              page.drawText(tempLine, { 
                x: field.x, 
                y: yOffset, 
                size: fontSize, 
                font: laosFont, 
                color: rgb(0, 0, 0) 
              });
              yOffset -= lineHeight;
            }
          });
        } else {
          // Use normalization and prevent extra spacing for single line text
          const normalizedValue = value.toString().normalize('NFC');
          
          page.drawText(normalizedValue, {
            x: field.x,
            y: field.y,
            size: fontSize,
            font: laosFont,
            color: rgb(0, 0, 0),
          });
        }
      }
    });

    const pdfBytesFinal = await pdfDoc.save();
    return URL.createObjectURL(new Blob([pdfBytesFinal.buffer as any], { type: 'application/pdf' }));
  } catch (err: any) {
    console.error("PDF ERROR:", err);
    alert("PDF ERROR: " + err.message);
    throw err;
  }
};
