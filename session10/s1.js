let borrowRecords = [
  {
    recordId: "PM01",
    studentId: "SV101",
    bookTitle: "Lập trình Java",
    borrowDays: 10,
    isReturned: false,
  },
  {
    recordId: "PM02",
    studentId: "SV102",
    bookTitle: "Cấu trúc dữ liệu",
    borrowDays: 20,
    isReturned: false,
  },
  {
    recordId: "PM03",
    studentId: "SV103",
    bookTitle: "Hệ điều hành",
    borrowDays: 7,
    isReturned: false,
  },
];

console.log("=== DANH SÁCH BAN ĐẦU ===");
console.table(borrowRecords);

borrowRecords.push({
  recordId: "PM04",
  studentId: "SV104",
  bookTitle: "Clean Code",
  borrowDays: 18,
  isReturned: false,
});

console.log("=== ĐÃ THÊM PHIẾU PM04 ===");

console.log("=== KIỂM TRA PHÍ PHẠT QUÁ HẠN (> 14 NGÀY) ===");
for (let i = 0; i < borrowRecords.length; i++) {
  let record = borrowRecords[i];
  if (record.borrowDays > 14) {
    let fine = (record.borrowDays - 14) * 5000;
    console.log(
      `Phiếu ${record.recordId} (${record.bookTitle}) - Quá hạn: ${record.borrowDays - 14} ngày - Tiền phạt: ${fine} VNĐ`,
    );
  }
}

for (let i = 0; i < borrowRecords.length; i++) {
  if (borrowRecords[i].recordId === "PM01") {
    borrowRecords[i].isReturned = true;
    break;
  }
}
console.log("=== ĐÃ CẬP NHẬT PM01 THÀNH ĐÃ TRẢ (isReturned = true) ===");

for (let i = 0; i < borrowRecords.length; i++) {
  if (borrowRecords[i].recordId === "PM03") {
    borrowRecords.splice(i, 1);
    break;
  }
}
console.log("=== ĐÃ XÓA PHIẾU PM03 ===");

console.log("=== BẢNG TỔNG KẾT DANH SÁCH HIỆN TẠI ===");
console.table(borrowRecords);
