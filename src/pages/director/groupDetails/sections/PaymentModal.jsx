import React from "react";
import { Button, Tooltip } from "antd";

const PaymentModal = () => {
  return (
    <div>
      <Tooltip title="View Payment History">
        <Button
          icon={<i className="fa-solid fa-money-bill" />}
          onClick={() => {
            /* Handle payment history view */
          }}
        />
      </Tooltip>
    </div>
  );
};

export default PaymentModal;
