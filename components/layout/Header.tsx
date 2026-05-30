"use client"

import { Plane, Hotel, Car, RefreshCw } from "lucide-react"
import { oldestFetchDate } from "@/lib/data/sources"
import { ProfileSwitcher } from "@/components/layout/ProfileSwitcher"

export function Header() {
  const lastUpdated = oldestFetchDate()

  return (
    <header className="sticky top-0 z-40 bg-black">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1">
            <div className="p-1.5 ring-2 ring-black bg-[#0066b1]/20">
              <Plane className="h-3.5 w-3.5 text-[#0066b1]" />
            </div>
            <div className="p-1.5 ring-2 ring-black bg-[#1c69d4]/20">
              <Hotel className="h-3.5 w-3.5 text-[#1c69d4]" />
            </div>
            <div className="p-1.5 ring-2 ring-black bg-[#e22718]/20">
              <Car className="h-3.5 w-3.5 text-[#e22718]" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white uppercase tracking-widest">StatusMatch</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-light">
              curated status match opportunities
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5 text-zinc-600">
              <RefreshCw className="h-3 w-3" />
              Updated {lastUpdated}
            </span>
            <span>
              Data from{" "}
              <a
                href="https://statusmatcher.com"
                target="_blank"
                rel="noopener"
                className="text-zinc-400 hover:text-zinc-200 underline transition-colors"
              >
                statusmatcher.com
              </a>
              {" "}+ 5 sources
            </span>
          </div>
          <span className="sm:hidden text-xs text-zinc-600">
            Updated {lastUpdated}
          </span>
          <ProfileSwitcher />
        </div>
      </div>
      {/* M tricolor accent stripe */}
      <div className="h-0.5 w-full flex">
        <div className="flex-1 bg-[#0066b1]" />
        <div className="flex-1 bg-[#1c69d4]" />
        <div className="flex-1 bg-[#e22718]" />
      </div>
    </header>
  )
}
