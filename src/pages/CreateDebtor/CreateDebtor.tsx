import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CreateDebtor.scss';

interface FormData {
    fullName: string;
    phoneNumber: string;
    address: string;
    images: File[];
}

const CreateDebtor = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        phoneNumber: '',
        address: '',
        images: []
    });

    const handleImageUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const newImages = [...formData.images];
            newImages[index] = e.target.files[0];
            setFormData(prev => ({
                ...prev,
                images: newImages
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="create-debtor-container">
            <div className="header">
                <button onClick={() => navigate(-1)} className="back-button">
                    ←
                </button>
                <h1>Mijoz yaratish</h1>
            </div>

            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Ismi*</label>
                    <input
                        type="text"
                        placeholder="Ismini kiriting"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Telefon raqami*</label>
                    <input
                        type="tel"
                        placeholder="Telefon raqami"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Yashash manzili</label>
                    <input
                        type="text"
                        placeholder="Yashash manzilini kiriting"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    />
                </div>

                <div className="form-group">
                    <label>Eslatma qo'shish</label>
                    <textarea 
                        placeholder="Eslatma qo'shish"
                    />
                </div>

                <div className="form-group">
                    <label>Rasm biriktirish</label>
                    <div className="image-upload-container">
                        <label className="image-upload-box">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload(0)}
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
                                    <span>Rasm qo'shish</span>
                                </>
                            )}
                        </label>

                        <label className="image-upload-box">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload(1)}
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
                                    <span>Rasm qo'shish</span>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                <button type="submit" onClick={() => navigate('/products')} className="submit-button">
                    Saqlash
                </button>
            </form>
        </div>
    );
};

export default CreateDebtor;
