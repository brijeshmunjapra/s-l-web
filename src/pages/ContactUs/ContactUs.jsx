import "./contacUs.scss";
import ContactImg from "../../assets/ContactUs.jpg";

const ContactUs = () => {
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

                    <p>
                        WE'RE EXCITED TO PHOTOGRAPH YOUR FAMILY, MATERNITY MOMENTS,OR SPECIAL MILESTONES.
                        PLEASE LEAVE A MESSAGE BELOW,
                        AND WE’LL BE IN TOUCH SOON.
                    </p>

                    <form>
                        <label>Name*</label>
                        <input type="text" placeholder="Enter Your Name Here" />

                        <label>Mobile Number*</label>
                        <input type="text" placeholder="Enter Your Mobile Number Here" />

                        <label>Message*</label>
                        <textarea placeholder="Your Message..." />

                        <button type="submit">SEND MESSAGE</button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default ContactUs;
