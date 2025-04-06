import { useNavigate } from "react-router-dom";
import "../../ui/profile.scss";
import { useState, useEffect } from 'react';

const Profile = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "Foydalanuvchi";
    const [currentTime, setCurrentTime] = useState("");

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

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="profile-container">
            <div className="profile-phone">
                <div className="profile-time">
                    <p>{currentTime}</p>
                </div>
                <div className="phones-image">
                    <img src="/icons/Signal.svg" alt="Signal Icon" />
                    <img src="/icons/Connection.svg" alt="Connection Icon" />
                    <img src="/icons/Battery.svg" alt="Battery Icon" />
                </div>
            </div>
            <div className="profile-card">
                <img
                    src="/icons/image@2x.svg"
                    alt="image@2x image"
                    className="profile-avatar"
                />
                <h2 className="profile-name">{username}</h2>
                <button style={{ position: "relative", left: "950px", top: "0.55px" }} className="logout-btn" onClick={handleLogout}>
                    <img src="/icons/logout.svg" alt="logout icon" />
                </button>
                <button onClick={() => navigate("/calendar")} className="calendar">

                    <img src="/images/calendar.png" alt="calendar image" />
                </button>
                <div className="reason">
                    <div className="texts">
                        <h4>135,214,200 so'm</h4>
                        <p>Umumiy nasiya:</p>
                        <div className="img">
                            <img src="/images/Show.png" alt="show image" />
                        </div>
                    </div>
                </div>
                <div className="spends">
                    <div className="spend">
                        <h5>Kechiktirilgan <br /> to'lovlar</h5>
                        <p className="color">26</p>
                    </div>
                    <div className="cost">
                        <h5>Mijozlar <br /> soni</h5>
                        <p className="colors">151</p>
                    </div>
                </div>

                <div className="newCart">
                    <div className="carts">
                        <div className="cart">
                            <img style={{ width: "75px", height: "75px", position: "relative", left: "-55px", top: "-10px" }} src="/images/Wallet icon.png" alt="Wallet icon" />
                            <p id="new-ps" >Hisobingizda</p>
                            <h3 id="new-p" >300 000 so'm</h3>
                            <button id="promt-btn">+</button>

                            <div className="nace">
                                <p id="cart-colors">Bu oy uchun to‘lov:</p>
                                <p id="cart-color">To‘lov qilingan</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="nastroyka">
                    <div className="homes">
                        <img src="/images/home.png" alt="home image" />
                        <p className="menu">Asosiy</p>
                    </div>
                    <div className="homes">
                        <button onClick={() => navigate("/products")}>
                            <img src="/images/user.png" alt="user image" />
                            <p>Mijozlar</p>
                        </button>
                    </div>

                    <div className="homes">
                        <img src="/images/Folder.png" alt="folder image" />
                        <p>Hisobot</p>
                    </div>
                    <div className="homes">
                        <button onClick={() =>{
                            console.log('clicked')
                            navigate("/setting");
                            
                        }}>
                            <img src="/images/Settings.png" alt="settings image" />
                            <p>Sozlama</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
