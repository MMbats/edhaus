import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

const FAQ = () => {
  const faqs = [
    {
      question: 'What is EdHaus?',
      answer: 'EdHaus is your one-stop shop for construction materials and building supplies. We offer a wide range of quality products for all your construction needs.',
    },
    {
      question: 'How do I place an order?',
      answer: 'You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You\'ll need to be logged in to complete your purchase.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit/debit cards and mobile money. All payments are processed securely.',
    },
    // More FAQs can be added here
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="border border-gray-200 rounded-lg">
                <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-left text-gray-900 bg-white rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75">
                  <span className="font-medium">{faq.question}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-orange-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-2 pb-4 text-gray-600">
                  {faq.answer}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
