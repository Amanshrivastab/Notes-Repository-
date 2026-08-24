import { useState } from "react";
import fetchNoteFile from "../utils/fetchNoteFile";

function useNoteFile(id, fileName = "note.pdf") {

    const [viewLoading, setViewLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);

    const [error, setError] = useState("");


    // -------------------------
    // View PDF
    // -------------------------

    const handleView = async () => {

        // Prevent multiple clicks
        if (viewLoading || downloadLoading) {
            return;
        }

        setViewLoading(true);
        setError("");

        // Open tab immediately to avoid popup blocker
        const newTab = window.open("", "_blank");

        if (!newTab) {
            setError(
                "Unable to open PDF. Please allow popups for this website."
            );

            setViewLoading(false);

            return;
        }

        try {

            const blob = await fetchNoteFile(id);

            const fileUrl = URL.createObjectURL(blob);

            newTab.location.href = fileUrl;

            // Release the object URL later
            setTimeout(() => {
                URL.revokeObjectURL(fileUrl);
            }, 60000);

        } catch (error) {

            console.error("VIEW FILE ERROR:", error);

            newTab.close();

            setError(
                error.message || "Failed to view the PDF"
            );

        } finally {

            setViewLoading(false);

        }
    };


    // -------------------------
    // Download PDF
    // -------------------------

    const handleDownload = async () => {

        // Prevent multiple clicks
        if (viewLoading || downloadLoading) {
            return;
        }

        setDownloadLoading(true);
        setError("");

        try {

            const blob = await fetchNoteFile(id);

            const fileUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = fileUrl;

            link.download = fileName || "note.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            // Give browser time to start download
            setTimeout(() => {
                URL.revokeObjectURL(fileUrl);
            }, 1000);

        } catch (error) {

            console.error("DOWNLOAD FILE ERROR:", error);

            setError(
                error.message || "Failed to download the PDF"
            );

        } finally {

            setDownloadLoading(false);

        }
    };


    return {
        handleView,
        handleDownload,

        viewLoading,
        downloadLoading,

        error
    };
}

export default useNoteFile;