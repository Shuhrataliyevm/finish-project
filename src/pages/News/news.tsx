import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './News.scss';
import { IoArrowBack } from 'react-icons/io5';

interface Debt {
    id: string;
    created_at: string;
    updated_at: string;
    total_debt_sum: string;
    total_month: number;
    next_payment_date: string;
    debt_status: string;
    debt_period: number;
    debt_sum: string;
    description: string;
}

const News = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [debts, setDebts] = useState<Debt[]>([]);
    const [debtorName, setDebtorName] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString().slice(0, 5),
        duration: '',
        amount: '',
        note: '',
        images: [] as File[]
    });

    useEffect(() => {
        const fetchDebtorDetails = async () => {
            if (!id) {
                navigate('/products');
                return;
            }

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const debtorResponse = await fetch(`https://nasiya.takedaservice.uz/api/debtor/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!debtorResponse.ok) {
                    if (debtorResponse.status === 401) {
                        navigate('/login');
                        return;
                    }
                    throw new Error('Сервер хатоси');
                }

                const debtorData = await debtorResponse.json();
                if (!debtorData.data || !debtorData.data.full_name) {
                    throw new Error('Қарздор маълумотлари топилмади');
                }

                setDebtorName(debtorData.data.full_name);

                const debtsResponse = await fetch(`https://nasiya.takedaservice.uz/api/debts?debtor_id=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!debtsResponse.ok) {
                    throw new Error('Қарзлар рўйхатини олишда хатолик');
                }

                const debtsData = await debtsResponse.json();
                if (!debtsData.data || !Array.isArray(debtsData.data)) {
                    throw new Error('Қарзлар маълумотлари нотўғри форматда');
                }

                setDebts(debtsData.data);
            } catch (err) {
                console.error('Error:', err);
                navigate('/products');
            } finally {
                setLoading(false);
            }
        };

        fetchDebtorDetails();
    }, [id, navigate]);

    const formatCurrency = (amount: string | number): string => {
        try {
            const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
            if (isNaN(numericAmount)) return '0';
            return new Intl.NumberFormat('uz-UZ').format(numericAmount);
        } catch {
            return '0';
        }
    };

    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Сана нотўғри';
            return date.toLocaleDateString('uz-UZ');
        } catch {
            return 'Сана нотўғри';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSuccess(true);
        } catch (error) {
            console.error('Error submitting transaction:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p>Yuklanmoqda...</p>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="success-screen">
                <img src="/icons/newLoginImages.svg" alt="" />
                <h1>Ajoyib!</h1>
                <p>Muvaffaqiyatli so'ndirildi</p>
                <button className="add-button" onClick={() => navigate('/products')}>
                    O'tqazish
                </button>
            </div>
        );
    }

    if (showForm) {
        return (
            <form className="transaction-form" onSubmit={handleSubmit}>
                <div className="form-header">
                    <button 
                        type="button" 
                        className="back-button" 
                        onClick={() => setShowForm(false)}
                        title="Орқага"
                    >
                        <IoArrowBack />
                    </button>
                    <h1>Batafsil</h1>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Sana</label>
                    <input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Soat</label>
                    <input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={e => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="duration">Muddat</label>
                    <input
                        id="duration"
                        type="number"
                        placeholder="12"
                        value={formData.duration}
                        onChange={e => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Summa muddati</label>
                    <input
                        id="amount"
                        type="number"
                        placeholder="5,845,000"
                        value={formData.amount}
                        onChange={e => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="note">Eslatma</label>
                    <textarea
                        id="note"
                        placeholder="iPhone 14 Pro, boshlanish to'lov bor"
                        value={formData.note}
                        onChange={e => setFormData(prev => ({ ...prev, note: e.target.value }))}
                    />
                </div>

                <div className="image-upload">
                    <div className="upload-title">Rasm biriktirish</div>
                    <div className="image-upload-container">
                        <label className="image-upload-box">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setFormData(prev => ({
                                            ...prev,
                                            images: [e.target.files![0], prev.images[1]].filter(Boolean)
                                        }));
                                    }
                                }}
                                hidden
                            />
                            {formData.images[0] ? (
                                <img 
                                    src={URL.createObjectURL(formData.images[0])} 
                                    alt="Preview" 
                                    className="preview-image"
                                />
                            ) : (
                                <>
                                    <span className="upload-icon">📷</span>
                                    <span>Расм қўшиш</span>
                                </>
                            )}
                        </label>

                        <label className="image-upload-box">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setFormData(prev => ({
                                            ...prev,
                                            images: [prev.images[0], e.target.files![0]].filter(Boolean)
                                        }));
                                    }
                                }}
                                hidden
                            />
                            {formData.images[1] ? (
                                <img 
                                    src={URL.createObjectURL(formData.images[1])} 
                                    alt="Preview" 
                                    className="preview-image"
                                />
                            ) : (
                                <>
                                    <span className="upload-icon">📷</span>
                                    <span>Расм қўшиш</span>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                <button type="submit" className="add-button">
                    Nasiyani so'ndirish
                </button>
            </form>
        );
    }

    const totalDebt = debts.reduce((sum, debt) => {
        const amount = parseFloat(debt.debt_sum);
        return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    return (
        <div className="debtor-details">
            <div className="header">
                <button className="back-button" onClick={() => navigate('/products')} title="Орқага">
                    <IoArrowBack />
                </button>
                <h1>{debtorName || 'Исм кўрсатилмаган'}</h1>
                <div className="button-group">
                    <button className="add-button" onClick={() => setShowForm(true)}>
                        <span>+</span>
                        <span>Qo‘shish</span>
                    </button>
                </div>
            </div>

            <div className="debt-header">
                <h2>Umumiy qariz</h2>
                <div className="total-amount">
                    {formatCurrency(totalDebt)} so'm
                </div>
            </div>

            <h2 className="section-title">Qarizlar tarixi</h2>

            <div className="transactions-list">
                {debts.map((debt) => (
                    <div key={debt.id} className="transaction-item">
                        <div className="transaction-header">
                            <div className="transaction-date">
                                {formatDate(debt.created_at)}
                            </div>
                            <div className="transaction-amount">
                                {formatCurrency(debt.debt_sum)} so'm
                            </div>
                        </div>
                        
                        <div className="payment-info">
                            <div className="next-payment">
                                Keyingi to'lov: {formatDate(debt.next_payment_date)}
                            </div>
                            <div className="payment-amount">
                                Oylik to'lov: {formatCurrency(parseFloat(debt.total_debt_sum) / (debt.total_month || 1))} so'm
                            </div>
                        </div>

                        <div className="progress-bar">
                            <div 
                                className="progress" 
                                style={{ 
                                    width: `${(parseFloat(debt.debt_sum) / parseFloat(debt.total_debt_sum)) * 100}%` 
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;