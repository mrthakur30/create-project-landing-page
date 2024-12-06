import React, { useState } from 'react';
import { API } from '../api';
import axios from 'axios';
import toast from 'react-hot-toast';

const LeadModel: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = (): boolean => {
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.name.trim() || !formData.phone.trim()) {
            setError('All fields are required.');
            return false;
        }
        if (!phoneRegex.test(formData.phone)) {
            setError('Please enter a valid 10-digit phone number.');
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await axios.post(`${API}/socialLeads/create/form`, {
                leads: {
                    Name: formData.name.trim(),
                    Phone: formData.phone.trim(),
                },
            });

            toast.success("Request submitted. We'll get back to you soon.", {
                duration: 3000,
            });

            setFormData({ name: '', phone: '' }); // Reset the form
        } catch (err: any) {
            console.error('Error submitting form:', err);
            toast.error(
                err.response?.data?.message || 'Failed to submit form. Please try again.',
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            className="flex flex-col gap-6 bg-neutral-700 text-black p-8 shadow-lg rounded-md w-full lg:w-96"
            onSubmit={handleSubmit}
        >
            {/* Form Title */}
            <h2 className="text-2xl font-bold text-center text-white">Design for every Budget</h2>

            {/* Form Fields */}
            <div className="form-control">
                <label className="label" htmlFor="name">
                    <span className="label-text">Name</span>
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    className="input bg-white input-bordered w-full"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-control">
                <label className="label" htmlFor="phone">
                    <span className="label-text">Phone Number</span>
                </label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="input bg-white input-bordered w-full"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? 'Submitting...' : 'Get Free Quote'}
            </button>

            {/* Disclaimer */}
            <p className="text-sm text-gray-200 text-center">
                By submitting this form, you agree to the privacy policy & terms and conditions.
            </p>

            {/* Error Message */}
            {error && (
                <p className="text-sm text-red-500 text-center">
                    {error}
                </p>
            )}
        </form>
    );
};

export default LeadModel;
