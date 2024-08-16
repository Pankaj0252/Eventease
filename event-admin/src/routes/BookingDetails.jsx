import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBooking } from '../services/api.service';

export default function BookingDetails() {
    const params = useParams();
    const bookingId = params.bookingId;
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const fetchSingleBooking = async () => {
            try {
                const result = await getSingleBooking(bookingId);
                console.log('Fetched Single booking:', result);
                setBooking(result);
            } catch (error) {
                console.error('Error setting booking:', error);
            }
        };

        fetchSingleBooking();
    }, [bookingId]);

    return (
        <div className="booking-details p-5">
            <div className="card">
                <div className="card-header">Booking info</div>
                <div className="card-body">
                    <table className="table table-striped table-bordered table-hover">
                        <tbody>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td>{booking?.eventId.eventName}</td>
                            </tr>
                            <tr>
                                <td><strong>Booking Date</strong></td>
                                <td>{booking?.bookingDate}</td>
                            </tr>
                            <tr>
                                <td><strong>Created At</strong></td>
                                <td>{booking?.createdAt}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
