import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, fetchContactSubmission } from "../../store/slices/contactSubmissionSlice";
import "./contacUs.scss";
import ContactImg from "../../assets/ContactUs.jpg";

const ContactUs = () => {
    const dispatch = useDispatch();
    const { existingData, loading, error } = useSelector((state) => state.contactSubmission);

    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        message: ''
    });

    // Fetch existing contact submission on component mount
    useEffect(() => {
        dispatch(fetchContactSubmission());
    }, [dispatch]);

    // Pre-fill form with existing data when it's loaded
    useEffect(() => {
        if (existingData) {
            setFormData({
                name: existingData.name || '',
                mobileNumber: existingData.mobileNumber || '',
                message: existingData.message || ''
            });
        } else {
            // Clear form if no existing data (first time user)
            setFormData({
                name: '',
                mobileNumber: '',
                message: ''
            });
        }
    }, [existingData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.name.trim() || !formData.mobileNumber.trim() || !formData.message.trim()) {
            return;
        }

        // Dispatch the submit action (will update existing or create new)
        dispatch(submitContactForm({
            name: formData.name.trim(),
            mobileNumber: formData.mobileNumber.trim(),
            message: formData.message.trim()
        }));
    };

    return (
        <section className="contact-wrapper">
            <div className="contact-inner">

                {/* IMAGE */}
                <div className="contact-image">
                    <img src={ContactImg} alt="Contact" />
                </div>

                {/* CONTENT */}
                <div className="contact-content">
                    <h2>Cant Wait To MEEt your family</h2>

                    <p className="sub-heading">
                        we're excited to photograph your family, maternity moments, or special milestones.
                        please leave a message below,
                        and we’ll be in touch soon.
                    </p>

                        <form onSubmit={handleSubmit}>
                            <label>Name*</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Your Name Here"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />

                            <label>Mobile Number*</label>
                            <input
                                type="text"
                                name="mobileNumber"
                                placeholder="Enter Your Mobile Number Here"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                required
                            />

                            <label>Message*</label>
                            <textarea
                                name="message"
                                placeholder="Your Message..."
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />

                            {error && (
                                <div className="error-message">
                                    <p>{error}</p>
                                </div>
                            )}

                            <button type="submit" disabled={loading}>
                                {loading ? 'SENDING...' : (existingData ? 'UPDATE MESSAGE' : 'SEND MESSAGE')}
                            </button>
                        </form>
                </div>

            </div>
        </section>
    );
};

export default ContactUs;
