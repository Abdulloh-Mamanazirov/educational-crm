import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, FloatButton, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../../redux";

const mockCredentials = [
  {
    username: "director",
    password: "director",
    role: "director",
    token: "director-123456789",
  },
  {
    username: "admin",
    password: "admin",
    role: "admin",
    token: "admin-123456789",
  },
  {
    username: "teacher",
    password: "teacher",
    role: "teacher",
    token: "teacher-123456789",
  },
  {
    username: "student",
    password: "student",
    role: "student",
    token: "student-123456789",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { theme } = useSelector((state) => state.theme);

  const onFinish = (values) => {
    const foundUser = mockCredentials.find(
      (i) => i.username === values.username && i.password === values.password
    );

    if (foundUser) {
      messageApi.success("Log in successful!");
      setTimeout(() => {
        sessionStorage.setItem("crm-token", foundUser.token);
        sessionStorage.setItem("crm-role", foundUser.role);

        const roleHomePaths = {
          teacher: "/teacher/dashboard",
          employee: "/teacher/dashboard",
          student: "/student/dashboard",
          admin: "/admin/dashboard",
          director: "/director/dashboard",
        };

        const homePath = roleHomePaths[foundUser.role] || "/";

        return navigate(homePath);
      }, 1000);
    } else {
      messageApi.error("Username or password incorrect!");
    }
  };

  return (
    <div className="min-h-screen flex">
      {contextHolder}
      {/* Dark Mode switch */}
      <FloatButton
        onClick={() =>
          dispatch(changeTheme(theme === "light" ? "dark" : "light"))
        }
        icon={
          theme === "dark" ? (
            <span className="fa-regular fa-sun" />
          ) : (
            <span className="fa-regular fa-moon" />
          )
        }
      />
      {/* Left Side - Gradient */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500 to-teal-400 dark:from-blue-900 dark:to-teal-900 items-center justify-center">
        <p className="text-white text-xl font-bold">Educational CRM</p>
      </div>
      {/* Right Side - Form */}
      <div className="flex flex-col w-full lg:w-1/2 justify-center items-center bg-white dark:bg-ant-dark-blue">
        <img src="./favicon.svg" alt="Logo" className="w-32 mb-8" />
        {/* Login Form */}
        <Form
          name="loginForm"
          onFinish={onFinish}
          autoComplete="on"
          className="w-3/4 max-w-sm"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input
              prefix={<span className="fa-solid fa-user opacity-30 mr-1" />}
              placeholder="Username"
              className="py-2"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<span className="fa-solid fa-lock opacity-30 mr-1" />}
              placeholder="Password"
              className="py-2"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
