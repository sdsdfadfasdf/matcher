import type { Match } from "./data/matches"

export function buildEmailTemplate(match: Match, userName = "", userStatus = "", userMemberId = "") {
  const name = userName || "[Your Name]"
  const status = userStatus || "[Your Current Elite Status]"
  const memberId = userMemberId || "[Your Member Number]"

  const subject = `Status Match Request - ${match.program}`
  const body = match.howToApply.template
    .replace(/\{name\}/g, name)
    .replace(/\{status\}/g, status)
    .replace(/\{memberId\}/g, memberId)
    .replace(/\{program\}/g, match.program)

  return { subject, body, to: match.howToApply.email || "" }
}

export function buildGmailUrl(match: Match, userName = "", userStatus = "", userMemberId = "") {
  const { subject, body, to } = buildEmailTemplate(match, userName, userStatus, userMemberId)
  const params = new URLSearchParams()
  params.set("view", "cm")
  params.set("fs", "1")
  if (to) params.set("to", to)
  params.set("su", subject)
  params.set("body", body)
  return `https://mail.google.com/mail/?${params.toString()}`
}

export function buildMailtoUrl(match: Match, userName = "", userStatus = "", userMemberId = "") {
  const { subject, body, to } = buildEmailTemplate(match, userName, userStatus, userMemberId)
  const params = new URLSearchParams()
  if (to) params.set("to", to)
  params.set("subject", subject)
  params.set("body", body)
  return `mailto:${to}?${params.toString()}`
}
