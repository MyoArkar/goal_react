import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

export default function Documentation() {
  const [documentation, setDocumentation] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const [headings, setHeadings] = useState([]);
  const navigate = useNavigate();
  const observerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const activeHeadingRef = useRef(null);
  const mainContentRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Function to find the currently visible section
  const findVisibleSection = useCallback(() => {
    const headingElements = Array.from(document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'));
    if (!headingElements.length) return;

    const viewportHeight = window.innerHeight;

    // Calculate the ideal position (25% from the top of the viewport)
    const idealPosition = viewportHeight * 0.25;

    // Find all headings that are above the ideal position
    const visibleHeadings = headingElements
      .map(heading => ({
        id: heading.id,
        distance: Math.abs(heading.getBoundingClientRect().top - idealPosition)
      }))
      .filter(heading => heading.distance >= 0);

    // Sort by distance to ideal position
    visibleHeadings.sort((a, b) => a.distance - b.distance);

    // Return the closest heading to ideal position
    if (visibleHeadings.length > 0) {
      return visibleHeadings[0].id;
    }

    // If no headings found above, return the last heading in the document
    return headingElements[headingElements.length - 1].id;
  }, []);

  // Handle scroll events with debounce
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (!isScrollingRef.current) {
        const newActiveSection = findVisibleSection();
        if (newActiveSection && newActiveSection !== activeHeadingRef.current) {
          activeHeadingRef.current = newActiveSection;
          setActiveSection(newActiveSection);

          // Update navigation scroll position
          const activeNavItem = document.querySelector(`[data-section="${newActiveSection}"]`);
          if (activeNavItem) {
            const navContainer = activeNavItem.parentElement;
            const navContainerRect = navContainer.getBoundingClientRect();
            const activeItemRect = activeNavItem.getBoundingClientRect();

            // Only scroll navigation if item is out of view
            if (
              activeItemRect.top < navContainerRect.top ||
              activeItemRect.bottom > navContainerRect.bottom
            ) {
              activeNavItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
            }
          }
        }
      }
    }, 20); // Reduced delay for more responsive updates
  }, [findVisibleSection]);

  // Add scroll listener with options for better performance
  useEffect(() => {
    const options = {
      passive: true,
      capture: false
    };

    window.addEventListener('scroll', handleScroll, options);
    // Initial check for active section
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll, options);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Setup intersection observer
  useEffect(() => {
    const observerCallback = (entries) => {
      if (isScrollingRef.current) return;

      // Get all intersecting entries and their intersection ratios
      const intersectingEntries = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => ({
          id: entry.target.id,
          ratio: entry.intersectionRatio,
          top: entry.boundingClientRect.top
        }))
        .sort((a, b) => {
          // Prioritize elements closer to 25% from the top of the viewport
          const viewportHeight = window.innerHeight;
          const targetPosition = viewportHeight * 0.25;
          const aDist = Math.abs(a.top - targetPosition);
          const bDist = Math.abs(b.top - targetPosition);
          return aDist - bDist;
        });

      if (intersectingEntries.length > 0) {
        const mostVisible = intersectingEntries[0];
        if (activeHeadingRef.current !== mostVisible.id) {
          activeHeadingRef.current = mostVisible.id;
          setActiveSection(mostVisible.id);

          // Ensure the active item is visible in the navigation
          const activeNavItem = document.querySelector(`[data-section="${mostVisible.id}"]`);
          if (activeNavItem) {
            const navContainer = activeNavItem.parentElement;
            const navContainerRect = navContainer.getBoundingClientRect();
            const activeItemRect = activeNavItem.getBoundingClientRect();

            // Check if the active item is outside the visible area
            if (
              activeItemRect.top < navContainerRect.top ||
              activeItemRect.bottom > navContainerRect.bottom
            ) {
              activeNavItem.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
              });
            }
          }
        }
      }
    };

    // Create observer with optimized options
    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      rootMargin: '-10% 0px -70% 0px'
    });

    // Observe all headings after content is loaded
    const updateObservedElements = () => {
      if (observerRef.current) {
        // First disconnect existing observations
        observerRef.current.disconnect();
        
        // Then observe all heading elements
        const headingElements = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
        headingElements.forEach(element => {
          observerRef.current.observe(element);
        });
      }
    };

    // Initial observation
    updateObservedElements();

    // Re-observe after a short delay to ensure all elements are rendered
    const timeoutId = setTimeout(updateObservedElements, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [documentation]);

  useEffect(() => {
    // Fetch the documentation content
    fetch('/README.md')
      .then(response => response.text())
      .then(text => {
        setDocumentation(text);
        // Extract headings when content is loaded
        const extractedHeadings = text.split('\n')
          .filter(line => line.startsWith('#'))
          .map(line => {
            const level = line.match(/^#+/)[0].length;
            const text = line.replace(/^#+\s/, '');
            const id = text.toLowerCase()
              .replace(/[^\w]+/g, '-')
              .replace(/^-+|-+$/g, '');
            return { level, text, id };
          });
        setHeadings(extractedHeadings);
      })
      .catch(error => console.error('Error loading documentation:', error));
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isScrollingRef.current = true;
      activeHeadingRef.current = sectionId;
      setActiveSection(sectionId);
      
      // Get the element's position relative to the viewport
      const rect = element.getBoundingClientRect();
      const absoluteTop = window.pageYOffset + rect.top;
      
      // Scroll with a slight offset for better visibility
      window.scrollTo({
        top: absoluteTop - 100, // Adjust this value based on your header height
        behavior: 'smooth'
      });

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500); // Increased timeout to account for longer scroll animations
    }
  }, []);

  // Custom heading renderer that adds IDs
  const createHeadingRenderer = (level) => {
    return ({ children }) => {
      const text = children.toString();
      const id = text.toLowerCase()
        .replace(/[^\w]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const HeadingTag = `h${level}`;
      const className = {
        1: "pt-16 mb-6 text-4xl font-bold scroll-mt-16",
        2: "pt-16 mt-8 mb-4 text-3xl font-semibold scroll-mt-16",
        3: "pt-16 mt-6 mb-3 text-2xl font-medium scroll-mt-16",
        4: "pt-16 mt-4 mb-2 text-xl font-medium scroll-mt-16",
        5: "pt-16 mt-3 mb-2 text-lg font-medium scroll-mt-16",
        6: "pt-16 mt-2 mb-1 text-base font-medium scroll-mt-16"
      }[level];

      return (
        <HeadingTag id={id} className={className}>
          {children}
        </HeadingTag>
      );
    };
  };

  return (
    <div className="flex min-h-screen bg-defaultBg">
      {/* Sidebar Navigation */}
      <div className="overflow-y-auto fixed p-4 w-64 h-screen backdrop-blur-xl bg-white/50">
        <h2 className="mb-4 text-xl font-semibold">Contents</h2>
        <nav className="space-y-1">
          {headings.map(({ text, id, level }) => (
            <button
              key={id}
              data-section={id}
              onClick={() => scrollToSection(id)}
              className={`block w-full text-left px-2 py-1.5 rounded-md transition-colors duration-200
                ${level === 1 ? 'font-semibold' : ''}
                ${level === 2 ? 'pl-4' : ''}
                ${level === 3 ? 'pl-6 text-sm' : ''}
                ${level > 3 ? 'pl-8 text-sm' : ''}
                ${activeSection === id 
                  ? 'bg-sidebar text-defaultText' 
                  : 'hover:bg-white/60 text-bodyText hover:text-defaultText'}`}
            >
              {text}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="p-8 ml-64 w-full" ref={mainContentRef}>
        <div className="p-8 mx-auto max-w-4xl rounded-lg ring-1 shadow-sm backdrop-blur-xl bg-white/50 ring-black/5">
          <ReactMarkdown
            components={{
              h1: createHeadingRenderer(1),
              h2: createHeadingRenderer(2),
              h3: createHeadingRenderer(3),
              h4: createHeadingRenderer(4),
              h5: createHeadingRenderer(5),
              h6: createHeadingRenderer(6),
              p: ({ children }) => (
                <p className="mb-4 text-bodyText hover:text-bodyText selection:bg-sidebar selection:text-defaultText">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="pl-6 mb-4 space-y-2 list-disc text-bodyText hover:text-bodyText selection:bg-sidebar selection:text-defaultText">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="pl-6 mb-4 space-y-2 list-decimal text-bodyText hover:text-bodyText selection:bg-sidebar selection:text-defaultText">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-bodyText hover:text-bodyText selection:bg-sidebar selection:text-defaultText">
                  {children}
                </li>
              ),
              code: ({ inline, children }) => 
                inline ? 
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-bodyText hover:text-bodyText selection:bg-sidebar selection:text-defaultText">
                    {children}
                  </code> :
                  <pre className="overflow-x-auto p-4 mb-4 bg-gray-100 rounded-md">
                    <code className="font-mono text-sm text-bodyText hover:text-bodyText selection:bg-sidebar selection:text-defaultText">
                      {children}
                    </code>
                  </pre>,
              blockquote: ({ children }) => (
                <blockquote className="pl-4 my-4 italic border-l-4 border-gray-300 text-bodyText hover:text-bodyText selection:bg-sidebar selection:text-defaultText">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full border border-gray-200 text-bodyText hover:text-bodyText selection:bg-sidebar selection:text-defaultText">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="px-4 py-2 font-semibold bg-gray-50 border border-gray-200 text-bodyText hover:text-bodyText selection:bg-sidebar selection:text-defaultText">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-2 border border-gray-200 text-bodyText hover:text-bodyText selection:bg-sidebar selection:text-defaultText">
                  {children}
                </td>
              ),
              a: ({ children, href }) => {
                // Handle different types of links
                const handleClick = (e) => {
                  if (!href) return;
                  
                  // Handle internal section links (e.g., #introduction)
                  if (href.startsWith('#')) {
                    e.preventDefault();
                    const sectionId = href.slice(1);
                    scrollToSection(sectionId);
                    return;
                  }
                  
                  // Handle internal route links (e.g., /goals)
                  if (href.startsWith('/')) {
                    e.preventDefault();
                    navigate(href);
                    return;
                  }
                  
                  // For relative links without leading slash, treat as section links
                  if (!href.includes('://')) {
                    e.preventDefault();
                    const sectionId = href.replace(/^\.?\//, '').replace(/\.[^.]+$/, '');
                    scrollToSection(sectionId);
                    return;
                  }
                  
                  // External links will behave normally
                };

                // Determine if this is an external link
                const isExternalLink = href?.includes('://');

                return (
                  <a 
                    href={href} 
                    className="text-blue-600 underline hover:text-blue-800 selection:bg-sidebar selection:text-defaultText"
                    onClick={handleClick}
                    {...(isExternalLink && {
                      target: "_blank",
                      rel: "noopener noreferrer"
                    })}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {documentation}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
