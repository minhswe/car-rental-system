import React, { useEffect } from "react";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationPlacement =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "top"
  | "bottom";

type NotificationProps = {
  open: boolean;
  type: NotificationType;
  message: string;
  description?: string;
  placement?: NotificationPlacement;
  duration?: number;
  showProgress?: boolean;
  onClose?: () => void;
};

const Notify: React.FC<NotificationProps> = ({
  open = false,
  type = "info",
  message = "Notification",
  description = "",
  placement = "topRight",
  duration = 3,
  showProgress = true,
  onClose,
}) => {
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    if (open) {
      api[type]({
        message,
        description,
        placement,
        duration,
        showProgress,
        onClose,
      });
    }
  }, [open, type, message, description, placement, duration, api, onClose]);

  return <>{contextHolder}</>;
};

export default Notify;
