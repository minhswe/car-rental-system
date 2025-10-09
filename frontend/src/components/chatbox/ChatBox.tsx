import { useState } from "react";
import { FloatButton, Modal, Input, List, Typography } from "antd";
import { MessageOutlined, SendOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface ChatUser {
  id: string;
  name: string;
}

const ChatBox: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Danh sách user giả lập
  const chatUsers: ChatUser[] = [
    { id: "u1", name: "Nguyễn Văn A" },
    { id: "u2", name: "Trần Thị B" },
    { id: "u3", name: "Phạm Minh C" },
  ];

  const handleOpenChat = () => {
    setIsModalOpen(true);
  };

  const handleCloseChat = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSendMessage = () => {
    if (!selectedUser) return;
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");
      // Giả lập phản hồi bot
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm.",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      <FloatButton
        icon={<MessageOutlined />}
        type="primary"
        style={{ right: 24, bottom: 24 }}
        onClick={handleOpenChat}
      />
      <Modal
        title="Hỗ trợ trực tuyến"
        open={isModalOpen}
        onCancel={handleCloseChat}
        footer={null}
        width={1200}
        style={{ top: "10%" }}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ display: "flex", height: 500 }}>
          {/* Cột trái: Danh sách user */}
          <div
            style={{
              width: "30%",
              borderRight: "1px solid #f0f0f0",
              overflowY: "auto",
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={chatUsers}
              renderItem={(user) => (
                <List.Item
                  onClick={() => setSelectedUser(user.id)}
                  style={{
                    cursor: "pointer",
                    background:
                      selectedUser === user.id ? "#e6f7ff" : "transparent",
                    padding: "12px 16px",
                    transition: "0.2s",
                  }}
                >
                  <Text strong>{user.name}</Text>
                </List.Item>
              )}
            />
          </div>

          {/* Cột phải: Khung chat */}
          <div
            style={{ width: "70%", display: "flex", flexDirection: "column" }}
          >
            {/* Danh sách tin nhắn */}
            <div
              style={{
                flex: 1,
                padding: "16px",
                overflowY: "auto",
                background: "#fafafa",
              }}
            >
              {selectedUser ? (
                <List
                  dataSource={messages}
                  renderItem={(item: Message) => (
                    <List.Item
                      style={{
                        justifyContent:
                          item.sender === "user" ? "flex-end" : "flex-start",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "70%",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background:
                            item.sender === "user" ? "#1890ff" : "#f0f0f0",
                          color: item.sender === "user" ? "#fff" : "#000",
                        }}
                      >
                        {item.text}
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999",
                  }}
                >
                  <Text>Chọn người dùng để bắt đầu trò chuyện</Text>
                </div>
              )}
            </div>

            {/* Input gửi tin nhắn */}
            <div
              style={{ padding: "12px 16px", borderTop: "1px solid #f0f0f0" }}
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={handleSendMessage}
                disabled={!selectedUser}
                placeholder={
                  selectedUser ? "Nhập tin nhắn..." : "Chọn người dùng để chat"
                }
                suffix={
                  <SendOutlined
                    onClick={handleSendMessage}
                    style={{
                      cursor: selectedUser ? "pointer" : "not-allowed",
                      color: selectedUser ? "#1890ff" : "#ccc",
                    }}
                  />
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChatBox;
