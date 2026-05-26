import type { UserStatus } from "./eligibility"
import type { SortKey, ViewMode } from "./store"

export type ProfilePreferences = {
  defaultView: ViewMode
  defaultSort: SortKey
}

export type Profile = {
  id: string
  name: string
  createdAt: string
  lastActive: string
  memberships: UserStatus[]
  favorites: string[]
  preferences: ProfilePreferences
}

const PROFILES_KEY = "statusmatch_profiles"
const ACTIVE_KEY = "statusmatch_active"

function uid(): string {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 10)
}

function isValidProfile(item: unknown): item is Profile {
  if (!item || typeof item !== "object") return false
  const p = item as Record<string, unknown>
  return (
    typeof p.id === "string" &&
    typeof p.name === "string" &&
    Array.isArray(p.memberships) &&
    Array.isArray(p.favorites)
  )
}

export function loadProfiles(): Profile[] {
  try {
    const raw = localStorage.getItem(PROFILES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isValidProfile)
  } catch {
    return []
  }
}

function saveProfiles(profiles: Profile[]): void {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
  } catch (e) {
    if (e instanceof DOMException && e.name === "QuotaExceededError") {
      const trimmed = profiles.slice(-3)
      try {
        localStorage.setItem(PROFILES_KEY, JSON.stringify(trimmed))
      } catch {
        console.error("Failed to save profiles: localStorage full")
      }
    }
  }
}

export function loadActiveProfile(): Profile | null {
  const profiles = loadProfiles()
  if (profiles.length === 0) return null
  const activeId = localStorage.getItem(ACTIVE_KEY)
  const found = activeId ? profiles.find((p) => p.id === activeId) : null
  if (found) return found
  localStorage.setItem(ACTIVE_KEY, profiles[0].id)
  return profiles[0]
}

export function setActiveProfile(id: string): Profile | null {
  const profiles = loadProfiles()
  const profile = profiles.find((p) => p.id === id) ?? null
  if (profile) {
    localStorage.setItem(ACTIVE_KEY, id)
  }
  return profile
}

export function createProfile(name: string): Profile {
  const profiles = loadProfiles()
  const profile: Profile = {
    id: uid(),
    name: name.trim() || "My Profile",
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    memberships: [],
    favorites: [],
    preferences: { defaultView: "grid", defaultSort: "ease" },
  }
  profiles.push(profile)
  saveProfiles(profiles)
  localStorage.setItem(ACTIVE_KEY, profile.id)
  return profile
}

export function updateProfile(profile: Profile): void {
  const profiles = loadProfiles()
  const idx = profiles.findIndex((p) => p.id === profile.id)
  if (idx === -1) return
  profiles[idx] = { ...profile, lastActive: new Date().toISOString() }
  saveProfiles(profiles)
}

export function deleteProfile(id: string): void {
  let profiles = loadProfiles()
  profiles = profiles.filter((p) => p.id !== id)
  saveProfiles(profiles)
  if (localStorage.getItem(ACTIVE_KEY) === id) {
    localStorage.setItem(ACTIVE_KEY, profiles[0]?.id ?? "")
  }
}

export function touchProfile(id: string): void {
  const profiles = loadProfiles()
  const idx = profiles.findIndex((p) => p.id === id)
  if (idx === -1) return
  profiles[idx].lastActive = new Date().toISOString()
  saveProfiles(profiles)
}
