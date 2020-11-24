import { Card, Descriptions, Typography, Button, InputNumber } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const { Text } = Typography;

export const Buy = () => {
  const history = useHistory();
  const [buyShareWon, setbuyShareWon] = useState(0);
  const unitPrice = 1.0;

  return (
    <Card>
      <Descriptions column={1}>
        <Descriptions.Item label="Quantity">
          <InputNumber
            value={buyShareWon}
            onChange={(value) => setbuyShareWon(value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Unit Price Per ShareWon">
          USD 1.0
        </Descriptions.Item>
        <Descriptions.Item label="Total Price to Pay">
          US${" "}
          {unitPrice * parseFloat(buyShareWon) === "NaN"
            ? 0
            : unitPrice * parseFloat(buyShareWon)}
        </Descriptions.Item>
      </Descriptions>
      <Button
        type="primary"
        onClick={() =>
          history.push({
            pathname: "/buy/checkout",
            state: { amount: unitPrice * parseFloat(buyShareWon) },
          })
        }
      >
        CHECKOUT
      </Button>
    </Card>
  );
};
