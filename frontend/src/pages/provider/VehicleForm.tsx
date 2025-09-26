import React from "react";
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
  form: any; // Ant Design Form instance
  onSubmit: (values: Omit<Vehicle, "id"> & { images: string[] }) => void;
  onCancel: () => void;
  isPending: boolean;
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
  isPending,
}) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");

  // Convert & preview
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
    // convert new files to base64
    const updated = await Promise.all(
      newFileList.map(async (file) => {
        if (file.originFileObj && !file.url) {
          try {
            const base64 = await getBase64(file.originFileObj as File);
            return { ...file, url: base64 };
          } catch (err) {
            message.error("Error converting file to base64");
            return file;
          }
        }
        return file;
      })
    );
    setFileList(updated);
  };

  const beforeUpload = () => {
    // Prevent auto upload
    return false;
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleFinish = (values: any) => {
    const images = fileList.map((file) => file.url as string);
    onSubmit({ ...values, images });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="make"
            label="Make"
            rules={[{ required: true, message: "Please select the car make" }]}
          >
            <Select
              showSearch
              placeholder="Select a make"
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
            label="Model"
            rules={[{ required: true, message: "Please enter the car model" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="licensePlate"
            label="License Plate (e.g., 50A12345)"
            rules={[
              { required: true, message: "Please enter the license plate" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="fuelType"
            label="Fuel Type"
            rules={[{ required: true, message: "Please select the fuel type" }]}
          >
            <Select
              placeholder="Select a fuel type"
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
            label="Transmission"
            rules={[
              { required: true, message: "Please select the transmission" },
            ]}
          >
            <Select
              placeholder="Select a transmission"
              options={Object.values(VehicleTransmission).map((t) => ({
                value: t,
                label: t,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="vehicleStatus" label="Status">
            <Select
              placeholder="Select a status"
              defaultValue={VehicleStatus.WAITING_FOR_APPROVAL}
              options={Object.values(VehicleStatus).map((s) => ({
                value: s,
                label: s,
                disabled: s !== VehicleStatus.WAITING_FOR_APPROVAL,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="pricePerDay"
            label="Price Per Day (VND)"
            rules={[
              { required: true, message: "Please enter the price per day" },
            ]}
          >
            <InputNumber
              formatter={formatVND}
              parser={parseVND}
              placeholder="Enter price per day"
              min={0}
              step={50000}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="compulsoryInsurance"
            label="Civil Liability Insurance"
            rules={[{ required: true, message: "Please select insurance" }]}
          >
            <Select
              placeholder="Select insurance"
              options={Object.values(CompulsoryInsurance).map((c) => ({
                value: c,
                label: c,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="features" label="Features">
            <Select
              mode="tags"
              placeholder="Enter features (e.g., GPS, Bluetooth)"
              options={Object.values(VehicleFeature).map((f) => ({
                value: f,
                label: f,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="files"
            label="Images"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              console.log("Upload event:", e);
              // e có thể là fileList trực tiếp hoặc object có fileList
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
            // rules={[
            //   { required: true, message: "Please upload at least 1 image" },
            // ]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onPreview={handlePreview}
              onChange={handleChange}
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

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Create
        </Button>
        <Button onClick={onCancel} className="ml-2">
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VehicleForm;
