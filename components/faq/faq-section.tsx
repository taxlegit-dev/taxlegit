"use client";

import { useState } from "react";
import type { ServicePageFAQItem } from "@prisma/client";

type FAQSectionProps = {
  questions: ServicePageFAQItem[];
  region: "INDIA" | "US";
};

export function FAQSection({ questions, region }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const isIndia = region === "INDIA";

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <section
      className={`${
        isIndia
          ? "bg-gradient-to-br from-slate-50 via-white to-indigo-50"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      } py-16 md:py-24`}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isIndia ? "text-slate-900" : "text-white"
            }`}
          >
            Frequently Asked Questions
          </h2>
          <p
            className={`text-lg ${
              isIndia ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Find answers to common questions about our services
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all duration-300 ${
                  isIndia
                    ? isOpen
                      ? "border-indigo-300 bg-white shadow-lg"
                      : "border-slate-200 bg-white hover:border-indigo-200 hover:shadow-md"
                    : isOpen
                    ? "border-slate-600 bg-slate-800 shadow-xl"
                    : "border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800"
                }`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className={`w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-colors ${
                    isIndia
                      ? "hover:bg-slate-50"
                      : "hover:bg-slate-700/50"
                  }`}
                >
                  <span
                    className={`text-lg font-semibold flex-1 ${
                      isIndia ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {item.question}
                  </span>
                  <svg
                    className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    } ${
                      isIndia ? "text-indigo-600" : "text-indigo-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className={`px-6 pb-5 pt-0 ${
                      isIndia
                        ? "text-slate-700 prose prose-slate max-w-none"
                        : "text-slate-300 prose prose-invert prose-slate max-w-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative elements */}
        <div className="mt-12 text-center">
          <p
            className={`text-sm ${
              isIndia ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Still have questions?{" "}
            <a
              href="tel:+918929218091"
              className={`font-semibold underline hover:no-underline transition ${
                isIndia
                  ? "text-indigo-600 hover:text-indigo-700"
                  : "text-indigo-400 hover:text-indigo-300"
              }`}
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

