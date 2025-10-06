import React from "react";
import { DatePicker, Checkbox, Select, Space } from "antd";

const { RangePicker } = DatePicker;

interface FilterBarProps {
  filters: {
    startDate: Date | null;
    endDate: Date | null;
    seatType: number[];
    make: string[] | null;
  };
  onChange: (filters: Partial<FilterBarProps["filters"]>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange }) => {
  return (
    <Space direction="vertical" size="middle" style={{ width: "!00%" }}>
      <RangePicker
        style={{ width: "100%" }}
        onChange={(date) => {
          onChange({
            startDate: date?.[0]?.toDate() ?? null,
            endDate: date?.[1]?.toDate() ?? null,
          });
        }}
      />

      <Checkbox.Group
        options={[
          { label: "5 Seats", value: 5 },
          { label: "7 Seats", value: 7 },
        ]}
        value={filters.seatType}
        onChange={(value) => onChange({ seatType: value as number[] })}
      />

      <Select
        placeholder="Select Make"
        style={{ width: "100%" }}
        value={filters.make || undefined}
        onChange={(value) => {
          onChange({ make: value || null });
        }}
        allowClear
        options={[
          { label: "Toyota", value: "Toyota" },
          { label: "Honda", value: "Honda" },
        ]}
      />
    </Space>
  );
};

export default FilterBar;
