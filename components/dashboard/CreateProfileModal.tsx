"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, User } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { createProfile } from "@/lib/profiles"

export function CreateProfileModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean
  onClose: () => void
  onCreated: () => void
}) {
  const [name, setName] = useState("")

  function handleCreate() {
    const trimmed = name.trim()
    if (!trimmed) return
    createProfile(trimmed)
    setName("")
    onCreated()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleCreate()
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-sm border border-[#3c3c3c] bg-black p-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-zinc-800 p-2">
                <User className="h-5 w-5 text-zinc-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">Create Profile</h2>
                <p className="text-xs text-zinc-500">Save your memberships and favorites</p>
              </div>
            </div>

            <input
              className="w-full border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#0066b1]/50 mb-4"
              placeholder="Profile name (e.g., John's Travel)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />

            <div className="flex gap-3">
              <Button variant="secondary" size="md" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleCreate}
                className="flex-1"
                disabled={!name.trim()}
              >
                Create
              </Button>
            </div>

            <p className="mt-3 text-xs text-zinc-600 text-center">
              Stored locally in your browser. No sign-up required.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
