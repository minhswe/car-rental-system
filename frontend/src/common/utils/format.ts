export const formatVND = (value: number | undefined): string => {
  if (value === undefined) return "";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export const parseVND = (value: string | undefined): number => {
  if (!value) return 0;
  return Number(value.replace(/[^0-9]/g, "")) || 0;
};

export const formatVietnamLicensePlate = (plate: string): string => {
  const cleaned = plate.replace(/\s+/g, "").toUpperCase();

  const match = cleaned.match(/^([0-9]{2}[A-Z])(\d{4,5})$/);

  if (!match) return plate;

  const letters = match[1];
  const numbers = match[2];
  if (numbers.length === 5) {
    return `${letters}-${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  }
  if (numbers.length === 4) {
    return `${letters}-${numbers}`;
  }
  return plate;
};
