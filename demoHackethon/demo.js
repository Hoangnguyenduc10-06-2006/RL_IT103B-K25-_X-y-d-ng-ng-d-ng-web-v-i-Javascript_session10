let choice;
let handleInput;

let currentTicketCode = ""; //Mã phiếu khám hiện tại đã kiểm chuẩn
let isTicketValid = false; //Cờ cho biết mã phiếu hiện tại hợp lệ
let totalRevenue = 0; // Tổng doanh thu ca trực (VNĐ)
let totalVisits = 0; //Tổng số lượt khám đã quyết toán

do {
  let menu = prompt(`==========================
   Hệ thống thu ngân phòng khám Medlatec Clinic
=================================
1. Nhập và kiểm chuẩn mã phiếu khám bệnh
2. Tính viện phí xét nghiệm
3. Thẩm định mã hồ sơ may mắn
0. Thoát chương trình
=============================
Vui lòng nhập lựa chọn của bạn (0 - 3): 
`);
  choice = menu !== null ? menu.trim() : null;

  switch (choice) {
    case "1":
      currentTicketCode = "";
      isTicketValid = false;

      let valueInput = prompt("mã phiếu khám bệnh");

      if (valueInput === null || valueInput.trim() === "") {
        console.log("Chưa nhập mã phiếu!!!");
        isTicketValid = false;
        break;
      }

      handleInput = valueInput.trim().toUpperCase();
      if (handleInput.length < 6) {
        console.log("độ dài nhở hơn 6 ký tự");
        isTicketValid = false;
        break;
      } else if (!handleInput.startsWith("MED-")) {
        console.log("sai tiền tố MED ");
        isTicketValid = false;
        break;
      } else if (handleInput.includes(" ")) {
        console.log("chứa khoảng cách ở giữa");
        isTicketValid = false;
        break;
      }
      currentTicketCode = handleInput;
      isTicketValid = true;
      console.log("lưu phiếu thành công");

      break;
    case "2":
      if (isTicketValid === true) {
        let cancel = false;
        let resultServiceCount;
        let resultPricePerService;

        while (true) {
          let inputServiceCount = prompt(
            "Nhập số lượng chỉ định xét nghiệm (số nguyên > 0):",
          );
          if (inputServiceCount === null) {
            cancel = true;
            break;
          }

          let serviceCount = inputServiceCount.trim();
          let convertNUmber = Number(serviceCount);
          if (
            serviceCount !== "" &&
            !serviceCount.includes(".") &&
            Number.isInteger(convertNUmber) &&
            convertNUmber > 0
          ) {
            resultServiceCount = convertNUmber;
            break;
          }
        }

        if (cancel) {
          console.log("Đã hủy giao dịch tính viện phí.");
          break;
        }

        while (true) {
          let inputPricePerService = prompt(
            "Nhập  đơn giá mỗi chỉ định (VNĐ):",
          );
          if (inputPricePerService === null) {
            cancel = true;
            break;
          }

          let pricePerService = inputPricePerService.trim();
          let convertNUmberPricePerService = Number(pricePerService);
          if (
            pricePerService !== "" &&
            !pricePerService.includes(".") &&
            Number.isInteger(convertNUmberPricePerService) &&
            convertNUmberPricePerService > 0
          ) {
            resultPricePerService = convertNUmberPricePerService;
            break;
          }
        }

        if (cancel) {
          console.log("Đã hủy giao dịch tính viện phí.");
          break;
        }

        // xu ly
        let salePrice;
        let basePrice = resultPricePerService * resultServiceCount;

        if (resultServiceCount >= 4) {
          salePrice = basePrice * 0.1;
        } else {
          salePrice = 0;
        }
        let addPrice = (basePrice - salePrice) * 0.08;

        let totalPrice = basePrice - salePrice + addPrice;

        totalRevenue += totalPrice;
        totalVisits++;

        // In hóa đơn viện phí đầy đủ
        console.log("=".repeat(50));
        console.log("           HÓA ĐƠN VIỆN PHÍ XÉT NGHIỆM            ");
        console.log("=".repeat(50));
        console.log(`Mã phiếu khám     : ${currentTicketCode}`);
        console.log(`Số chỉ định       : ${resultServiceCount}`);
        console.log(
          `Đơn giá/chỉ định  : ${resultPricePerService.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log(
          `Chi phí cơ sở     : ${basePrice.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log(
          `Tiền giảm giá     : ${salePrice.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log(
          `Phụ phí vật tư    : ${addPrice.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log("-".repeat(50));
        console.log(
          `TỔNG THANH TOÁN   : ${totalPrice.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log("=".repeat(50));

        currentTicketCode = "";
        isTicketValid = false;
      } else {
        console.log("vui lòng nhập mã phiếu khám bệnh");
      }
      break;
    case "3":
      let inputValue = prompt(
        `nhập chuỗi số seri trên thẻ hồ sơ bệnh nhân điện tử (chỉ gồm các chữ số).`,
      );

      if (inputValue === null) {
        console.log("cancel thành công!!");
        break;
      }
      if (inputValue.trim() === "") {
        console.log("dữ liệu nhập vào không được bỏ trống!!!");
        break;
      }
      if (/[^0-9]/.test(inputValue.trim())) {
        console.log("dữ liệu nhập vào không hợp lệ!!!");
        break;
      } else if (inputValue.trim().length < 2) {
        console.log("dữ liệu nhập vào không hợp lệ!!!");
        break;
      }

      let checkFullZero = true;
      for (let i = 0; i <= inputValue.trim().length - 1; i++) {
        if (inputValue.trim()[i] !== "0") {
          checkFullZero = false;
          break;
        }
      }

      if (checkFullZero) {
        console.log("dư liệu nhập vào ko hợp lệ");
        break;
      }
      let resultInput = inputValue.trim();

      let reversedInput = resultInput.split("").reverse().join("");
      let isPalindrome = false;
      if (resultInput === reversedInput) {
        isPalindrome = true;
      }
      let digitSum = false;
      let total = 0;
      for (let i = 0; i < resultInput.length; i++) {
        total += Number(resultInput[i]);
      }
      if (total % 9 === 0) {
        digitSum = true;
      }

      let reward = "";
      if (isPalindrome && digitSum) {
        reward =
          "Giải Đặc biệt - Voucher gói khám chuyên sâu miễn phí trị giá 500.000 VNĐ";
      } else if (isPalindrome && !digitSum) {
        reward = "Giải Nhất - Voucher miễn phí khám răng tổng quát 200.000 VNĐ";
      } else if (!isPalindrome && digitSum) {
        reward = "Giải Nhì - Voucher giảm 50.000 VNĐ lần khám kế tiếp";
      } else {
        reward = "Không trúng thưởng";
      }
      // 2. In đầy đủ 5 thông số theo yêu cầu đề bài
      console.log("=".repeat(50));
      console.log("        KẾT QUẢ THẨM ĐỊNH MÃ HỒ SƠ MAY MẮN       ");
      console.log("=".repeat(50));
      console.log(`Mã số gốc           : ${resultInput}`);
      console.log(
        `Mã đảo ngược        : ${reversedInput} (${isPalindrome ? "Đối xứng" : "Không đối xứng"})`,
      );
      console.log(`Tổng chữ số         : ${total}`);
      console.log(`Chia hết cho 9      : ${digitSum ? "Có" : "Không"}`);
      console.log(`Kết quả giải thưởng : ${reward}`);
      console.log("=".repeat(50));
      break;
    case "0":
      console.log("\n" + "=".repeat(50));
      console.log("       BÁO CÁO TỔNG KẾT CA TRỰC PHÒNG KHÁM       ");
      console.log("=".repeat(50));

      if (totalVisits === 0) {
        console.log("Chưa phát sinh lượt khám nào trong ca trực.");
      } else {
        // Tính doanh thu trung bình làm tròn đến đồng
        const averageRevenue = Math.round(totalRevenue / totalVisits);

        console.log(`Tổng số lượt khám đã quyết toán : ${totalVisits} lượt`);
        console.log(
          `Tổng doanh thu ca trực           : ${totalRevenue.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log(
          `Doanh thu trung bình mỗi lượt    : ${averageRevenue.toLocaleString("vi-VN")} VNĐ`,
        );
      }

      console.log("=".repeat(50));
      console.log("Đã đóng ca trực. Thoát chương trình thành công!");
      break;

    default:
      console.log("lựa chọn không hợp lệ!!!");
      break;
  }
} while (choice !== "0");
