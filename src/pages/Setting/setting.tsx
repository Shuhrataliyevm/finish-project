import { useNavigate } from 'react-router-dom';

const Setting = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate("/profile")}>
                Layout
            </button>
        </div>
    )
}

export default Setting;
