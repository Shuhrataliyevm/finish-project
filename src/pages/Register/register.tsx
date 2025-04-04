import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import "../../ui/register.scss";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateTime(); 
        const interval = setInterval(updateTime, 60000); 

        return () => clearInterval(interval); 
    }, []);

    const handleSubmit = (): void => {
        if (username.trim()) {
            localStorage.setItem("username", username);
            localStorage.setItem("token", "fake-token");
            navigate("/profile");
        }
    };

    return (
        <Card className="register">
            <div className="register-enter-images">
                <img className="register-enter" src="/images/login enter pictures.png" alt="login enter pictures image" />
            </div>
            <div className="phones">
                <div className="phones-time">
                    <p>{currentTime}</p> 
                </div>
                <div className="phone-images">
                    <img src="/icons/Signal.svg" alt="Signal Icon" />
                    <img src="/icons/Connection.svg" alt="Connection Icon" />
                    <img src="/icons/Battery.svg" alt="Battery Icon" />
                </div>
            </div>
            <div className="register-image">
                <img src="/icons/LOGO.svg" alt="LOGO Icon" />
            </div>
            <h4>Dasturga kirish</h4>
            <p className="register-text">
                Iltimos, tizimga kirish uchun login va <br /> parolingizni kiriting.
            </p>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "Please enter username!" }]}
                >
                    <Input
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Please enter your name!" }]}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                >
                    <Input.Password placeholder="Enter password" />
                </Form.Item>
                <p className="register-text">
                    Do you have an account? <Link to="/login">Login</Link>
                </p>
                <Button type="primary" htmlType="submit">
                Kirish
                </Button>
            </Form>
        </Card>
    );
};

export default Register;
