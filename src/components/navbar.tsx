"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Schedule", href: "/schedule" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
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
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-navy p-6">
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
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-4 py-3 text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
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
