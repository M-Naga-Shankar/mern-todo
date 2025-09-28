import React, { PureComponent } from 'react'
import { Button, Form, Input, Card } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

class Login extends PureComponent {
  onFinish = (values) => {
    console.log('Received values of form: ', values)
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f2f5',
        }}
      >
        <Card
          style={{
            width: 300,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: 8,
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Login