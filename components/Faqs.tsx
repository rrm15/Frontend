'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const Faqs: React.FC = () => {
  const faqData: FAQItem[] = [
    {
      question: "What is Wemace?",
      answer: "Wemace is a decentralized platform that empowers Self Help Groups (SHGs) in India by leveraging blockchain technology, AI, and DeFi solutions to enhance financial inclusion and community development."
    },
    {
      question: "How does blockchain technology benefit Self Help Groups?",
      answer: "Blockchain provides transparency, security, and immutability of financial transactions. It helps SHGs maintain accurate records, reduce fraud, and create trust within the community by ensuring every transaction is traceable and verifiable."
    },
    {
      question: "Is the platform secure?",
      answer: "Yes, our platform uses advanced blockchain encryption and AI-powered security measures to protect user data and financial transactions. We prioritize the privacy and safety of our SHG members."
    },
    {
      question: "How can my Self Help Group join Wemace?",
      answer: "You can register your SHG through our onboarding process. Our team will guide you through the verification and setup steps to integrate your group into the Wemace ecosystem."
    },
    {
      question: "What financial services does Wemace offer?",
      answer: "We provide micro-lending, investment tracking, group savings management, transparent fund allocation, and AI-driven financial insights tailored for Self Help Groups."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg bg-white shadow-sm"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
              >
                <span className="text-base md:text-lg font-semibold text-gray-800">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-blue-600" />
                ) : (
                  <ChevronDown className="text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-gray-600 text-sm md:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;