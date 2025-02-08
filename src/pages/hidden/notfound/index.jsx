import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title={<p className="dark:text-white">404</p>}
      subTitle={
        <p className="dark:text-white">
          Sorry, the page you visited does not exist.
        </p>
      }
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      }
    />
  );
};

export default NotFound;
