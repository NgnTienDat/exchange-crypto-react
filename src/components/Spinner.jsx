import React from "react";

export function Spinner({
    size = 24,            // px
    stroke = 3,           // độ dày nét
    className = "",
    label = "Loading...", // text trợ năng
}) {
    const ring = Math.max(0, stroke);
    return (
        <div className={`inline-flex items-center gap-2 ${className}`} role="status" aria-live="polite">
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                className="animate-spin"
                aria-hidden="true"
            >
                {/* vòng mờ phía sau */}
                <circle
                    cx="12" cy="12" r="9"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.2"
                    strokeWidth={ring}
                />
                {/* cung quay */}
                <path
                    d="M21 12a9 9 0 0 0-9-9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={ring}
                    strokeLinecap="round"
                />
            </svg>
            <span className="sr-only">{label}</span>
        </div>
    );
}