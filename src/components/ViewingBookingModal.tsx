import React, { useState } from 'react';
import { Property, ViewingBooking } from '../types';
import { X, Calendar, Clock, Video, UserCheck, CheckCircle2, Phone, Mail, User } from 'lucide-react';

interface ViewingBookingModalProps {
  property: Property | null;
  onClose: () => void;
  onConfirmBooking: (booking: ViewingBooking) => void;
}

export const ViewingBookingModal: React.FC<ViewingBookingModalProps> = ({
  property,
  onClose,
  onConfirmBooking
}) => {
  if (!property) return null;

  // Tomorrow's date default YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [viewingType, setViewingType] = useState<'In-Person' | 'Live Video Tour'>('In-Person');
  const [tenantName, setTenantName] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const TIME_SLOTS = [
    '09:00 AM',
    '11:00 AM',
    '02:00 PM',
    '04:00 PM',
    '06:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantName || !tenantEmail || !tenantPhone) return;

    const newBooking: ViewingBooking = {
      id: `booking-${Date.now()}`,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyCity: property.city,
      propertyAddress: property.address,
      landlordName: property.landlord.name,
      landlordPhone: property.landlord.phone,
      tenantName,
      tenantEmail,
      tenantPhone,
      date,
      timeSlot,
      viewingType,
      notes,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    onConfirmBooking(newBooking);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-neutral-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-neutral-900 text-white p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Direct Landlord Tour</span>
            <h3 className="text-lg font-bold">Schedule Property Viewing</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-neutral-900">Viewing Scheduled!</h3>
            <p className="text-sm text-neutral-600 max-w-xs mx-auto">
              Your viewing request for <strong className="text-neutral-900">{property.title}</strong> has been sent to landlord <strong className="text-emerald-700">{property.landlord.name}</strong>.
            </p>

            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-xs text-left space-y-2 font-mono">
              <div><span className="text-neutral-500">Date & Time:</span> <strong className="text-neutral-900">{date} at {timeSlot}</strong></div>
              <div><span className="text-neutral-500">Format:</span> <strong className="text-emerald-700">{viewingType}</strong></div>
              <div><span className="text-neutral-500">Landlord Contact:</span> <strong className="text-neutral-900">{property.landlord.phone}</strong></div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              Done & View Bookings
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-neutral-900">
            
            {/* Property Summary Pill */}
            <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-200 flex items-center gap-3">
              <img
                src={property.photos[0]}
                alt=""
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold truncate">{property.title}</h4>
                <p className="text-[11px] text-neutral-500">{property.address}, {property.city}</p>
              </div>
            </div>

            {/* Viewing Type Selector (In-person vs Live Video) */}
            <div>
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                Viewing Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setViewingType('In-Person')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    viewingType === 'In-Person'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  In-Person Visit
                </button>

                <button
                  type="button"
                  onClick={() => setViewingType('Live Video Tour')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    viewingType === 'Live Video Tour'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  Live Video Call
                </button>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tenant Contact Information */}
            <div className="space-y-3 pt-2 border-t border-neutral-100">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                Your Contact Information
              </label>

              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp"
                    value={tenantPhone}
                    onChange={(e) => setTenantPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <textarea
                rows={2}
                placeholder="Optional notes for landlord (e.g. move-in timeframe, occupants)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Confirm Submit */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-emerald-600/30 transition-all"
            >
              Confirm Viewing Booking
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
