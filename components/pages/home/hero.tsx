import { Building2 } from "lucide-react";

export default function TaxLegitHero() {
  return (
    <div className="relative bg-white px-4 sm:px-6 lg:px-8  grid items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-4">
                Launch Your Business
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  with Confidence
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Expert business registration, tax compliance, and NGO setup
                services. Your trusted partner for hassle-free company
                incorporation and complete legal solutions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                </div>
                <div className="ml-2">
                  <div className="text-sm font-bold text-slate-800">
                    5000+ Happy Clients
                  </div>
                  <div className="text-xs text-gray-600">
                    Trusted nationwide
                  </div>
                </div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image & Refund Card */}
          <div className="relative lg:block hidden">
            <div className="absolute top-8 left-0 z-10 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-white/50">
              <div className="text-sm text-gray-600 mb-1">
                Total Savings Generated
              </div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                ₹1,47,060
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600">Live tracking</span>
              </div>
            </div>

            <div className="relative ml-auto w-full max-w-md">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <div className="w-full h-full bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Building2 className="text-indigo-600" size={64} />
                    </div>
                    <div className="text-slate-700 font-semibold text-lg">
                      Your Success Partner
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="text-green-600"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 11l3 3L22 4"></path>
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">
                      Verified Partner
                    </div>
                    <div className="text-xs text-gray-600">
                      Government approved
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
