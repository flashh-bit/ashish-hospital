export type DoctorData = {
  id: string;
  name: string;
  designation: string;
  speciality: string;
  qualifications: string;
  availableDays: string[];
  timings: string;
  imagePath: string;
};

// [PLACEHOLDER: Replace with actual doctor data before launch]
export const doctors: DoctorData[] = [
  {
    id: "doc-1",
    name: "Dr. Pujari Patel",
    designation: "Consultant Physician",
    speciality: "BAMS",
    qualifications: "BAMS",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    timings: "9:00 AM - 2:00 PM & 2:30 PM - 5:00 PM",
    imagePath: "/pp1.jpeg",
  },
  {
    id: "doc-2",
    name: "Dr. Ashish Patel",
    designation: "Medical Director",
    speciality: "MBBS",
    qualifications: "MBBS",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    timings: "9:00 AM - 2:00 PM & 2:30 PM - 5:00 PM",
    imagePath: "/ashish.jpeg",
  },
  {
    id: "doc-3",
    name: "Nitesh Chaudhary",
    designation: "EMT",
    speciality: "EMT (Basic Emergency Medical Technician)",
    qualifications: "EMT",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    timings: "9:00 AM - 2:00 PM & 2:30 PM - 5:00 PM",
    imagePath: "/nitesh.jpeg",
  },
];
