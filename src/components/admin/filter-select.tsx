"use client";

import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  options: FilterOption[];
  onFilter: (value: string) => void;
  className?: string;
}

export function FilterSelect({ label, options, onFilter, className = "" }: FilterSelectProps) {
  const [value, setValue] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onFilter(newValue);
  };
  
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Label className="flex items-center gap-1 text-sm font-medium">
        <Filter className="h-3.5 w-3.5" />
        {label}
      </Label>
      <Select
        value={value}
        onChange={handleChange}
        className="w-full"
      >
        <option value="">Todos</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
} 