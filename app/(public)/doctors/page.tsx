import type { Metadata } from "next";
import DoctorsClient from "@/components/DoctorsClient";

export const metadata: Metadata = {
  title: "Our Doctors",
  description:
    "Meet the qualified and experienced doctors at Ashish Hospital, specialists in general medicine, surgery, pediatrics, and more.",
  alternates: {
    canonical: "https://ashishhospital.vercel.app/doctors",
  },
};

export default function DoctorsPage() {
  return <DoctorsClient />;
}
