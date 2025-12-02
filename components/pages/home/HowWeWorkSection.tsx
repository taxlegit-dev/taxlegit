"use client";

import { useState } from "react";
import Image from "next/image";

export default function HowDoWeWork() {
  const [active, setActive] = useState(0);

  const images = [
    "https://taxlegit.com/wp_images/1.jpg",
    "https://taxlegit.com/wp_images/2.jpg",
    "https://taxlegit.com/wp_images/3.jpg",
    "https://taxlegit.com/wp_images/4.jpg",
  ];

  const steps = [
    {
      title: "Step 1 : Fill the Form",
      text: "Once you submitted the above form, you will be qualified to get a Free Expert Consultation Session & you will be receiving a call from our representative instantly.",
    },
    {
      title: "Step 2 : Evaluation With Our Professionals",
      text: "We will evaluate your start-up requirements and help you identify the most accurate business structure.",
    },
    {
      title: "Step 3 : Online Documentation",
      text: "Our experts will collect all required documents online securely and quickly.",
    },
    {
      title: "Step 4 : Finalising and Filing of All Forms",
      text: "Our experts verify all your documents and file the required applications with 100% accuracy.",
    },
  ];

  return (
    <section className="py-24 bg-white" id="how-we-work">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            How Do We <span className="text-blue-600">Work?</span>
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            A simple, guided process from start to finish
          </p>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-14 items-start">

          {/* LEFT — Perfect Crossfade Images */}
          <div className="flex justify-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg relative h-[650px] bg-gray-100">

              {images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt="How We Work"
                  width={600}
                  height={700}
                  className={`
                    object-cover w-full h-full absolute inset-0 transition-opacity duration-700 
                    ${active === i ? "opacity-100" : "opacity-0"}
                  `}
                />
              ))}

            </div>
          </div>

          {/* Right side steps unchanged */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isActive = active === index;

              return (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`
                    w-full text-left p-6 rounded-2xl border transition-all duration-300 group
                    ${
                      isActive
                        ? "bg-blue-50 border-blue-400 shadow-lg scale-[1.02]"
                        : "bg-white border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.01]"
                    }
                  `}
                >
                  <div className="flex">
                    <div
                      className={`
                        w-1 rounded-full mr-4 transition-all
                        ${isActive ? "bg-blue-600" : "bg-gray-200 group-hover:bg-blue-300"}
                      `}
                    ></div>

                    <div>
                      <h3
                        className={`
                          text-xl font-semibold transition-colors
                          ${isActive ? "text-blue-700" : "text-gray-900 group-hover:text-blue-600"}
                        `}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mt-2 text-[15px] leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
