import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/profile";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import PrivateRoute from "./PrivateRoute";
import Calendar from "../pages/Calendar/calendar";
import Products from "../pages/Products/products";
import CreateDebtor from "../pages/CreateDebtor/CreateDebtor";
import News from "../pages/News/news";
import Setting from "../pages/Setting/setting";
const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute />}>
                <Route index element={<Products />} />
                <Route path="profile" element={<Profile />} />
                <Route path="products" element={<Products />} />
                <Route path="create-debtor" element={<CreateDebtor />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="setting" element={<Setting />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/news" element={<News />} />
        </Routes>
    );
};

export default Router;
