import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Form, Input, InputNumber, message } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { setCars } from "@/common/stores/carSlice";
import type { RootState } from "@/common/stores/store";
import { Empty } from "antd";
interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string;
}

const CarManagement: React.FC = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state: RootState) => {
    console.log("Redux state:", state); // Debug state
    return Array.isArray(state.cars?.cars) ? state.cars.cars : [];
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Fetch cars using TanStack Query
  const { isLoading, error } = useQuery<Car[], Error>({
    queryKey: ["cars"],
    queryFn: async () => {
      const response = await axios.get("/api/cars");
      // Ensure response.data is an array
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      console.log("API response:", response.data); // Debug API response
      dispatch(setCars(data));
      return data;
    },
  });

  // Create car mutation
  const createCarMutation = useMutation({
    mutationFn: (newCar: Omit<Car, "id">) =>
      axios.post<Car>("/api/cars", newCar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      message.success("Car created successfully");
      setIsModalVisible(false);
      form.resetFields();
    },
    onError: () => message.error("Failed to create car"),
  });

  // Update car mutation
  const updateCarMutation = useMutation({
    mutationFn: ({
      id,
      updatedCar,
    }: {
      id: string;
      updatedCar: Omit<Car, "id">;
    }) => axios.put<Car>(`/api/cars/${id}`, updatedCar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      message.success("Car updated successfully");
      setIsModalVisible(false);
      setEditingCar(null);
      form.resetFields();
    },
    onError: () => message.error("Failed to update car"),
  });

  // Delete car mutation
  const deleteCarMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/cars/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      message.success("Car deleted successfully");
    },
    onError: () => message.error("Failed to delete car"),
  });

  // Handle form submission
  const handleSubmit = async (values: Omit<Car, "id">) => {
    if (editingCar) {
      updateCarMutation.mutate({ id: editingCar.id, updatedCar: values });
    } else {
      createCarMutation.mutate(values);
    }
  };

  // Show modal for adding/editing
  const showModal = (car: Car | null = null) => {
    setEditingCar(car);
    if (car) {
      form.setFieldsValue(car);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCar(null);
    form.resetFields();
  };

  // Table columns
  const columns = [
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toLocaleString()}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Car) => (
        <div>
          <Button
            type="link"
            onClick={() => showModal(record)}
            className="mr-2"
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => deleteCarMutation.mutate(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Car Management</h1>
      <Button type="primary" onClick={() => showModal()} className="mb-4">
        Add New Car
      </Button>

      {error && <div className="text-red-500 mb-4">Error: {error.message}</div>}

      <Table
        columns={columns}
        dataSource={cars}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        locale={{
          emptyText: (
            <Empty description="You have no cars to display, please add a new car." />
          ),
        }}
      />

      <Modal
        title={editingCar ? "Edit Car" : "Add New Car"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: "Please enter the car brand" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="model"
            label="Model"
            rules={[{ required: true, message: "Please enter the car model" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: "Please enter the car year" }]}
          >
            <InputNumber min={1900} max={new Date().getFullYear()} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price ($)"
            rules={[{ required: true, message: "Please enter the car price" }]}
          >
            <InputNumber min={0} step={1000} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={
                createCarMutation.isPending || updateCarMutation.isPending
              }
            >
              {editingCar ? "Update" : "Create"}
            </Button>
            <Button onClick={handleCancel} className="ml-2">
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CarManagement;
