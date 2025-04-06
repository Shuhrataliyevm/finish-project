import { navigate, useNavigate } from "react-router-dom";

const Setting = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate("/profile")}>
                layout
            </button>
        </div>
    )
}

export default Setting;