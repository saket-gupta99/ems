const PDFDocument = require("pdfkit");
const Salary = require("../models/Salary");

async function generatePaySlip(employeeId, payrollMonth) {
  const salary = await Salary.findOne({ employeeId, payrollMonth });
  if (!salary) throw new Error("Salary record not found");

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 30, size: "A4" });

      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // **Load Custom Font**
      doc.registerFont("NotoSans", "./public/NotoSans-Regular.ttf");
      doc.font("NotoSans");

      const pageWidth = doc.page.width;
      const logoWidth = 150;
      const logoX = (pageWidth - logoWidth) / 2;

      // **Centered Logo**
      //   doc.image("./public/SI.png", logoX, 50, { width: logoWidth });

      // **Company Name & Payslip Title**
      doc.moveDown(2);
      doc.fontSize(20).text("SI Infratech LLP", { align: "center" });
      doc.moveDown(1);
      doc.fontSize(18).text("Employee Payslip", { align: "center" });

      // **Month & Year**
      const [month, year] = payrollMonth.split("-");
      doc.moveDown(0.5);
      doc
        .fontSize(12)
        .text(`For the month of ${month} ${year}`, { align: "center" });

      doc.moveDown(1.5);

      // **Table Setup**
      const tableTop = doc.y;
      const tableLeft = 100;
      const colWidth = 200;
      const rowHeight = 30;
      const tableWidth = colWidth * 2;

      doc
        .rect(tableLeft, tableTop, tableWidth, rowHeight)
        .fill("#f2f2f2")
        .stroke();
      doc
        .font("./public/NotoSans-Bold.ttf")
        .fontSize(12)
        .fillColor("black")
        .text("Details", tableLeft + 10, tableTop + 10);
      doc.text("Amount (₹)", tableLeft + colWidth + 10, tableTop + 10);

      let yPos = tableTop + rowHeight;
      const rows = [
        ["Employee ID:", salary.employeeId],
        ["Basic Salary:", `₹${Number(salary.basicSalary).toFixed(2)}`],
        ["Allowances:", `₹${Number(salary.allowances).toFixed(2)}`],
        ["Bonus:", `₹${Number(salary.bonus).toFixed(2)}`],
        ["Gross Salary:", `₹${Number(salary.grossSalary).toFixed(2)}`],
        ["Deductions:", `₹${Number(salary.deduction).toFixed(2)}`],
        ["Net Salary:", `₹${Number(salary.netSalary).toFixed(2)}`],
      ];

      rows.forEach(([label, value], index) => {
        if (index % 2 === 0)
          doc.rect(tableLeft, yPos, tableWidth, rowHeight).fill("#e6e6e6");
        doc.stroke();

        doc.fillColor("black").font("NotoSans").fontSize(11);
        doc.text(label, tableLeft + 10, yPos + 10);
        doc.text(value, tableLeft + colWidth + 10, yPos + 10);

        yPos += rowHeight;
      });

      doc.moveDown(4);

      // **Footer**
      doc
        .fontSize(10)
        .fillColor("gray")
        .text(
          "This is a computer-generated document. No signature is required.",
          { align: "center" }
        );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function salarySlipHandler(req, res) {
  try {
    const { employeeId } = req.user.general;
    const { payrollMonth } = req.body;

    if (!employeeId) {
      return res.status(400).json({ message: "employee id is required" });
    }
    if (!payrollMonth) {
      return res.status(400).json({ message: "payroll month is required" });
    }

    // Generate the PDF buffer
    const pdfBuffer = await generatePaySlip(employeeId, payrollMonth);

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=payslip-${employeeId}-${payrollMonth}.pdf`
    );
    res.setHeader("Content-Length", pdfBuffer.length);

    // Send the complete PDF buffer
    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF Generation Error:", err);
    if (!res.headersSent) {
      res.status(500).json({
        message: `Failed to generate payslip: ${err.message}`,
      });
    }
  }
}

module.exports = { salarySlipHandler };
