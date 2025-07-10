'use client';

import React, { useEffect, useState } from 'react';
import { FiList } from 'react-icons/fi';
import { Link as ScrollLink } from 'react-scroll';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector: string;
  headingSelectors?: string;
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  contentSelector,
  headingSelectors = 'h2, h3, h4',
  className = '',
}) => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) return;

    // Find all headings in the content
    const headings = Array.from(
      contentElement.querySelectorAll(headingSelectors)
    );

    // Process headings to create TOC items
    const tocItems: TOCItem[] = headings.map((heading, index) => {
      const headingElement = heading as HTMLElement;
      const level = parseInt(headingElement.tagName.substring(1), 10);

      // Generate an ID if the heading doesn't have one
      if (!headingElement.id) {
        headingElement.id = `heading-${index}`;
      }

      return {
        id: headingElement.id,
        text: headingElement.textContent || `Section ${index + 1}`,
        level,
      };
    });

    setToc(tocItems);

    // Set up intersection observer to highlight active section
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach(heading => observer.observe(heading));

    return () => {
      headings.forEach(heading => observer.unobserve(heading));
    };
  }, [contentSelector, headingSelectors]);

  if (toc.length === 0) {
    return null;
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      <div
        className="flex items-center justify-between p-4 bg-[#2591b2]/10 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-[#2591b2] flex items-center">
          <FiList className="mr-2" /> Table of Contents
        </h3>
        <span className="text-[#2591b2]">{isOpen ? '−' : '+'}</span>
      </div>

      {isOpen && (
        <nav className="p-4">
          <ul className="space-y-2">
            {toc.map(item => (
              <li
                key={item.id}
                className={`
                  ${item.level === 2 ? 'ml-0' : item.level === 3 ? 'ml-4' : 'ml-8'}
                  ${activeId === item.id ? 'font-medium text-[#2591b2]' : 'text-gray-700 hover:text-[#2591b2]'}
                  transition-colors duration-200
                `}
              >
                <ScrollLink
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="block py-1 cursor-pointer"
                >
                  {item.text}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TableOfContents;
