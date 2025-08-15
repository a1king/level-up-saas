export const mockData = {
  user: {
    name: "Sarah Joyce",
    university: "Stanford University", 
    major: "Computer Science",
    graduationYear: "2025",
    subscriptionTier: "premium" // free, premium
  },
  applications: [
    { id: 1, company: "Google", position: "Software Engineer Intern", date_applied: "2024-01-15", status: "Interview Scheduled", responseTime: 7, verified: true },
    { id: 2, company: "Microsoft", position: "SWE Intern", date_applied: "2024-01-10", status: "Pending", responseTime: null, verified: false },
    { id: 3, company: "Meta", position: "Frontend Engineer Intern", date_applied: "2024-01-08", status: "Rejected", responseTime: 14, verified: true },
    { id: 4, company: "Apple", position: "iOS Developer Intern", date_applied: "2024-01-05", status: "Offer Received", responseTime: 21, verified: true },
    { id: 5, company: "Netflix", position: "Data Science Intern", date_applied: "2024-01-03", status: "Pending", responseTime: null, verified: false }
  ],
  insights: {
    avgResponseTime: 14,
    interviewRate: 0.4,
    offerRate: 0.2,
    totalApplications: 5,
    responseRateByCompany: [
      { company: "Google", rate: 65, applications: 120 },
      { company: "Microsoft", rate: 45, applications: 89 },
      { company: "Meta", rate: 35, applications: 156 },
      { company: "Apple", rate: 55, applications: 78 },
      { company: "Netflix", rate: 25, applications: 93 }
    ],
    timelineData: [
      { week: "Week 1", applications: 12, responses: 2 },
      { week: "Week 2", applications: 8, responses: 5 },
      { week: "Week 3", applications: 15, responses: 3 },
      { week: "Week 4", applications: 10, responses: 4 }
    ]
  }
};

export const pricing = {
  free: {
    name: "Free Tracker",
    price: 0,
    features: ["Track up to 10 applications", "Basic status updates", "Community insights", "Export to CSV"]
  },
  premium: {
    name: "Premium Analytics + AI",
    price: 9,
    features: [
      "Unlimited applications", 
      "Advanced analytics & insights", 
      "🤖 AI Resume Analysis", 
      "🤖 AI Cover Letter Generator", 
      "🤖 AI Interview Preparation", 
      "🤖 Personalized Application Strategy",
      "Response time predictions", 
      "University-specific data", 
      "Verified submission badges"
    ]
  }
};
