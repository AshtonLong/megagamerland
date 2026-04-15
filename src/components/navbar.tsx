"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Wrench } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rust-600 text-white transition-colors group-hover:bg-rust-700">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Mega<span className="text-rust-600">Gamer</span>Land
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            Home
          </Button>
          <Button
            render={<Link href="/store" />}
            nativeButton={false}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            Store
          </Button>
          <Button
            render={<Link href="/store" />}
            nativeButton={false}
            className="ml-3 bg-rust-600 hover:bg-rust-700 text-white"
          >
            Shop Now
          </Button>
        </nav>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden"
            render={
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            }
          />
          <SheetContent side="right" className="w-72">
            <nav className="flex flex-col gap-4 mt-8">
              <Button
                render={<Link href="/" />}
                nativeButton={false}
                onClick={() => setOpen(false)}
                variant="ghost"
                className="w-full justify-start text-lg"
              >
                Home
              </Button>
              <Button
                render={<Link href="/store" />}
                nativeButton={false}
                onClick={() => setOpen(false)}
                variant="ghost"
                className="w-full justify-start text-lg"
              >
                Store
              </Button>
              <Button
                render={<Link href="/store" />}
                nativeButton={false}
                onClick={() => setOpen(false)}
                className="w-full bg-rust-600 hover:bg-rust-700 text-white"
              >
                Shop Now
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
