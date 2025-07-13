'use client';

import React from 'react';

function WhyChooseUs() {
  return (
    <section className="bg-white py-16" suppressHydrationWarning={true}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-primary rounded-full"></div>
            <span className="text-primary font-medium text-sm uppercase tracking-wide">
              Why Choose Us
            </span>
            <div className="h-0.5 w-8 bg-primary rounded-full"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-8">
            Trusted by Thousands Across Nepal, Because We Care About Your Safety
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Your trust is our priority. We follow strict safety protocols and
            deliver exceptional service quality.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
          {/* Get a Quote Form */}
          <div className="flex-1 max-w-lg mx-auto md:mx-0">
            <form className="bg-gray-50 rounded-xl shadow p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-4 text-center">
                Get a Free Quote
              </h3>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your Phone Number"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="service"
                >
                  Service Needed
                </label>
                <input
                  type="text"
                  id="service"
                  name="service"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g. Washing Machine Repair"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                Request Quote
              </button>
            </form>
          </div>
          {/* Safety Features Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto md:mx-0">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 text-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">😷</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Safety Masks
              </h3>
              <p className="text-gray-600 text-sm">
                Ensuring proper protective equipment
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 text-center">
              <div className="w-12 h-12 bg-primary/80 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">📞</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock assistance
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">🧴</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Sanitization
              </h3>
              <p className="text-gray-600 text-sm">
                Hands & equipment sterilization
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">🧤</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Safety Gloves
              </h3>
              <p className="text-gray-600 text-sm">
                Professional protective gear
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
