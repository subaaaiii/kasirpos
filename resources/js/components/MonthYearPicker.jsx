import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

export function MonthYearPicker({ month, setMonth, year, setYear, years }) {
    const months = [
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];

    const selectedMonth = months.find((m) => m.value === String(month));
    return (
        <>
            <Select value={String(month)} onValueChange={setMonth}>
                <SelectTrigger className="w-40">
                    {selectedMonth?.label}
                </SelectTrigger>

                <SelectContent>
                    {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                            {month.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={String(year)} onValueChange={setYear}>
                <SelectTrigger className="w-28">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    {years.map((y) => (
                        <SelectItem key={y} value={String(y)}>
                            {y}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
}
