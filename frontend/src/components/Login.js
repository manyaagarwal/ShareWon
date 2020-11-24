// import React, { useContext } from "react";
// import { Form, Input, Button, Row, Col, Card, Typography, message } from "antd";
// import { Redirect, useHistory } from "react-router-dom";

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };

// const LoginForm = () => {
//   const history = useHistory();
//   const { user, setUser } = useContext(UserContext);
//   const localStorage = window.localStorage;
//   const onFinish = async (values) => {
//     try {
//       await login(values);
//       console.log("Success:", values);
//       setUser(values.username);
//       localStorage.setItem("user", values.username);
//       history.push("/");
//     } catch (e) {
//       console.error(e);
//       message.error(e.message);
//     }
//   };

//   const onFinishFailed = (errorInfo: any) => {
//     console.log("Failed:", errorInfo);
//   };

//   if (user !== "") {
//     return <Redirect to="/" />;
//   } else
//     return (
//       <Row style={{ justifyContent: "center", height: "100vh" }}>
//         <Col
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//           }}
//         >
//           <Card>
//             <Typography.Title>HOTZONE</Typography.Title>
//             <Typography.Title level={5}>CHP Staff Login</Typography.Title>
//             <Form
//               {...layout}
//               name="basic"
//               initialValues={{
//                 remember: true,
//               }}
//               onFinish={onFinish}
//               onFinishFailed={onFinishFailed}
//             >
//               <Form.Item
//                 label="Username"
//                 name="username"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your username!",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item
//                 label="Password"
//                 name="password"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your password!",
//                   },
//                 ]}
//               >
//                 <Input.Password />
//               </Form.Item>
//               <Form.Item {...tailLayout}>
//                 <Button type="primary" htmlType="submit">
//                   Submit
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Card>
//         </Col>
//       </Row>
//     );
// };

// export default LoginForm;
