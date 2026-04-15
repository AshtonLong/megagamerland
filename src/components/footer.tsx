import Link from "next/link";
import { Wrench, MapPin, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-earth-950 text-earth-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rust-600 text-white">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Mega<span className="text-rust-400">Gamer</span>Land
              </span>
            </Link>
            <p className="text-earth-400 text-sm leading-relaxed">
              North Bay Ontario&apos;s premier rusty pipe farm. Cultivating
              corrosion with care since the dawn of oxidation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-earth-400 hover:text-rust-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-earth-400 hover:text-rust-400 transition-colors text-sm"
                >
                  Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-earth-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-rust-500" />
                663 McIntyre St W, North Bay, Ontario
              </li>
              <li className="flex items-start gap-2.5 text-sm text-earth-400">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-rust-500" />
                greg@megagamerland.ca
              </li>
              <li className="flex items-start gap-2.5 text-sm text-earth-400">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-rust-500" />
                705-499-5396
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Farm Hours
            </h3>
            <ul className="space-y-2 text-sm text-earth-400">
              <li className="flex justify-between">
                <span>Mon – Fri</span>
                <span>8am – 6pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9am – 4pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-earth-800" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-earth-500">
          <p>&copy; {new Date().getFullYear()} MegaGamerLand. All rights reserved.</p>
          <p>Where rust is a feature, not a bug.</p>
        </div>
      </div>
    </footer>
  );
}
