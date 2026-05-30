"use client"

import { useState, useRef, useEffect } from "react"
import { User, Plus, Trash2, Check } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { useFilters } from "@/lib/store"
import { loadProfiles, setActiveProfile, deleteProfile } from "@/lib/profiles"
import { CreateProfileModal } from "@/components/dashboard/CreateProfileModal"

export function ProfileSwitcher() {
  const [open, setOpen] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const activeProfile = useFilters((s) => s.activeProfile)
  const setActiveProfileFn = useFilters((s) => s.setActiveProfile)
  const syncFromProfile = useFilters((s) => s.syncFromProfile)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setFocusedIndex(-1)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (!open) return
      if (e.key === "Escape") {
        setOpen(false)
        setFocusedIndex(-1)
        return
      }
      const profiles = loadProfiles()
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setFocusedIndex((i) => Math.min(i + 1, profiles.length - 1))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setFocusedIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === "Enter" && focusedIndex >= 0 && focusedIndex < profiles.length) {
        handleSwitch(profiles[focusedIndex].id)
      }
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [open, focusedIndex])

  const profiles = loadProfiles()

  function handleSwitch(id: string) {
    const p = setActiveProfile(id)
    if (p) {
      setActiveProfileFn(p)
    }
    setOpen(false)
  }

  function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete profile "${name}"? This cannot be undone.`)) return
    deleteProfile(id)
    const remaining = loadProfiles()
    if (remaining.length > 0) {
      const p = setActiveProfile(remaining[0].id)
      if (p) setActiveProfileFn(p)
    } else {
      setActiveProfileFn(null)
    }
  }

  function handleCreated() {
    setShowCreate(false)
    const profiles = loadProfiles()
    const activeId = typeof window !== "undefined" ? localStorage.getItem("statusmatch_active") : null
    const p = activeId ? profiles.find((x) => x.id === activeId) : profiles[0]
    if (p) {
      setActiveProfileFn(p)
    }
  }

  return (
    <>
      <CreateProfileModal open={showCreate} onClose={() => setShowCreate(false)} onCreated={handleCreated} />

      <div className="relative" ref={containerRef}>
        <button
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors cursor-pointer"
        >
          <User className="h-4 w-4" />
          {activeProfile ? activeProfile.name : "No Profile"}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute right-0 top-full mt-1 w-56 border border-[#3c3c3c] bg-[#1a1a1a] shadow-xl z-50 py-1"
            >
              <div className="px-3 py-2 border-b border-zinc-800">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Switch Profile
                </p>
              </div>

              {profiles.length === 0 ? (
                <div className="px-3 py-4 text-center text-xs text-zinc-500">
                  No profiles yet
                </div>
              ) : (
                profiles.map((p, i) => (
                  <div
                    key={p.id}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2",
                      focusedIndex === i && "bg-zinc-800",
                    )}
                  >
                    <button
                      onClick={() => handleSwitch(p.id)}
                      className="flex-1 text-left text-sm text-zinc-300 hover:text-zinc-100 transition-colors cursor-pointer flex items-center gap-2"
                    >
                      {p.id === activeProfile?.id && (
                        <Check className="h-3 w-3 text-emerald-400" />
                      )}
                      <span className={p.id === activeProfile?.id ? "text-zinc-100" : ""}>
                        {p.name}
                      </span>
                    </button>
                    <button
                      aria-label={`Delete ${p.name} profile`}
                      onClick={() => handleDelete(p.id, p.name)}
                      className="rounded p-0.5 text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))
              )}

              <div className="border-t border-zinc-800 mt-1 pt-1">
                <button
                  onClick={() => {
                    setOpen(false)
                    setShowCreate(true)
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  Create New Profile
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
