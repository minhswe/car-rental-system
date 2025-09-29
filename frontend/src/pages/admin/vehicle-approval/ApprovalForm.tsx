import React, { useState } from "react";
import { Button, Descriptions, Space, Image, Modal } from "antd";
import { ApprovalVehicleForm } from "@/common/types/vehicle.type";
import TextArea from "antd/es/input/TextArea";
import { ReviewAction } from "@/common/types/index";

interface ApprovalFormProps {
  vehicle: ApprovalVehicleForm;
  onAction: (vehicleId: string, action: ReviewAction, reason?: string) => void;
  onClose: () => void;
}

const ApprovalForm: React.FC<ApprovalFormProps> = ({
  vehicle,
  onAction,
  onClose,
}) => {
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const [actionType, setActionType] = useState<ReviewAction | null>(null);

  const [comment, setComment] = useState("");

  const showCommentModal = (action: ReviewAction) => {
    setActionType(action);
    setComment("");
    setIsCommentModalVisible(true);
  };

  const handleCommentSubmit = () => {
    if (vehicle._id && actionType) {
      onAction(vehicle._id, actionType, comment);
      setIsCommentModalVisible(false);
    }
  };

  const handleCommentCancel = () => {
    setIsCommentModalVisible(false);
    setActionType(null);
    setComment("");
  };

  return (
    <div>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Descriptions bordered column={2} title="Vehicle Details">
          <Descriptions.Item label="Make">{vehicle.make}</Descriptions.Item>
          <Descriptions.Item label="Model">{vehicle.model}</Descriptions.Item>
          <Descriptions.Item label="License Plate">
            {vehicle.licensePlate}
          </Descriptions.Item>
          <Descriptions.Item label="Fuel Type">
            {vehicle.fuelType}
          </Descriptions.Item>
          <Descriptions.Item label="Transmission">
            {vehicle.transmission}
          </Descriptions.Item>
          <Descriptions.Item label="Features">
            {vehicle.features?.join(", ") || "None"}
          </Descriptions.Item>
          <Descriptions.Item label="Price Per Day">
            {vehicle.pricePerDay
              ? vehicle.pricePerDay.toLocaleString("vi-VN")
              : "N/A"}{" "}
            VND
          </Descriptions.Item>
          <Descriptions.Item label="Compulsory Insurance">
            {vehicle.compulsoryInsurance}
          </Descriptions.Item>
          <Descriptions.Item label="Booking Count">
            {vehicle.bookingCount}
          </Descriptions.Item>
          <Descriptions.Item label="Provider Username">
            {vehicle.providerUsername ? vehicle.providerUsername : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {vehicle.vehicleStatus}
          </Descriptions.Item>
          <Descriptions.Item label="Vehicle Images" span={2}>
            {vehicle.files && vehicle.files.length > 0 ? (
              <Image.PreviewGroup>
                <Space wrap size="small">
                  {vehicle.files.map((file, index) => (
                    <Image
                      key={index}
                      src={`${import.meta.env.VITE_API_BASE_URL}${file}`}
                      alt={`Vehicle Image ${index + 1}`}
                      width={80}
                      height={80}
                      style={{ objectFit: "cover", borderRadius: 4 }}
                      preview
                    />
                  ))}
                </Space>
              </Image.PreviewGroup>
            ) : (
              "No Images Available"
            )}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Space
        style={{
          marginTop: 16,
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          type="primary"
          style={{ backgroundColor: "#52c41a" }}
          onClick={() => showCommentModal(ReviewAction.APPROVE)}
          disabled={!vehicle._id}
        >
          Approve
        </Button>
        <Button
          danger
          onClick={() => showCommentModal(ReviewAction.REJECT)}
          disabled={!vehicle._id}
        >
          Reject
        </Button>
        <Button onClick={onClose}>Close</Button>
      </Space>
      <Modal
        title={`${
          actionType === ReviewAction.APPROVE
            ? ReviewAction.APPROVE
            : ReviewAction.REJECT
        } Vehicle`}
        open={isCommentModalVisible}
        onOk={handleCommentSubmit}
        okButtonProps={{
          disabled:
            actionType === ReviewAction.REJECT && comment.trim().length === 0,
        }}
        onCancel={handleCommentCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment or reason for this action"
        />
      </Modal>
    </div>
  );
};

export default ApprovalForm;
