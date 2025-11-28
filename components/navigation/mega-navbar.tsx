"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Region } from "@prisma/client";
import { RegionSwitcher } from "@/components/navigation/region-switcher";
import { toSupportedRegion } from "@/lib/regions";

type NavbarItem = {
  id: string;
  label: string;
  href: string | null;
  type: string;
  isLoginLink: boolean;
  order: number;
  groups: Array<{
    label: string | null;
    items: Array<{
      id: string;
      label: string;
      href: string | null;
      order: number;
    }>;
  }>;
};

type MegaNavbarProps = {
  region: Region;
  initialItems?: NavbarItem[];
};

export function MegaNavbar({ region, initialItems = [] }: MegaNavbarProps) {
  const [items, setItems] = useState<NavbarItem[]>(initialItems);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Fetch navbar items on mount and when region changes
  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const response = await fetch(`/api/navbar?region=${region}`);
        const data = await response.json();
        if (data.items) {
          setItems(data.items);
        }
      } catch (error) {
        console.error("Failed to fetch navbar:", error);
      }
    };

    if (initialItems.length === 0) {
      fetchNavbar();
    }
  }, [region, initialItems.length]);

  const mappedRegion = toSupportedRegion(region);
  const regionPrefix = region === Region.US ? "/us" : "";

  const toggleMobileItem = (itemId: string) => {
    setOpenMobileItem(openMobileItem === itemId ? null : itemId);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
        {/* Logo */}
        <Link
          href={region === Region.US ? "/us" : "/"}
          className="text-xl font-bold tracking-tight text-zinc-900 hover:text-indigo-600 transition"
        >
          Taxlegit
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {items.map((item) => {
            if (item.type === "DROPDOWN" && item.groups.length > 0) {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-zinc-700 hover:text-indigo-600 transition rounded-lg hover:bg-indigo-50">
                    {item.label}
                    <svg
                      className={`h-4 w-4 transition-transform ${hoveredItem === item.id ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Mega Menu Dropdown */}
                  {hoveredItem === item.id && (
                    <div className="absolute left-1/2 top-full mt-2 w-[600px] -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
                      <div className="grid grid-cols-2 gap-6">
                        {item.groups.map((group, groupIndex) => (
                          <div key={groupIndex} className="space-y-3">
                            {group.label && (
                              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-2">
                                {group.label}
                              </h3>
                            )}
                            <ul className="space-y-1.5">
                              {group.items.map((subItem) => (
                                <li key={subItem.id}>
                                  <Link
                                    href={subItem.href ? `${regionPrefix}${subItem.href}` : "#"}
                                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                                  >
                                    {subItem.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href ? `${regionPrefix}${item.href}` : "#"}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  item.isLoginLink
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "text-zinc-700 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <RegionSwitcher currentRegion={mappedRegion} />
          </div>
          <Link
            href="/login"
            className="hidden md:block rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700 transition hover:border-indigo-500 hover:text-indigo-600"
          >
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-700 hover:text-indigo-600 transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-2">
            {items.map((item) => {
              if (item.type === "DROPDOWN" && item.groups.length > 0) {
                return (
                  <div key={item.id} className="border-b border-zinc-100 last:border-0">
                    <button
                      onClick={() => toggleMobileItem(item.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-zinc-700 hover:text-indigo-600 transition"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`h-4 w-4 transition-transform ${openMobileItem === item.id ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {openMobileItem === item.id && (
                      <div className="px-4 pb-4 space-y-4">
                        {item.groups.map((group, groupIndex) => (
                          <div key={groupIndex} className="space-y-2">
                            {group.label && (
                              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 pt-2">
                                {group.label}
                              </h3>
                            )}
                            <ul className="space-y-1">
                              {group.items.map((subItem) => (
                                <li key={subItem.id}>
                                  <Link
                                    href={subItem.href ? `${regionPrefix}${subItem.href}` : "#"}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-indigo-50 hover:text-indigo-600 transition"
                                  >
                                    {subItem.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href ? `${regionPrefix}${item.href}` : "#"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition ${
                    item.isLoginLink
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "text-zinc-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Region Switcher */}
            <div className="pt-4 border-t border-zinc-100">
              <RegionSwitcher currentRegion={mappedRegion} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

