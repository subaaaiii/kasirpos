import { router } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function CustomPagination({ links }) {
    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, index) => {
                    if (link.label.includes("Previous")) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious
                                    href={link.url || "#"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (link.url) router.visit(link.url);
                                    }}
                                />
                            </PaginationItem>
                        );
                    }

                    if (link.label.includes("Next")) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext
                                    href={link.url || "#"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (link.url) router.visit(link.url);
                                    }}
                                />
                            </PaginationItem>
                        );
                    }

                    if (link.label === "...") {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href={link.url || "#"}
                                isActive={link.active}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (link.url) router.visit(link.url);
                                }}
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}