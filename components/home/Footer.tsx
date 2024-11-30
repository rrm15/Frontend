import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const links = {
    Product: ['Features', 'Security', 'Roadmap', 'Documentation'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Support', 'Partners', 'Community', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Compliance', 'Security']
  };

  return (
    <footer className="bg-gray-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Wemace</h3>
            <p className="text-gray-400 mb-6">
              Empowering Self Help Groups through blockchain technology and decentralized finance.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="hover:text-[#FF1493] transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-bold mb-4">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p suppressHydrationWarning>
            &copy; {currentYear} Wemace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}