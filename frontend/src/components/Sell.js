import { Card, Statistic, Button } from "antd";
import { useContext, useState } from "react";
import { WalletContext } from "../context/WalletContext";

export const Sell = () => {
  const { walletAddr, setWalletAddr } = useContext(WalletContext);
  const [balance, setBalance] = useState(0);

  return (
    <Card>
      <Statistic title="Account Balance (SW)" value={balance} precision={2} />
      <Button style={{ marginTop: 16 }} type="primary">
        Sell
      </Button>
    </Card>
  );
};
