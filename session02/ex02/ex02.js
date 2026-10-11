// Module tính cước chuyến đi GrabRide
const distanceKm = 4;
const isRaining = false;

const baseFare = 12000;
const pricePerAdditionalKm = 4500;
const weatherMultiplier = 1.2;

let totalFare = 0;

if (distanceKm <= 2) {
  totalFare = baseFare;
} else {
  totalFare = baseFare + distanceKm * pricePerAdditionalKm;
}

if (isRaining) {
  totalFare = totalFare * weatherMultiplier;
}

console.log('Khoảng cách di chuyển:', distanceKm, 'km');
console.log('Tổng cước phí chuyến đi:', totalFare, 'VNĐ');