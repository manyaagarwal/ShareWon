import { Layout, Menu, Breadcrumb } from "antd";
import {
  DashboardOutlined,
  TransactionOutlined,
  MoneyCollectOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { WalletContext } from "../context/WalletContext";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const items = [
  {
    title: "Dashboard",
    route: "/",
    icon: <DashboardOutlined />,
  },
  {
    title: "Buy",
    route: "/buy",
    icon: <TransactionOutlined />,
  },
  {
    title: "Sell",
    route: "/sell",
    icon: <MoneyCollectOutlined />,
  },
  {
    title: "Send",
    route: "/send",
    icon: <ArrowUpOutlined />,
  },
  {
    title: "Receive",
    route: "/receive",
    icon: <ArrowDownOutlined />,
  },
];

export const AppBar = ({ children }) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();

  const baseLength = process.env.PUBLIC_URL.length;
  const currentRoute = location.pathname.slice(baseLength);
  const { walletAddr, setWalletAddr } = useContext(WalletContext);

  const logout = () => {
    setWalletAddr("");
    history.push("/login");
  };
  if (walletAddr === "") return <Redirect to="/login" />;
  else
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
        >
          <div className="logo"></div>
          <Menu theme="dark" defaultSelectedKeys={[currentRoute]} mode="inline">
            {items.map((item) => (
              <Menu.Item key={item.route} icon={item.icon}>
                <Link to={item.route}>{item.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>ShareWon Wallet ©2020</Footer>
        </Layout>
      </Layout>
    );
};
