import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-4 px-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900 text-left">{question}</h3>
        {isOpen ? (
          <ChevronUp className="text-gray-500 w-5 h-5" />
        ) : (
          <ChevronDown className="text-gray-500 w-5 h-5" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="p-6 pt-2 text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "How do I borrow a book?",
      answer: "To borrow a book, first ensure you're logged into your account. Browse our collection and select the book you'd like to borrow. Click the 'Borrow' button on the book's page. You can borrow up to 5 books at a time for a period of 14 days."
    },
    {
      question: "What is the loan period and how can I renew a book?",
      answer: "The standard loan period is 14 days. You can renew a book up to 2 times if no other user has reserved it. To renew, go to your 'Borrowed Books' page and click the 'Renew' button next to the book you wish to extend."
    },
    {
      question: "How do I return a book?",
      answer: "Books should be returned to the library's physical location during operating hours. Once returned, our staff will update your account within 24 hours. For digital books, they are automatically returned at the end of the loan period."
    },
    {
      question: "What happens if I return a book late?",
      answer: "Late returns incur a fee of $0.50 per day per book. If you know you'll be late, please renew the book online or contact the library. Your borrowing privileges may be suspended if you have outstanding late fees."
    },
    {
      question: "Can I reserve a book that is currently checked out?",
      answer: "Yes, you can place a hold on books that are currently checked out. When the book becomes available, you'll be notified via email and it will be held for you for 48 hours."
    },
    {
      question: "How do I search for specific books?",
      answer: "Use the search bar at the top of the 'All Books' page. You can search by title, author, or ISBN. Use the filters on the left to narrow results by genre, availability, or publication year."
    },
    {
      question: "What should I do if I lose a book?",
      answer: "If you lose a book, please report it immediately through your account or by contacting the library. You will be charged the replacement cost of the book plus a processing fee. The exact amount will be determined based on the book's current market value."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h1 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about using our library services
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;