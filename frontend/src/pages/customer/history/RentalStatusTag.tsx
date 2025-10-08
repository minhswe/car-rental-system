import React from "react";
import { Tag } from "antd";

interface Props {
  status: string;
}

const RentalStatusTag: React.FC<Props> = ({ status }) => {
  let color = "blue";
  if (status === "pending") color = "orange";
  if (status === "confirmed") color = "green";
  if (status === "canceled") color = "red";
  if (status === "completed") color = "gray";

  return <Tag color={color}>{status.toUpperCase()}</Tag>;
};

export default RentalStatusTag;
