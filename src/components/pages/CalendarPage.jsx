import React from "react";

const CalendarPage = () => {
  return (
    <div className="pt-[66px] min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Calendar</h1>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600">Your learning schedule and upcoming events will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;