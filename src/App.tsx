import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login/login';
import Profile from './pages/Profile/profile';
import Products from './pages/Products/products';
import News from './pages/News/news';
import Calendar from './pages/Calendar/calendar';
import CreateDebtor from './pages/CreateDebtor/CreateDebtor';
import SplashScreen from './components/SplashScreen';
import Setting from './pages/Setting/setting';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
};

const App = () => {
    const [showSplash, setShowSplash] = useState(true);

    const content = (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/setting"
                    element={
                        <ProtectedRoute>
                            <Setting />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/news/:id"
                    element={
                        <ProtectedRoute>
                            <News />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/calendar"
                    element={
                        <ProtectedRoute>
                            <Calendar />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-debtor"
                    element={
                        <ProtectedRoute>
                            <CreateDebtor />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/profile" />} />
            </Routes>
        </QueryClientProvider>
    );

    if (showSplash) {
        return <SplashScreen onFinish={() => setShowSplash(false)} />;
    }

    return content;
};

export default App;