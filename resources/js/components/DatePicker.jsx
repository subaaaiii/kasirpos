"use client"

import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker() {
  const [date, setDate] = React.useState(new Date())

  return (
    <Popover>
      <PopoverTrigger asChild>
  <div className="border rounded-lg p-2 bg-white cursor-pointer flex items-center justify-between">
    <span>{date ? format(date, "PPP") : "Pick a date"}</span>
    <ChevronDownIcon />
  </div>
</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  )
}
