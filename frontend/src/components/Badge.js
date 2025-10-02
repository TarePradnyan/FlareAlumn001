import React from 'react';

const Badge = () => {
  return (
    <a 
      href="https://wowdev.ai?ref=68cfe79965aa40b118ee2ea6" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="fixed bottom-4 right-4 z-50 inline-flex items-center rounded-full bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      data-id="wowdev-badge"
    >
      Made with
      <span className="ml-1.5 bg-blue-500/10 text-blue-400 rounded-full px-2 py-0.5">wowdev.ai</span>
    </a>
  );
};

export default Badge;