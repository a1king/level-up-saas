import React, { useState, useEffect } from 'react';

export default function ApplicationTracker() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use mock data instead of Supabase for now
    setApplications([
      { id: 1, company: "Google", position: "SWE Intern", date_applied: "2024-01-15", status: "Pending" },
      { id: 2, company: "Microsoft", position: "Frontend Dev", date_applied: "2024-01-10", status: "Interview Scheduled" },
      { id: 3, company: "Apple", position: "iOS Developer", date_applied: "2024-01-05", status: "Offer Received" }
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">📝 Application Tracker</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6">
          <div className="grid gap-4">
            {applications.map(app => (
              <div key={app.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{app.company}</h3>
                  <p className="text-sm text-gray-600">{app.position}</p>
                  <p className="text-xs text-gray-500">{app.date_applied}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  app.status === 'Offer Received' ? 'bg-green-100 text-green-700' :
                  app.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
