import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import "../../ui/login.scss";
import API from "../../utils/API";

const Login: React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
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

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await API.post("/auth/login", {
                login,
                hashed_password: password, 
            });

            localStorage.setItem("token", response.data.accessToken);
            navigate("/profile");
        } catch (error) {
            setError("Login yoki parol xato!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="logins">
            <div className="login-enter-images">
                <img className="login-enter" src="/images/login enter pictures.png" alt="login enter" />
            </div>
            <div className="phone">
                <div className="phone-time">
                    <p>{currentTime}</p>
                </div>
                <div className="phone-image">
                    <img src="/icons/Signal.svg" alt="Signal" />
                    <img src="/icons/Connection.svg" alt="Connection" />
                    <img src="/icons/Battery.svg" alt="Battery" />
                </div>
            </div>
            <div className="login-image">
                <img src="/icons/LOGO.svg" alt="LOGO" />
            </div>
            <h4>Dasturga kirish</h4>
            <p className="logins-text">
                Iltimos, tizimga kirish uchun login va <br /> parolingizni kiriting.
            </p>
            {error && <p className="error-message">{error}</p>}
            <Form onFinish={handleSubmit}>
                <Form.Item
                    className="login-input"
                    name="login"
                    rules={[{ required: true, message: "Iltimos, login kiriting!" }]}
                >
                    <Input placeholder="Login" onChange={(e) => setLogin(e.target.value)} />
                </Form.Item>
                <Form.Item
                    className="login-password"
                    name="password"
                    rules={[{ required: true, message: "Iltimos, parol kiriting!" }]}
                >
                    <Input.Password placeholder="Parol" onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <p className="logins-textes">
                    Hisobingiz yo‘qmi? <Link to="/register">Ro‘yxatdan o‘tish</Link>
                </p>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Kirish
                </Button>
            </Form>
        </Card>
    );
};

export default Login;
