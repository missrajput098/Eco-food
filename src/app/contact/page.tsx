"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { PageHeader } from "@/ui/PageHeader";
import { useCart } from "@/context/CartContext";
import { TrustBadges } from "@/components/sections/TrustBadges";

const FAQS = [
  {
    q: "Are all your products 100% certified organic?",
    a: "Yes! Every single fruit, vegetable, grain, and packaged item is rigorously certified by USDA Organic and non-GMO verified. We never allow artificial pesticides, synthetic fertilizers, or wax coatings.",
  },
  {
    q: "How does temperature-controlled delivery work?",
    a: "Our fleet uses insulated, climate-controlled refrigerated containers so that your leafy greens, cold-pressed juices, and fresh dairy arrive at your doorstep in peak harvest condition.",
  },
  {
    q: "What is your 100% Money Back Guarantee?",
    a: "If an item arrives bruised or does not meet your quality standards, simply let us know via email or chat within 48 hours for an instant full refund or immediate replacement.",
  },
  {
    q: "Do you offer bulk or wholesale pricing for cafes?",
    a: "Yes! We supply several organic restaurants, smoothie bars, and bakeries. Contact our wholesale desk at wholesale@organicfoodstore.com for our catalog and volume pricing.",
  },
];

export default function ContactPage() {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Message received! Our organic team will reply within 2 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: "",
    });
  };

  return (
    <div className="bg-[#fbfbf9] min-h-screen pb-16">
      <PageHeader
        title="We'd Love to Hear from You"
        subtitle="Have questions about our bio-farm sourcing, order deliveries, or healthy living tips? Get in touch with our friendly organic team."
        badge="Customer Care & Support"
        breadcrumbs={[{ label: "Contact" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* 3 Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl border border-[#e4ece6] p-7 flex items-start gap-4 shadow-xs hover:border-[#2e7d32] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#eaf4ed] text-[#2e7d32] flex items-center justify-center flex-shrink-0">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#142417]">Visit Us</h3>
              <p className="text-xs text-[#4c6052] mt-1 leading-relaxed">
                123 Green Way, Suite 400 <br />
                New York, NY 10001, USA
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#829487]">
                <Clock size={12} className="text-[#2e7d32]" />
                <span>Mon-Sat: 8am - 8pm</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl border border-[#e4ece6] p-7 flex items-start gap-4 shadow-xs hover:border-[#2e7d32] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#eaf4ed] text-[#2e7d32] flex items-center justify-center flex-shrink-0">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#142417]">Call Us</h3>
              <p className="text-xs text-[#4c6052] mt-1 leading-relaxed">
                Toll Free: <strong>+1 (555) 123-4567</strong> <br />
                Direct Line: +1 (555) 987-6543
              </p>
              <p className="mt-3 text-[11px] text-[#2e7d32] font-semibold">
                Available 7 days a week
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl border border-[#e4ece6] p-7 flex items-start gap-4 shadow-xs hover:border-[#2e7d32] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#eaf4ed] text-[#2e7d32] flex items-center justify-center flex-shrink-0">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#142417]">Email Support</h3>
              <p className="text-xs text-[#4c6052] mt-1 leading-relaxed">
                General: hello@organicfoodstore.com <br />
                Orders: orders@organicfoodstore.com
              </p>
              <p className="mt-3 text-[11px] text-[#2e7d32] font-semibold">
                Average reply time: ~2 hours
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form & FAQ Two-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#e4ece6] p-8 sm:p-10 shadow-xs">
            <h2 className="text-2xl font-extrabold text-[#142417]">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-[#4c6052] mt-1.5 mb-6">
              Fill in the form below and we will get back to you as soon as possible.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-[#eaf4ed] border border-[#c8e6c9] flex items-center gap-3 text-xs sm:text-sm text-[#1b3d22]">
                <CheckCircle2 size={18} className="text-[#2e7d32] flex-shrink-0" />
                <span>
                  Thank you! Your message has been sent. Our team will contact you shortly.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#142417] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#cbd8cf] text-xs sm:text-sm text-[#142417] focus:outline-none focus:border-[#2e7d32] bg-[#fbfbf9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142417] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#cbd8cf] text-xs sm:text-sm text-[#142417] focus:outline-none focus:border-[#2e7d32] bg-[#fbfbf9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#142417] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#cbd8cf] text-xs sm:text-sm text-[#142417] focus:outline-none focus:border-[#2e7d32] bg-[#fbfbf9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142417] mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#cbd8cf] text-xs sm:text-sm text-[#142417] focus:outline-none focus:border-[#2e7d32] bg-[#fbfbf9]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Farm Sourcing">Bio Farm Sourcing</option>
                    <option value="Wholesale">Wholesale & Business</option>
                    <option value="Feedback">Customer Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142417] mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="How can our organic specialists assist you today?"
                  className="w-full px-4 py-3 rounded-xl border border-[#cbd8cf] text-xs sm:text-sm text-[#142417] focus:outline-none focus:border-[#2e7d32] bg-[#fbfbf9]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#1b3d22] hover:bg-[#142f1a] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Message</span>
                <Send size={15} />
              </button>
            </form>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={20} className="text-[#2e7d32]" />
              <h2 className="text-xl font-extrabold text-[#142417]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-[#e4ece6] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#142417] hover:text-[#2e7d32]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 text-[#829487] flex-shrink-0 ${
                        openFaq === i ? "rotate-180 text-[#2e7d32]" : ""
                      }`}
                    />
                  </button>

                  {openFaq === i && (
                    <div className="px-4 pb-4 text-xs text-[#4c6052] leading-relaxed border-t border-[#eff4f0] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <TrustBadges />
      </div>
    </div>
  );
}
