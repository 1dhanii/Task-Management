"use client"

import { useEffect } from "react"

interface HotkeyConfig {
  key: string
  ctrlKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
  callback: () => void
  description: string
}

export function useHotkeys(hotkeys: HotkeyConfig[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger hotkeys when typing in input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }

      for (const hotkey of hotkeys) {
        if (
          event.key === hotkey.key &&
          (hotkey.ctrlKey === undefined || event.ctrlKey === hotkey.ctrlKey) &&
          (hotkey.altKey === undefined || event.altKey === hotkey.altKey) &&
          (hotkey.shiftKey === undefined || event.shiftKey === hotkey.shiftKey)
        ) {
          event.preventDefault()
          hotkey.callback()
          return
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [hotkeys])

  return {
    getHotkeysList: () =>
      hotkeys.map((h) => ({
        key: h.key,
        ctrlKey: h.ctrlKey,
        altKey: h.altKey,
        shiftKey: h.shiftKey,
        description: h.description,
      })),
  }
}
