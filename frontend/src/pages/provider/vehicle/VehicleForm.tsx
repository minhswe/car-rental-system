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
  form: any; // Ant Design Form instance
  onSubmit: (values: Omit<Vehicle, "id"> & { files: string[] }) => void;
  onCancel: () => void;
  isPending: boolean;
  isEditable: boolean; // New prop to toggle between view/edit modes
  initialValues?: Omit<Vehicle, "_id"> & { files: string[] }; // Initial values for edit/view mode
}

// const mapStringToUploadFile = (urls: string[]): UploadFile[] =>
//   urls.map((url, index) => ({
//     uid: String(index),
//     name: `image_${index}`,
//     status: "done",
//     url, // hiển thị preview
//   }));

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
  isEditable,
  initialValues,
}) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const [previewOpen, setPreviewOpen] = React.useState(false);

  const [previewImage, setPreviewImage] = React.useState("");

  // Initialize form with initialValues if provided (for edit/view mode)
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

  const customRules = [
    {
      validator: async () => {
        if (fileList.length === 0) {
          return Promise.reject(new Error("Please upload at least 1 image"));
        }

        if (fileList.length > 5) {
          return Promise.reject(
            new Error("You can upload up to 5 images only")
          );
        }

        // Check type & size
        for (const file of fileList) {
          const isImage =
            file.type?.startsWith("image/") ||
            file.name?.match(/\.(jpg|jpeg|png)$/i);
          if (!isImage) {
            return Promise.reject(new Error("Only JPG/PNG images are allowed"));
          }

          const sizeOk =
            !file.originFileObj || file.originFileObj.size / 1024 / 1024 < 2;
          if (!sizeOk) {
            return Promise.reject(new Error("Image must be smaller than 2MB"));
          }
        }

        return Promise.resolve();
      },
    },
  ];

  const beforeUpload = () => {
    // Prevent auto upload
    console.log("Before upload called");
    return false;
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
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
          <Form.Item
            name="vehicleStatus"
            label="Status"
            initialValue={VehicleStatus.WAITING_FOR_APPROVAL}
          >
            <Select
              placeholder="Select a status"
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
          <Form.Item
            name="seats"
            label="Number of Seats"
            rules={[
              { required: true, message: "Please enter the number of seats" },
            ]}
          >
            <InputNumber
              placeholder="Enter number of seats"
              min={2}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: "Please enter the color" }]}
          >
            <Input placeholder="Enter color" />
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
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}
            rules={customRules}
          >
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
      {isEditable ? (
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            {initialValues ? "Update" : "Create"}
          </Button>
          <Button onClick={onCancel} className="ml-2">
            Cancel
          </Button>
        </Form.Item>
      ) : null}
    </Form>
  );
};

export default VehicleForm;
