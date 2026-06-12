import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal Information — Ashish Hospital",
  description: "Privacy Policy, Terms of Service, and Cookie Policy for Ashish Hospital.",
  alternates: {
    canonical: "https://ashishhospital.vercel.app/legal",
  },
};

export default function LegalPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-5 md:px-12">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-[#16A34A] hover:text-[#15803D] font-medium text-sm mb-6 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A]">Legal Information</h1>
          <p className="text-gray-500 mt-3 text-sm md:text-base">Last updated: April 2026</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8E8] p-6 md:p-10 space-y-12">
          
          {/* Privacy Policy */}
          <section id="privacy">
            <h2 className="font-heading text-2xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center text-sm">1</span>
              Privacy Policy
            </h2>
            <div className="prose prose-sm md:prose-base text-gray-600 max-w-none space-y-4">
              <p>
                At Ashish Hospital, we are committed to protecting the privacy and security of our patients and visitors. This Privacy Policy explains how we collect, use, and safeguard your personal and medical information.
              </p>
              <h3 className="text-[#1A1A1A] font-semibold text-lg mt-6 mb-2">Information We Collect</h3>
              <p>
                We may collect personal information such as your name, contact details, medical history, and insurance information when you book an appointment, fill out patient forms, or use our services.
              </p>
              <h3 className="text-[#1A1A1A] font-semibold text-lg mt-6 mb-2">How We Use Your Information</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide medical care and treatment.</li>
                <li>To process billing and insurance claims.</li>
                <li>To communicate with you regarding appointments, test results, or hospital updates.</li>
                <li>To improve our services and patient experience.</li>
              </ul>
              <h3 className="text-[#1A1A1A] font-semibold text-lg mt-6 mb-2">Data Security</h3>
              <p>
                We implement strict security measures to protect your medical records and personal data against unauthorized access, alteration, disclosure, or destruction, in compliance with applicable healthcare regulations.
              </p>
            </div>
          </section>

          <hr className="border-[#E8E8E8]" />

          {/* Terms of Service */}
          <section id="terms">
            <h2 className="font-heading text-2xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center text-sm">2</span>
              Terms of Service
            </h2>
            <div className="prose prose-sm md:prose-base text-gray-600 max-w-none space-y-4">
              <p>
                By accessing and using the Ashish Hospital website or our physical facilities, you agree to comply with and be bound by the following terms and conditions.
              </p>
              <h3 className="text-[#1A1A1A] font-semibold text-lg mt-6 mb-2">Medical Disclaimer</h3>
              <p>
                The content provided on our website is for informational purposes only and is not intended to substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
              <h3 className="text-[#1A1A1A] font-semibold text-lg mt-6 mb-2">Appointments and Cancellations</h3>
              <p>
                We request that you arrive on time for your scheduled appointments. If you need to cancel or reschedule, please notify us at least 24 hours in advance so that we may offer the time slot to another patient.
              </p>
              <h3 className="text-[#1A1A1A] font-semibold text-lg mt-6 mb-2">Visitor Policy</h3>
              <p>
                To ensure the safety and comfort of our patients, we ask that all visitors adhere to the hospital&apos;s visiting hours and guidelines. Aggressive or disruptive behavior will not be tolerated.
              </p>
            </div>
          </section>

          <hr className="border-[#E8E8E8]" />

          {/* Cookie Policy */}
          <section id="cookies">
            <h2 className="font-heading text-2xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center text-sm">3</span>
              Cookie Policy
            </h2>
            <div className="prose prose-sm md:prose-base text-gray-600 max-w-none space-y-4">
              <p>
                Our website uses cookies to enhance your browsing experience, analyze site traffic, and understand where our audience comes from.
              </p>
              <h3 className="text-[#1A1A1A] font-semibold text-lg mt-6 mb-2">What Are Cookies?</h3>
              <p>
                Cookies are small text files that are placed on your device by a web server when you visit our site. They help the site remember your actions and preferences over time.
              </p>
              <h3 className="text-[#1A1A1A] font-semibold text-lg mt-6 mb-2">How We Use Cookies</h3>
              <p>
                We use strictly necessary cookies to ensure the basic functionality of the website. We may also use analytical cookies to help us understand how visitors interact with the site, so we can improve our content and layout.
              </p>
              <h3 className="text-[#1A1A1A] font-semibold text-lg mt-6 mb-2">Managing Cookies</h3>
              <p>
                You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. However, if you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
              </p>
            </div>
          </section>

          <div className="mt-8 pt-8 border-t border-[#E8E8E8]">
            <p className="text-sm text-gray-500">
              If you have any questions regarding these policies, please contact us at <a href="mailto:ashishhospital555@gmail.com" className="text-[#16A34A] hover:underline">ashishhospital555@gmail.com</a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
