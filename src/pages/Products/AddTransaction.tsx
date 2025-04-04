import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './products.scss';

const AddTransaction = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString().slice(0, 5),
        duration: '',
        amount: '',
        note: '',
        images: [] as File[]
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSuccess(true);
        } catch (error) {
            console.error('Error submitting transaction:', error);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...Array.from(e.target.files || [])]
            }));
        }
    };

    if (isSuccess) {
        return (
            <div className="success-screen">
                <img src="/icons/newLoginImages.svg" alt="" />
                <h1>Ajoyib!</h1>
                <p>Muvaffaqiyatli so'ndirildi</p>
                <button className="add-button" onClick={() => navigate(-1)}>
                    O'tqazish
                </button>
            </div>
        );
    }

    return (
        <form className="transaction-form" onSubmit={handleSubmit}>
            <div className="form-header">
                <button 
                    type="button" 
                    className="back-button" 
                    onClick={() => navigate(-1)}
                >
                    ←
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
                <label className="upload-area" htmlFor="images">
                    <input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                    {formData.images.length > 0 ? (
                        <div>Tanlangan fayllar: {formData.images.length}</div>
                    ) : (
                        <div>Rasmni tanlang yoki bu yerga tashlang</div>
                    )}
                </label>
            </div>

            <button type="submit" className="add-button">
                Nasiyani so'ndirish
            </button>
        </form>
    );
};

export default AddTransaction; 