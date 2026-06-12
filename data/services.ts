export type DepartmentData = {
  id: string;
  slug: string;
  iconId: string; // Used to render the correct SVG
  name: string;
  description: string;
};

export const departments: DepartmentData[] = [
  { id: "dept-1", slug: "cardiology", iconId: "pulse", name: "Cardiology", description: "Advanced heart care services and diagnostics." },
  { id: "dept-2", slug: "neurology", iconId: "brain", name: "Neurology", description: "Specialized care for all neurological disorders." },
  { id: "dept-3", slug: "orthopaedics", iconId: "bone", name: "Orthopaedics", description: "Expert treatment for musculoskeletal conditions." },
  { id: "dept-4", slug: "gastroenterology", iconId: "person", name: "Gastroenterology", description: "Comprehensive care for digestive system disorders." },
  { id: "dept-5", slug: "obstetrics-gynaecology", iconId: "mother", name: "Obstetrics & Gynaecology", description: "Dedicated women's health and maternity care." },
  { id: "dept-6", slug: "paediatrics", iconId: "heart", name: "Paediatrics", description: "Specialized pediatric care for infants and children." },
  { id: "dept-7", slug: "general-surgery", iconId: "clipboard", name: "General Surgery", description: "Advanced surgical interventions and post-operative care." },
  { id: "dept-8", slug: "general-medicine", iconId: "clipboard", name: "General Medicine", description: "Comprehensive primary care for patients of all ages." },
  { id: "dept-9", slug: "urology", iconId: "person", name: "Urology", description: "Expert diagnosis and treatment of urinary tract issues." },
  { id: "dept-10", slug: "nephrology", iconId: "person", name: "Nephrology", description: "Specialized care for kidney-related conditions." },
  { id: "dept-11", slug: "pulmonology", iconId: "person", name: "Pulmonology", description: "Comprehensive care for respiratory system diseases." },
  { id: "dept-12", slug: "dermatology", iconId: "person", name: "Dermatology", description: "Advanced skin care and dermatological treatments." },
];
