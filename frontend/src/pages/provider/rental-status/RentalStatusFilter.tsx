import { Select } from "antd";

const { Option } = Select;

interface RentalStatusFilterProps {
  onFilter: (status: string) => void;
}

const RentalStatusFilter: React.FC<RentalStatusFilterProps> = ({
  onFilter,
}) => {
  return (
    <Select
      defaultValue="all"
      style={{ width: 200, marginBottom: 16 }}
      onChange={onFilter}
    >
      <Option value="all">All Statuses</Option>
      <Option value="booked">Booked</Option>
      <Option value="pending">Pending</Option>
      <Option value="canceled">Canceled</Option>
    </Select>
  );
};

export default RentalStatusFilter;
