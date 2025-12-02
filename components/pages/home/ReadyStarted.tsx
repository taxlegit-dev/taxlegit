// components/GetStartedSection.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function GetStartedSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="px-8 py-12 md:p-16 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-10 md:mb-0 md:pr-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Ready to get started?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Join thousands of users who are already simplifying their company and ngo registration process with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="https://cleartax.in/filing?utm_ref=itr_2025_organic_CT_homepage_inpage_cta_productsforeveryone_Try+for+free" 
                  target="_blank"
                  className="inline-block"
                >
                  <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg">
                    Try for free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button className="bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-sm hover:shadow">
                  Schedule a demo
                </button>
              </div>
              
            </div>
            
            {/* Rounded Image Container */}
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="relative w-full h-64 md:h-80">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src="https://assets1.cleartax-cdn.com/cleartax/images/1605855097_desktop_fold_readytogetstarted_rhs.png"
                      alt="ClearTax - Ready to get started illustration"
                      fill
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="rounded-2xl"
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}