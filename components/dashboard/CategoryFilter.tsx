"use client"

import { Tabs } from "@/components/ui/Tabs"
import { categories } from "@/lib/data/matches"
import { useFilters, type Category } from "@/lib/store"

export function CategoryFilter() {
  const category = useFilters((s) => s.category)
  const setCategory = useFilters((s) => s.setCategory)
  return <Tabs<Category> tabs={categories} active={category} onChange={setCategory} />
}
