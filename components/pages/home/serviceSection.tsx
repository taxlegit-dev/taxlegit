"use client";

import { useState } from "react";
import {
  HiShieldCheck,
  HiCurrencyDollar,
  HiUser,
  HiOfficeBuilding,
  HiDocumentText,
  HiUserGroup,
  HiReceiptTax,
  HiShoppingCart,
  HiBriefcase,
  HiSparkles,
  HiKey,
  HiGlobe,
  HiCollection,
  HiChartBar,
  HiCalculator,
  HiCash,
  HiTag,
  HiClipboardCheck,
  HiClipboardList,
  HiShieldExclamation,
  HiBeaker,
  HiClipboardCopy,
} from "react-icons/hi";

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState("Company Registration");

  const tabs = [
    "Company Registration",
    "Government Registration",
    "Tax Filing",
    "Compliance",
    "Compliance and Licensing",
    "Intellectual Properties",
  ];

  // Company Registration Services
  const companyRegistrationServices = [
    {
      icon: HiShieldCheck,
      title: "Private Limited Company Registration",
      description:
        "For Indian entrepreneurs, starting a private limited company is a common pick, due to the benefits it offers for growth and credibility.",
      link: "https://taxlegit.com/private-limited-company-registration",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: HiCurrencyDollar,
      title: "Limited Liability Partnership Registration",
      description:
        "A Limited Liability Partnership (LLP) Registration is an ideal business structure for small and medium-sized enterprises.",
      link: "https://taxlegit.com/limited-liability-partnership-registration",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: HiUser,
      title: "One Person Company Registration",
      description:
        "A One Person Company (OPC) is a unique business structure introduced in the Companies Act, 2013, aimed at solo entrepreneurs.",
      link: "https://taxlegit.com/one-person-company-registration",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: HiOfficeBuilding,
      title: "Public Limited Company Registration",
      description:
        "A Public Limited Company (PLC) is a popular business structure in India that many entrepreneurs and investors prefer.",
      link: "https://taxlegit.com/public-limited-company-registration",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: HiDocumentText,
      title: "Section 8 Company Registration",
      description:
        "Section 8 Company involved in the legal process of establishing a non-profit organization (NGO) under the Companies Act.",
      link: "https://taxlegit.com/section-8-company-registration",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: HiUserGroup,
      title: "Sole Proprietorship Registration",
      description:
        "A sole proprietorship is a type of business structure where the entire enterprise is owned and run by one individual.",
      link: "https://taxlegit.com/sole-proprietorship-registration",
      color: "from-teal-500 to-cyan-600",
    },
  ];

  // Government Registration Services
  const governmentRegistrationServices = [
    {
      icon: HiReceiptTax,
      title: "GST Registration",
      description:
        "The Goods and Services Tax (GST) is a comprehensive indirect tax levied on the manufacture, sale, and consumption of goods and services in India.",
      link: "https://taxlegit.com/gst-registration",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: HiShoppingCart,
      title: "GEM Registration",
      description:
        "The Government e-Marketplace (GeM) is an online platform established by the Government of India to facilitate procurement.",
      link: "https://taxlegit.com/gem-registration",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: HiBriefcase,
      title: "MSME Registration",
      description:
        "Micro, small, and medium enterprises (MSME) form the backbone of the Indian economy with government incentives.",
      link: "https://taxlegit.com/msme-registration",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: HiSparkles,
      title: "Startup India Registration",
      description:
        "The Government of India's well-known initiative to support startups with various benefits and recognition.",
      link: "https://taxlegit.com/startupindia-registration",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: HiKey,
      title: "DSC Registration",
      description:
        "A Digital Signature Certificate (DSC) is an electronic form of a signature that validates the identity of the sender.",
      link: "https://taxlegit.com/dsc-registration",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: HiGlobe,
      title: "Import Export Code Registration",
      description:
        "Import Export Code (IEC) registration is crucial for businesses in India engaged in international trade.",
      link: "https://taxlegit.com/import-export-code-registration",
      color: "from-teal-500 to-cyan-600",
    },
    {
      icon: HiCollection,
      title: "PF Registration",
      description:
        "PF registration involves enrolling an organization and its workers in India's Employees' Provident Fund scheme.",
      link: "https://taxlegit.com/pf-registration",
      color: "from-rose-500 to-pink-600",
    },
    {
      icon: HiChartBar,
      title: "LEI Registration",
      description:
        "Legal Entity Identifier (LEI) registration is a global system designed to uniquely identify legal entities.",
      link: "https://taxlegit.com/lei-registration",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: HiClipboardCheck,
      title: "Legal Metrology Registration",
      description:
        "Required for companies involved in manufacturing, packing, importing, and measuring equipment.",
      link: "https://taxlegit.com/legal-metrology-registration",
      color: "from-amber-500 to-orange-600",
    },
  ];

  // Tax Filing Services
  const taxFilingServices = [
    {
      icon: HiCalculator,
      title: "TDS Return Filing Online",
      description:
        "TDS Return Filing Online is crucial for individuals and businesses to ensure compliance with tax regulations.",
      link: "https://taxlegit.com/tds-return-filing-online",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: HiReceiptTax,
      title: "GST Returns Filing Online",
      description:
        "As a business owner, you must be well aware of the importance of GST return filing for compliance.",
      link: "https://taxlegit.com/gst-returns-filing-online",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: HiCash,
      title: "Income Tax Returns",
      description:
        "Income Tax Return (ITR) is a form through which taxpayers declare their taxable income and applicable tax details.",
      link: "https://taxlegit.com/income-tax-returns",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  // Compliance Services
  const complianceServices = [
    {
      icon: HiTag,
      title: "Trademark Registration",
      description:
        "Trademark registration is the legal procedure to acquire exclusive rights over brand elements like names and logos.",
      link: "https://taxlegit.com/trademark-registration",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: HiClipboardCheck,
      title: "Vendor Reconciliation",
      description:
        "Vendor reconciliation is a crucial process in financial management for maintaining healthy business relationships.",
      link: "https://taxlegit.com/vendor-reconciliation",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: HiClipboardList,
      title: "Due Diligence",
      description:
        "Due diligence stands as an important process for understanding legal, financial, and operational aspects of a business.",
      link: "https://taxlegit.com/due-diligence",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: HiShieldExclamation,
      title: "Shop and Establishment Registration",
      description:
        "Shop and Establishment Registration is mandatory for every business engaged in commercial activities.",
      link: "https://taxlegit.com/shop-and-establishment-registration",
      color: "from-green-500 to-emerald-600",
    },
  ];

  // Compliance and Licensing Services
  const complianceLicensingServices = [
    {
      icon: HiBeaker,
      title: "ISO Registration",
      description:
        "ISO certification helps businesses improve efficiency, productivity, and customer satisfaction.",
      link: "https://taxlegit.com/iso-registration",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: HiClipboardCopy,
      title: "FSSAI Registration",
      description:
        "FSSAI license registration is mandatory for every food business operator (FBO) in India.",
      link: "https://taxlegit.com/fssai-registration",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: HiGlobe,
      title: "ISP License Registration",
      description:
        "An ISP license is an official authorization to provide internet services to clients through various technologies.",
      link: "https://taxlegit.com/isp-license-registration",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  // Intellectual Properties Services
  const intellectualPropertiesServices = [
    {
      icon: HiTag,
      title: "Trademark Renewal",
      description:
        "Renewing a trademark in India is crucial for maintaining exclusive rights to your brand name, logo, or slogan.",
      link: "https://taxlegit.com/trademark-renewal",
      color: "from-blue-500 to-indigo-600",
    },
  ];

  // Get current services based on active tab
  const getCurrentServices = () => {
    switch (activeTab) {
      case "Company Registration":
        return companyRegistrationServices;
      case "Government Registration":
        return governmentRegistrationServices;
      case "Tax Filing":
        return taxFilingServices;
      case "Compliance":
        return complianceServices;
      case "Compliance and Licensing":
        return complianceLicensingServices;
      case "Intellectual Properties":
        return intellectualPropertiesServices;
      default:
        return companyRegistrationServices;
    }
  };

  const currentServices = getCurrentServices();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage:
            'url("https://taxlegit.com/assets/img/bg/ser-bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Commitment To Excellence
          </h2>
          <p className="text-2xl text-gray-600">
            The <span className="font-bold text-gray-900">Best Services</span>{" "}
            To You
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-900/30 transform scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:shadow-md"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentServices.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              {/* Icon Container */}
              <div className="relative mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300 leading-tight min-h-[56px]">
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors duration-300"
                  >
                    {service.title}
                  </a>
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {service.description}
                </p>

                {/* Button */}
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative inline-flex items-center px-6 py-2.5 rounded-lg font-semibold text-gray-700 border-2 border-gray-200 hover:border-transparent hover:text-white overflow-hidden group/btn transition-all duration-300`}
                >
                  <span
                    className={`absolute inset-0 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left`}
                  ></span>
                  <span className="relative flex items-center gap-2">
                    Know More
                    <svg
                      className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </a>
              </div>

              {/* Decorative Element */}
              <div
                className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${service.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
