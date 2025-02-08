import React, { useState } from "react";
import { Layout, Menu, Switch, Avatar, Dropdown } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allRoutes } from "../routes";
import { changeTheme } from "../redux";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme } = useSelector((state) => state.theme);
  const [collapsed, setCollapsed] = useState(false);

  const role = sessionStorage.getItem("crm-role");

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  // Filter routes for the current user's role and prepare menu items
  const siderMenu = allRoutes
    .filter(
      (route) =>
        route.showInMenu !== false && route.roles && route.roles.includes(role)
    )
    .map((route) => {
      return {
        key: route.path,
        icon: route.icon ? route.icon : null,
        label: route.label,
      };
    });

  // Profile dropdown menu
  const profileMenu = (
    <Menu>
      <Menu.Item
        key="profile"
        onClick={() => navigate(`/${role}/profile`)}
        icon={<span className="fa-solid fa-user" />}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        danger
        key="logout"
        onClick={handleLogout}
        icon={<span className="fa-solid fa-arrow-right-from-bracket" />}
      >
        Log out
      </Menu.Item>
    </Menu>
  );

  // Current date
  const currentDate = new Date().toLocaleDateString("uz-Uz");

  return (
    <Layout className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      {/* Sidebar */}
      <Sider
        collapsible
        zeroWidthTriggerStyle={{ top: "10px" }}
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        className="outline-1 bg-white dark:bg-gray-900"
        breakpoint="lg"
        collapsedWidth="70"
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-4">
          <img
            src="/favicon.svg"
            alt="Logo"
            className="w-10 h-10 cursor-pointer"
            onClick={() => navigate(`/${role}/dashboard`)}
          />
        </div>
        {/* Menu */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border-r-0"
        >
          {siderMenu.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              style={{
                color:
                  theme === "dark" && location.pathname !== item.key
                    ? "white"
                    : "",
              }}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      {/* Main Layout */}
      <Layout className="bg-gray-100 dark:bg-gray-800">
        {/* Header */}
        <Header
          className="flex items-center justify-between border-l dark:border-l-slate-700 bg-white dark:bg-gray-900 shadow-md"
          style={{ padding: 0 }}
        >
          <div>
            {/* Collapse Button */}
            <button
              onClick={toggleCollapsed}
              className="cursor-pointer text-sm text-white bg-ant-dark-blue px-3 py-1 rounded-r-lg"
            >
              {collapsed ? (
                <span className="fa-solid fa-chevron-right" />
              ) : (
                <span className="fa-solid fa-chevron-left" />
              )}
            </button>
          </div>
          <div>
            {/* Current Date */}
            <div className="ml-4 text-lg text-gray-700 dark:text-gray-300">
              {currentDate}
            </div>
          </div>
          <div className="flex items-center pr-3">
            {/* Dark Mode Switch */}
            <Switch
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              style={{ outline: "1px solid gray" }}
              onChange={() =>
                dispatch(changeTheme(theme === "light" ? "dark" : "light"))
              }
              className="mr-4"
            />
            {/* Profile Dropdown */}
            <Dropdown overlay={profileMenu} trigger={["click"]}>
              <Avatar
                size="large"
                icon={<span className="fa-regular fa-user text-lg" />}
                className="cursor-pointer bg-slate-500"
              />
            </Dropdown>
          </div>
        </Header>

        {/* Main Content */}
        <Content className="m-2 p-2 max-h-[calc(100vh-80px)] bg-white dark:bg-gray-900 dark:text-white rounded shadow overflow-y-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
