'use client';
'use client';
import React, { useState } from 'react';

export default function GetFreeQuoteSidebar() {
  const [form, setForm] = useState({ name: '', phone: '', service: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Use mailto fallback for now (replace with API call if available)
    const subject = encodeURIComponent('Free Quote Request from Website');
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nService Needed: ${form.service}`
    );
    window.location.href = `mailto:info@technicalsewa.com?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  return (
    <aside className="w-full mb-0">
      <h3 className="text-xl font-bold text-primary mb-4 text-center">
        Get Free Quote
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-1"
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
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-gray-700 font-medium mb-1"
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
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="service"
            className="block text-gray-700 font-medium mb-1"
          >
            Service Needed
          </label>
          <input
            type="text"
            id="service"
            name="service"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g. AC Repair"
            value={form.service}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Request Quote'}
        </button>
        {status === 'sent' && (
          <p className="text-green-600 text-sm mt-2 text-center">
            Thank you! Your request has been sent.
          </p>
        )}
      </form>
    </aside>
  );
}
