// Asynchronously close a modal dialog when the OK button is pressed.
// For example, you can use this pattern when you submit a form.
import React, { useState } from "react";
import { Button, Modal } from "antd";

type confirmModalProps = {
  open: boolean;
  title?: string;
  content?: React.ReactNode;
  confirmLoading?: boolean;
  okText?: string;
  cancelText?: string;
  onOk?: () => Promise<void>;
  onCancel?: () => void;
};

export const ConfirmModal: React.FC<confirmModalProps> = ({
  open,
  title = "Confirm",
  content = "Are you sure?",
  confirmLoading = false,
  okText = "OK",
  cancelText = "Cancel",
  onOk = async () => {},
  onCancel = () => {},
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
    >
      <p>{content}</p>
    </Modal>
  );
};
