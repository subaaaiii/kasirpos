import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function FlashMessage() {
    const page = usePage();

    useEffect(() => {
        if (page.props.flash?.success) {
            toast.success(page.props.flash.success);
        }

        if (page.props.flash?.error) {
            toast.error(page.props.flash.error);
        }
    }, [page.props]);

    return null;
}