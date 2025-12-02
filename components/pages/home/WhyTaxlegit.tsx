"use client";

import {
  Users,
  Eye,
  Handshake,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    title: "Experienced Professionals",
    icon: BadgeCheck,
  },
  {
    title: "Transparency",
    icon: Eye,
  },
  {
    title: "Strong Clientele Base",
    icon: Users,
  },
  {
    title: "Punctuality",
    icon: Handshake,
  },
];

export default function WhyChooseTaxLegit() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
          Why Choose <span className="text-blue-700">Taxlegit?</span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-600 mt-4 text-lg md:text-xl">
          Let&apos;s do great work together
        </p>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  p-8
                  bg-white
                  rounded-2xl
                  border border-gray-200
                  shadow-sm
                  hover:shadow-md
                  transition-all duration-300
                  flex flex-col items-center text-center
                "
              >
                {/* Icon container */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200">
                  <Icon
                    className="w-11 h-11 text-blue-600"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                {/* Accent line */}
                <div className="mt-4 w-12 h-1 bg-blue-600/20 rounded-full"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
