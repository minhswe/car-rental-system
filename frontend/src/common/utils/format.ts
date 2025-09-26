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
