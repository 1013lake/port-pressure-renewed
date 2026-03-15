"use client";

import { useState } from "react";
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Schedule", href: "/schedule" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            alt="Port Pressure"
            src="/pressurelogow.png"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-lg font-semibold text-white">
            Port Pressure
          </span>
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          <Link
            href="/"
            className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
          >
            Home
          </Link>

          {/* Services dropdown */}
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-1 text-sm font-medium text-slate-200 hover:text-white transition-colors outline-none">
              Services
              <ChevronDownIcon className="h-4 w-4 ui-open:rotate-180 transition-transform" />
            </PopoverButton>

            <PopoverPanel className="absolute left-1/2 -translate-x-1/2 mt-4 w-72 rounded-xl bg-slate-800 border border-slate-600 shadow-xl ring-1 ring-black/10 overflow-hidden z-50">
              <div className="p-2">
                <Link
                  href="/services"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-cyan-400 hover:bg-slate-700 transition-colors"
                >
                  All Services
                </Link>
                <div className="my-1 border-t border-slate-700" />
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link
            href="/schedule"
            className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
          >
            Schedule
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            Get a Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden rounded-lg p-2 text-slate-200 hover:bg-white/10"
          aria-label="Open menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-navy p-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                alt="Port Pressure"
                src="/pressurelogow.png"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-lg font-semibold text-white">
                Port Pressure
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 text-slate-200 hover:bg-white/10"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-8 space-y-1">
            <Link
              href="/"
              className="block rounded-lg px-4 py-3 text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile services accordion */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white"
              >
                Services
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {servicesOpen && (
                <div className="ml-4 space-y-1">
                  <Link
                    href="/services"
                    className="block rounded-lg px-4 py-2 text-sm font-semibold text-cyan-400 hover:bg-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Services
                  </Link>
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block rounded-lg px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/schedule"
              className="block rounded-lg px-4 py-3 text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Schedule
            </Link>
            <Link
              href="/contact"
              className="block rounded-lg px-4 py-3 text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="mt-4 block rounded-lg bg-accent px-4 py-3 text-center text-base font-semibold text-white hover:bg-accent-hover"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
