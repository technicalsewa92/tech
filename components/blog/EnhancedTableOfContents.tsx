'use client';

import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';
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

const EnhancedTableOfContents: React.FC<TableOfContentsProps> = ({
  contentSelector,
  headingSelectors = 'h2, h3, h4',
  className = '',
}) => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    try {
      // Wait for DOM to be fully loaded
      setTimeout(() => {
        const contentElement = document.querySelector(contentSelector);
        if (!contentElement) {
          console.log('Content element not found:', contentSelector);
          return;
        }

        // Find all headings in the content
        const headings = Array.from(
          contentElement.querySelectorAll(headingSelectors)
        );

        if (headings.length === 0) {
          console.log('No headings found in content');
          return;
        }

        // Process headings to create TOC items
        const tocItems: TOCItem[] = headings.map((heading, index) => {
          const headingElement = heading as HTMLElement;
          const level = parseInt(headingElement.tagName.substring(1), 10);

          // Generate an ID if the heading doesn't have one
          if (!headingElement.id) {
            const safeId = `heading-${index}-${Date.now()}`;
            headingElement.id = safeId;
          }

          return {
            id: headingElement.id,
            text: headingElement.textContent?.trim() || `Section ${index + 1}`,
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

        headings.forEach(heading => {
          try {
            observer.observe(heading);
          } catch (error) {
            console.error('Error observing heading:', error);
          }
        });

        return () => {
          try {
            headings.forEach(heading => observer.unobserve(heading));
          } catch (error) {
            console.error('Error cleaning up observers:', error);
          }
        };
      }, 500); // Small delay to ensure content is loaded
    } catch (error) {
      console.error('Error setting up table of contents:', error);
    }
  }, [contentSelector, headingSelectors]);

  if (toc.length === 0) {
    return null;
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      <div
        className="flex items-center justify-between p-4 bg-blue-50 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-blue-800 flex items-center">
          <List className="mr-2" /> Table of Contents
        </h3>
        <span className="text-blue-500">{isOpen ? '−' : '+'}</span>
      </div>

      {isOpen && (
        <nav className="p-4">
          <ul className="space-y-2">
            {toc.map(item => (
              <li
                key={item.id}
                className={`
                  ${item.level === 2 ? 'ml-0' : item.level === 3 ? 'ml-4' : 'ml-8'}
                  ${activeId === item.id ? 'font-medium text-blue-600' : 'text-gray-700 hover:text-blue-500'}
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

export default EnhancedTableOfContents;
