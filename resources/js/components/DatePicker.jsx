"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({value, onChange}) {

    return (
        <Popover>
            <PopoverTrigger aschild="true">
                <div className="border rounded-lg p-2 bg-white cursor-pointer flex items-center justify-between">
                    <span>{value ? format(value, "PPP") : "Pick a date"}</span>
                    <ChevronDownIcon />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    defaultMonth={value}
                    disabled={{ after: new Date() }}
                />
            </PopoverContent>
        </Popover>
    );
}
