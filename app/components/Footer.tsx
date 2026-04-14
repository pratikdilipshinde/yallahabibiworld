"use client";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      
      <div className="mx-auto max-w-7xl px-6 py-16">
        
        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold text-white">
              YourBrand
            </h2>
            <p className="mt-4 text-sm leading-6 text-neutral-400">
              Building premium digital experiences with a focus on performance,
              design, and simplicity.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              <FaInstagram className="cursor-pointer hover:text-white" />
              <SiThreads className="cursor-pointer hover:text-white" />
              <FaFacebookF className="cursor-pointer hover:text-white" />
              
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-neutral-400">
              Subscribe to get updates and early access.
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-neutral-700 p-2">
              <MdOutlineMail size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-500"
              />
            </div>

            <button className="mt-3 w-full rounded-xl bg-white py-2 text-sm font-medium text-black hover:bg-neutral-200">
              Subscribe
            </button>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-neutral-800" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <p className="text-neutral-500">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}