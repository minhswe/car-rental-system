import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { RoleEnum } from "@/common/types";
import Notify from "@/components/common/Notification";
import { signUpSchema, signUpFormData } from "@/common/schemas/auth.schema";
import { signUpUser } from "@/common/services/auth.service";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Alert,
  message,
  Select,
} from "antd";
import { ConfirmModal } from "@/components/common/Modal";
import { useState } from "react";

const { Title, Text } = Typography;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormdata] = useState<signUpFormData | null>(null);
  const [notify, setNotify] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
    description?: string;
    onClose?: () => void;
  }>({
    open: false,
    type: "success",
    message: "",
    description: "",
    onClose: undefined,
  });
  const { mutate, isPending, error } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      message.success("Sign up successful! Please log in.");
      setModalOpen(false);
      setNotify({
        open: true,
        type: "success",
        message: "Sign up successful!",
        description: "Your account has been created. Please log in.",
      });
      navigate("/auth/signin");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Sign up failed. Please try again."
      );
      console.log("onError123:", error);
      setModalOpen(false);
      setNotify({
        open: true,
        type: "error",
        message: "Sign up failed",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Please try again.",
      });
      console.log("notify end");
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: signUpFormData) => {
    setFormdata(data);
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    console.log("mutate called");
    if (formData) {
      mutate({
        role: formData.role,
        username: formData.username,
        password: formData.password,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
    }
    // mutate({
    //   role: RoleEnum.CUSTOMER || RoleEnum.PROVIDER,
    //   username: data.username,
    //   password: data.password,
    //   email: data.email,
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    // });
    // console.log(data);
  };

  return (
    <>
      <Card title="Create an Account" style={{ width: 400, margin: "auto" }}>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label={<Text strong>Username</Text>}
            validateStatus={errors.username ? "error" : ""}
            help={errors.username?.message}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter your username"
                  style={{ height: 40 }}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label={<Text strong>Password</Text>}
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter your password"
                  style={{ height: 40 }}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label={<Text strong>Confirm Password</Text>}
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={errors.confirmPassword?.message}
          >
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter your password"
                  style={{ height: 40 }}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label={<Text strong>Email</Text>}
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter your email"
                  style={{ height: 40 }}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label={<Text strong>You are...</Text>}
            validateStatus={errors.role ? "error" : ""}
            help={errors.role?.message}
          >
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select a role"
                  style={{ height: 40 }}
                  options={[
                    { label: "Customer", value: RoleEnum.CUSTOMER },
                    { label: "Provider", value: RoleEnum.PROVIDER },
                  ]}
                />
              )}
            />
          </Form.Item>
          {error && (
            <Alert
              message={error.message}
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
            />
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              block
              style={{
                height: 40,
              }}
            >
              {isPending ? "Processing..." : <Space>Create Account</Space>}
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <Text style={{ color: "#595959" }}>
              Already have an account?{" "}
              <Link to="/sign-in" style={{ color: "#1890ff", fontWeight: 500 }}>
                Sign in instead
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
      <ConfirmModal
        open={modalOpen}
        title="Confirm Sign Up"
        content="Are you sure you want to create this account?"
        confirmLoading={isPending}
        onOk={handleConfirm}
        okText={isPending ? "Processing..." : "Create it"}
        onCancel={() => setModalOpen(false)}
      />
      <Notify
        open={notify.open}
        type={notify.type}
        message={notify.message}
        description={notify.description}
        onClose={() => setNotify((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};
export default SignUpPage;
