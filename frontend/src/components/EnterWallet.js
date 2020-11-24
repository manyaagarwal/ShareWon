import { Row, Col, Card, Typography, Tabs, Button } from "antd";
import Raact, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { createWallet } from "../actions/wallet";
import { WalletContext } from "../context/WalletContext";

const { TabPane } = Tabs;
const { Text, Paragraph } = Typography;

export const EnterWallet = () => {
  const [createWalletFlag, setCreateWalletFlag] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const { walletAddr, setWalletAddr } = useContext(WalletContext);
  const walletCreate = async () => {
    const res = await createWallet();
    setPrivateKey(res.privateKey);
    setPublicKey(res.publicKey);
    setCreateWalletFlag(true);
  };

  const walletComplete = () => {
    setWalletAddr(publicKey);
  };
  if (walletAddr !== "") return <Redirect to="/" />;
  return (
    <Row
      style={{ justifyContent: "center", height: "100vh", minWidth: "300px" }}
    >
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Create Wallet" key="1">
            <Card>
              {createWalletFlag ? (
                <>
                  <Text>Wallet Address: </Text>
                  <Paragraph copyable={{ tooltips: false }}>
                    {publicKey}
                  </Paragraph>
                  <Text>Private Key: </Text>
                  <Paragraph copyable={{ tooltips: false }}>
                    {privateKey}
                  </Paragraph>
                  <Button type="primary" onClick={walletComplete}>
                    Continue
                  </Button>
                </>
              ) : (
                <Button type="primary" onClick={walletCreate}>
                  Create Wallet
                </Button>
              )}
            </Card>
          </TabPane>
          <TabPane tab="Recover Wallet" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
        {/* <Typography.Title>HOTZONE</Typography.Title>
            <Typography.Title level={5}>CHP Staff Login</Typography.Title> */}
        {/* <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
					<Input.Password />
                  },
                ]}
              >
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form> */}
      </Col>
    </Row>
  );
};
