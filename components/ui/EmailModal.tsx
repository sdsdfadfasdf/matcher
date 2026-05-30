"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Copy, Mail, Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { buildGmailUrl } from "@/lib/email"
import type { Match } from "@/lib/data/matches"

export function EmailModal({
  match,
  open,
  onClose,
}: {
  match: Match
  open: boolean
  onClose: () => void
}) {
  const [userName, setUserName] = useState("")
  const [userStatus, setUserStatus] = useState("")
  const [userMemberId, setUserMemberId] = useState("")
  const [copied, setCopied] = useState(false)

  const gmailUrl = buildGmailUrl(match, userName, userStatus, userMemberId)

  const template = match.howToApply.template
    .replace(/\{name\}/g, userName || "[Your Name]")
    .replace(/\{status\}/g, userStatus || "[Your Current Elite Status]")
    .replace(/\{memberId\}/g, userMemberId || "[Your Member Number]")
    .replace(/\{program\}/g, match.program)

  const subject = `Status Match Request - ${match.program}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `To: ${match.howToApply.email || ""}\nSubject: ${subject}\n\n${template}`,
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
            className="relative w-full max-w-lg border border-[#3c3c3c] bg-black p-6 shadow-2xl"
          >
            <button
              aria-label="Close email modal"
              onClick={onClose}
              className="absolute right-4 top-4 p-1 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-1">
              Status Match Email
            </h2>
            <p className="text-sm text-zinc-400 mb-4">{match.program}</p>

            <div className="grid gap-3 mb-4">
              <input
                className="w-full border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#0066b1]/50"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className="w-full border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#0066b1]/50"
                placeholder="Your Current Elite Status (e.g., Hilton Diamond)"
                value={userStatus}
                onChange={(e) => setUserStatus(e.target.value)}
              />
              <input
                className="w-full border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#0066b1]/50"
                placeholder="Your Member Number (optional)"
                value={userMemberId}
                onChange={(e) => setUserMemberId(e.target.value)}
              />
            </div>

            {match.howToApply.email && (
              <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
                <span className="text-zinc-500">To:</span>
                <a
                  href={`mailto:${match.howToApply.email}`}
                  className="hover:opacity-80 transition-opacity"
                >
                  <Badge variant="blue">{match.howToApply.email}</Badge>
                </a>
              </div>
            )}

            <div className="border border-[#3c3c3c] bg-[#1a1a1a] p-3 mb-4 max-h-48 overflow-y-auto">
              <p className="text-xs font-medium text-zinc-500 mb-1">
                Subject: {subject}
              </p>
              <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-sans">
                {template}
              </pre>
            </div>

            <div className="flex gap-3">
              <Button
                variant="m-blue"
                size="md"
                className="flex-1"
                onClick={() => window.open(gmailUrl, "_blank")}
              >
                <Mail className="h-4 w-4" />
                Open in Gmail
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
