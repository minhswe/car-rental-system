import React, { useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  Image,
  Row,
  Col,
  message,
} from "antd";
import { UploadFile } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import { formatVND, parseVND } from "@/common/utils/format";
import {
  VehicleMake,
  VehicleFuelType,
  VehicleTransmission,
  VehicleStatus,
  CompulsoryInsurance,
  VehicleFeature,
} from "@/common/types";
import { Vehicle } from "@/common/types/vehicle.type";

interface VehicleFormProps {
  form: any;
  onSubmit: (values: Omit<Vehicle, "id"> & { files: string[] }) => void;
  onCancel: () => void;
  isPending: boolean;
  isEditable: boolean;
  mode?: "create" | "edit" | "view";
  initialValues?: Omit<Vehicle, "_id"> & { files: string[] };
}

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const VehicleForm: React.FC<VehicleFormProps> = ({
  form,
  onSubmit,
  onCancel,
  mode,
  isPending,
  isEditable,
  initialValues,
}) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");

  useEffect(() => {
    if (!initialValues) {
      setFileList([]);
      form.resetFields();
      return;
    }
    if (initialValues) {
      form.setFieldsValue(initialValues);
      const initialFiles: UploadFile[] = (initialValues.files || []).map(
        (files: string, index: number) => ({
          uid: `-${index}`,
          name: files.split("/").pop() || `image-${index}.png`,
          status: "done" as const,
          url: `${import.meta.env.VITE_API_BASE_URL}${files}`,
        })
      );
      setFileList(initialFiles);
    }
  }, [initialValues, form]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = async ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    const updated = await Promise.all(
      newFileList.map(async (file) => {
        if (file.originFileObj && !file.url) {
          try {
            const base64 = await getBase64(file.originFileObj as File);
            return { ...file, url: base64 };
          } catch (err) {
            message.error("Lỗi khi chuyển đổi tệp sang base64");
            return file;
          }
        }
        return file;
      })
    );
    setFileList(updated);
  };

  const customRules = [
    {
      validator: async () => {
        if (fileList.length === 0) {
          return Promise.reject(
            new Error("Vui lòng tải lên ít nhất 1 hình ảnh")
          );
        }
        if (fileList.length > 5) {
          return Promise.reject(
            new Error("Chỉ được tải lên tối đa 5 hình ảnh")
          );
        }
        for (const file of fileList) {
          const isImage =
            file.type?.startsWith("image/") ||
            file.name?.match(/\.(jpg|jpeg|png)$/i);
          if (!isImage) {
            return Promise.reject(new Error("Chỉ chấp nhận hình JPG/PNG"));
          }
          const sizeOk =
            !file.originFileObj || file.originFileObj.size / 1024 / 1024 < 2;
          if (!sizeOk) {
            return Promise.reject(
              new Error("Kích thước hình phải nhỏ hơn 2MB")
            );
          }
        }
        return Promise.resolve();
      },
    },
  ];

  const beforeUpload = () => false;

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </button>
  );

  const handleFinish = (values: any) => {
    const files = fileList.map((file) => file.url as string);
    onSubmit({ ...values, files });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="make"
            label="Hãng xe"
            rules={[{ required: true, message: "Vui lòng chọn hãng xe" }]}
          >
            <Select
              showSearch
              placeholder="Chọn hãng xe"
              options={Object.values(VehicleMake).map((m) => ({
                value: m,
                label: m,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="model"
            label="Mẫu xe"
            rules={[{ required: true, message: "Vui lòng nhập mẫu xe" }]}
          >
            <Input placeholder="Nhập mẫu xe" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="licensePlate"
            label="Biển số xe (VD: 50A12345)"
            rules={[{ required: true, message: "Vui lòng nhập biển số xe" }]}
          >
            <Input placeholder="Nhập biển số xe" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="fuelType"
            label="Loại nhiên liệu"
            rules={[
              { required: true, message: "Vui lòng chọn loại nhiên liệu" },
            ]}
          >
            <Select
              placeholder="Chọn loại nhiên liệu"
              options={Object.values(VehicleFuelType).map((t) => ({
                value: t,
                label: t,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="transmission"
            label="Hộp số"
            rules={[{ required: true, message: "Vui lòng chọn hộp số" }]}
          >
            <Select
              placeholder="Chọn loại hộp số"
              options={Object.values(VehicleTransmission).map((t) => ({
                value: t,
                label: t,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="vehicleStatus"
            label="Trạng thái xe"
            initialValue={VehicleStatus.WAITING_FOR_APPROVAL}
          >
            <Select
              placeholder="Chọn trạng thái"
              options={Object.values(VehicleStatus).map((s) => {
                if (mode === "create") {
                  return {
                    value: s,
                    label: s,
                    disabled: s !== VehicleStatus.WAITING_FOR_APPROVAL,
                  };
                } else if (mode === "edit") {
                  return {
                    value: s,
                    label: s,
                    disabled:
                      s === VehicleStatus.REJECTED ||
                      s === VehicleStatus.WAITING_FOR_APPROVAL ||
                      s === VehicleStatus.BOOKED,
                  };
                }
                return { value: s, label: s };
              })}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="pricePerDay"
            label="Giá thuê mỗi ngày (VNĐ)"
            rules={[
              { required: true, message: "Vui lòng nhập giá thuê mỗi ngày" },
            ]}
          >
            <InputNumber
              formatter={formatVND}
              parser={parseVND}
              placeholder="Nhập giá thuê (VNĐ)"
              min={0}
              step={50000}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="compulsoryInsurance"
            label="Bảo hiểm dân sự bắt buộc"
            rules={[{ required: true, message: "Vui lòng chọn loại bảo hiểm" }]}
          >
            <Select
              placeholder="Chọn bảo hiểm"
              options={Object.values(CompulsoryInsurance).map((c) => ({
                value: c,
                label: c,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Thêm phần địa chỉ */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="province"
            label="Tỉnh / Thành phố"
            rules={[
              { required: true, message: "Vui lòng chọn tỉnh/thành phố" },
            ]}
          >
            <Select
              placeholder="Chọn tỉnh / thành phố"
              options={[{ value: "Hồ Chí Minh", label: "Hồ Chí Minh" }]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="addressDetail"
            label="Địa chỉ cụ thể"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ cụ thể" },
            ]}
          >
            <Input placeholder="Nhập địa chỉ (VD: 123 Nguyễn Văn Cừ, Quận 5)" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="seats"
            label="Số ghế ngồi"
            rules={[{ required: true, message: "Vui lòng nhập số ghế" }]}
          >
            <InputNumber
              placeholder="Nhập số ghế"
              min={2}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="color"
            label="Màu xe"
            rules={[{ required: true, message: "Vui lòng nhập màu xe" }]}
          >
            <Input placeholder="Nhập màu xe" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="features" label="Tính năng">
            <Select
              mode="tags"
              placeholder="Nhập tính năng (VD: GPS, Bluetooth)"
              options={Object.values(VehicleFeature).map((f) => ({
                value: f,
                label: f,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="files" label="Hình ảnh" rules={customRules}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onPreview={handlePreview}
              onChange={handleChange}
              maxCount={5}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>

            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (vis) => setPreviewOpen(vis),
                  afterOpenChange: (vis) => !vis && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>
        </Col>
      </Row>

      {isEditable && (
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            {initialValues ? "Cập nhật" : "Tạo mới"}
          </Button>
          <Button onClick={onCancel} className="ml-2">
            Hủy
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default VehicleForm;
