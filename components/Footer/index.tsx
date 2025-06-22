"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-50 to-white dark:from-zinc-900 dark:to-black px-4 md:px-20 border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl">
        {/* Footer Top */}
        <div className="py-16">
          <div className="flex flex-wrap justify-between gap-12">
            {/* Logo dan Deskripsi */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 lg:w-1/4"
            >
              <a href="/" className="flex items-center space-x-3">
                <Image
                  width={60}
                  height={60}
                  src="/images/logo/logo.png"
                  alt="Logo"
                />
                <span className="text-2xl font-bold text-indigo-700 dark:text-white">
                  INDEKOST
                </span>
              </a>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Situs yang menyediakan kost sesuai kebutuhanmu.
              </p>
              <p className="mt-6 uppercase text-sm text-gray-500 tracking-wider">
                Kontak
              </p>
              <a
                href="mailto:indekost@gmail.com"
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                indekost@gmail.com
              </a>
            </motion.div>

            {/* Navigasi & Sosial Media */}
            <div className="flex flex-wrap gap-12 w-full md:w-1/2 lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="mb-4 font-semibold text-gray-700 dark:text-white text-lg">
                  Layanan
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <a href="#" className="hover:text-indigo-500 transition">
                      Rekomendasi Kost
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-500 transition">
                      Sistem Pencarian
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-500 transition">
                      Fitur Dashboard
                    </a>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="mb-4 font-semibold text-gray-700 dark:text-white text-lg">
                  Sosial Media
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <a href="#" className="hover:text-indigo-500 transition">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-500 transition">
                      Tiktok
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-500 transition">
                      Instagram
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            &copy; {new Date().getFullYear()} Tania Resubun. All rights
            reserved.
          </motion.p>
          <motion.div
            className="mt-3 md:mt-0 flex space-x-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="#"
              className="hover:text-indigo-600 transition"
              aria-label="Facebook"
            >
              <svg
                fill="currentColor"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22,12A10,10 0 1,0 12,22V14.5H10V12H12V10C12,8.62 13,7.5 14.75,7.5C15.58,7.5 16.25,7.58 16.44,7.62V9.62H15.41C14.5,9.62 14.29,10.08 14.29,10.75V12H16.36L16,14.5H14.29V22A10,10 0 0,0 22,12Z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition"
              aria-label="Instagram"
            >
              <svg
                fill="currentColor"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7,2C4.24,2 2,4.24 2,7V17C2,19.76 4.24,22 7,22H17C19.76,22 22,19.76 22,17V7C22,4.24 19.76,2 17,2H7M17,0C20.87,0 24,3.13 24,7V17C24,20.87 20.87,24 17,24H7C3.13,24 0,20.87 0,17V7C0,3.13 3.13,0 7,0H17M12,7.5A4.5,4.5 0 1,1 7.5,12A4.5,4.5 0 0,1 12,7.5M18,4.5A1.5,1.5 0 1,1 16.5,6A1.5,1.5 0 0,1 18,4.5Z" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
