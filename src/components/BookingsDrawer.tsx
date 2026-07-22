import React from 'react';
import { ViewingBooking } from '../types';
import { X, CalendarCheck, Clock, MapPin, Phone, Video, Trash2, CheckCircle2 } from 'lucide-react';

interface BookingsDrawerProps {
  bookings: ViewingBooking[];
  onClose: () => void;
  onCancelBooking: (bookingId: string) => void;
}

export const BookingsDrawer: React.FC<BookingsDrawerProps> = ({
  bookings,
  onClose,
  onCancelBooking
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between text-neutral-900 border-l border-neutral-200">
        
        {/* Header */}
        <div className="p-5 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold">My Scheduled Viewings ({bookings.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <CalendarCheck className="w-12 h-12 text-neutral-300 mx-auto" />
              <p className="text-sm font-semibold text-neutral-600">No scheduled viewings yet.</p>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Click "Book Viewing" on any property card to schedule an in-person or live video tour with the landlord.
              </p>
            </div>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {b.status}
                  </span>
                  <button
                    onClick={() => onCancelBooking(b.id)}
                    className="text-neutral-400 hover:text-rose-600 p-1"
                    title="Cancel Viewing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-neutral-900">{b.propertyTitle}</h4>
                  <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                    {b.propertyAddress}, {b.propertyCity}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white p-2.5 rounded-xl border border-neutral-200/80">
                  <div className="flex items-center gap-1 text-neutral-700">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-700">
                    <span>{b.timeSlot}</span>
                  </div>
                  <div className="col-span-2 text-[11px] text-emerald-700 font-semibold pt-1 border-t border-neutral-100">
                    Format: {b.viewingType}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Landlord Contact:</span>
                    <strong className="text-neutral-900">{b.landlordName}</strong>
                  </div>
                  <a
                    href={`tel:${b.landlordPhone}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-center text-xs text-neutral-500">
          Landlords receive instant notifications for your scheduled viewings.
        </div>

      </div>
    </div>
  );
};
