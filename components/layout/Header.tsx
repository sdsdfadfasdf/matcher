"use client"

import { Plane, Hotel, Car, RefreshCw } from "lucide-react"
import { oldestFetchDate } from "@/lib/data/sources"
import { ProfileSwitcher } from "@/components/layout/ProfileSwitcher"

export function Header() {
  const lastUpdated = oldestFetchDate()

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1">
            <div className="rounded-full bg-amber-500/20 p-1.5 ring-2 ring-zinc-950">
              <Plane className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div className="rounded-full bg-emerald-500/20 p-1.5 ring-2 ring-zinc-950">
              <Hotel className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="rounded-full bg-blue-500/20 p-1.5 ring-2 ring-zinc-950">
              <Car className="h-3.5 w-3.5 text-blue-400" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-zinc-100">StatusMatch</h1>
            <p className="text-xs text-zinc-500">curated status match opportunities</p>
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
    </header>
  )
}
