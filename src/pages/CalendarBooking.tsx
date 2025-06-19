
import N8nCalendarBooking from "@/components/calendar/N8nCalendarBooking";

const CalendarBookingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Schedule Progress Discussion
          </h1>
          <p className="text-lg text-gray-600">
            Book a one-on-one session with your instructor to discuss your weekly progress
          </p>
        </div>
        
        <N8nCalendarBooking />
      </div>
    </div>
  );
};

export default CalendarBookingPage;
