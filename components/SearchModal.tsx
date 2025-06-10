'use client';

import { Fragment, useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { searchContent, SearchIndexItem } from '@/lib/search'; // Adjust path as needed

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchIndexItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 1) { // Only search if query is at least 2 characters
        const searchResults = await searchContent(query);
        setResults(searchResults);
      } else {
        setResults([]);
      }
    }, 300); // Debounce search for 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleResultClick = () => {
    onClose(); // Close modal on result click
    setQuery(''); // Reset query
    setResults([]); // Clear results
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-[70] w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-xl bg-white dark:bg-card-dark shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                />
                <input
                  ref={inputRef}
                  type="text"
                  name="search-query"
                  id="search-query"
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-0 focus:outline-none sm:text-sm"
                  placeholder="Search projects, docs, and pages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search site content"
                />
                <button
                  type="button"
                  className="absolute right-4 top-3.5 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  onClick={onClose}
                  aria-label="Close search"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {query.length > 0 && results.length === 0 && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No results found for &quot;{query}&quot;.
                </div>
              )}

              {results.length > 0 && (
                <ul role="list" className="max-h-80 scroll-py-10 scroll-pb-2 overflow-y-auto p-4">
                  {results.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 * results.indexOf(item) }}
                      className="group p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <Link href={item.url} onClick={handleResultClick}>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {item.description}
                          </p>
                          <span className="mt-1 text-xs text-primary dark:text-secondary capitalize">{item.category}</span>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
