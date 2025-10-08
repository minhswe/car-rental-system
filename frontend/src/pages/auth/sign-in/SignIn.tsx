import { signInFormData, signinSchema } from "@/common/schemas/auth.schema";
import { signInUser } from "@/common/services/auth.service";
import { RoleEnum } from "@/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Alert,
  message,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Notify from "@/components/common/Notification";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signinSuccess } from "@/common/stores/authSlice";
import { AppDispatch } from "@/common/stores/store";

const { Title, Text } = Typography;

const SignInPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

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

  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      // message.success("Sign in successful!");
      setNotify({
        open: true,
        type: "success",
        message: "Sign in successful!",
        description: "Welcome back!",
      });

      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      dispatch(
        signinSuccess({
          user: data.user,
          accessToken: data.accessToken,
        })
      );
      switch (data.user.role) {
        case RoleEnum.ADMIN:
          navigate("/admin");
          break;
        case RoleEnum.PROVIDER:
          navigate("/provider");
          break;
        case RoleEnum.CUSTOMER:
          navigate("/customer");
          break;
        default:
          throw new Error("Invalid role");
      }
    },
    onError: (error: any) => {
      setNotify({
        open: true,
        type: "error",
        message: "Sign in failed",
        description:
          error?.response?.data?.message || error?.message || "Sign in failed",
      });
      message.error(error?.response?.data?.message || "Sign in failed");
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: signInFormData) => {
    mutate({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <>
      <Card style={{ width: 400, margin: "auto" }}>
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
              {isPending ? "Processing..." : <Space>Sign In</Space>}
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <Text style={{ color: "#595959" }}>
              Do not have a account?{" "}
              <Link to="/sign-up" style={{ color: "#1890ff", fontWeight: 500 }}>
                Sign up instead
              </Link>
            </Text>
          </div>
        </Form>
      </Card>

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

export default SignInPage;
