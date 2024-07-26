import React from 'react';
import '../routes/auth/main.css';

export default function AboutUs() {
    return (
        <div className="about-us-container">
            <div className="section text-center">
                <h1>About Eventease</h1>
                <p className="lead">Welcome to Eventease, your ultimate destination for seamless event planning and management!</p>
            </div>
            <div className="section">
                <h2>Our Mission</h2>
                <p>At Eventease, we strive to transform your vision into reality. Whether you are organizing a corporate event, a wedding, a birthday party, or any other special occasion, our mission is to make the planning process effortless and enjoyable. We believe that every event is unique, and we are committed to providing personalized services tailored to your specific needs.</p>
            </div>
            <div className="section">
                <h2>Who We Are</h2>
                <p>Eventease was founded with a passion for creating memorable experiences. Our team is comprised of seasoned event planners, creative designers, and logistical experts who bring years of experience and a wealth of knowledge to the table. We pride ourselves on our attention to detail, innovative ideas, and commitment to excellence.</p>
            </div>
            <div className="section">
                <h2>What We Do</h2>
                <ul className="list">
                    <li><strong>Event Planning:</strong> From concept to execution, we handle every aspect of your event to ensure it runs smoothly.</li>
                    <li><strong>Venue Selection:</strong> We help you find the perfect venue that aligns with your vision and budget.</li>
                    <li><strong>Design & Decor:</strong> Our creative team transforms spaces with stunning decor that reflects your style and theme.</li>
                    <li><strong>Catering Services:</strong> Delicious and customized catering options to suit your event's needs.</li>
                    <li><strong>Entertainment & Activities:</strong> We provide a variety of entertainment options to keep your guests engaged and entertained.</li>
                    <li><strong>Logistics Management:</strong> Seamless coordination of all logistics, including transportation, accommodations, and scheduling.</li>
                </ul>
            </div>
            <div className="section">
                <h2>Why Choose Eventease?</h2>
                <ul className="list">
                    <li><strong>Personalized Approach:</strong> We understand that no two events are the same, and we tailor our services to meet your specific requirements.</li>
                    <li><strong>Expert Team:</strong> Our team of professionals brings expertise, creativity, and a passion for perfection to every project.</li>
                    <li><strong>Stress-Free Planning:</strong> We handle the details, so you can enjoy the experience without the hassle.</li>
                    <li><strong>Quality Assurance:</strong> We are committed to delivering exceptional service and exceeding your expectations.</li>
                </ul>
            </div>
            <div className="section">
                <h2>Our Commitment to You</h2>
                <p>At Eventease, we are dedicated to making your event a success. We listen to your needs, work within your budget, and go above and beyond to create an unforgettable experience. Your satisfaction is our top priority, and we are here to support you every step of the way.</p>
            </div>
        </div>
    );
}
