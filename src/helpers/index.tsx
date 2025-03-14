import {PostInlineCTA} from "@/components/blocks/postInlineCTA";
import React from "react";

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatText = (text: string) => {
    const shortcodeRegex = /\[cs_gb name=&#8221;([^&#]+)&#8221;\]/g;
    const parts: (React.ReactNode | string)[] = [];
    let lastIndex = 0;

    text.replace(shortcodeRegex, (match, name, offset) => {
        const beforeText = text.slice(lastIndex, offset);
        if (beforeText) {
            parts.push(<span key={`text-${offset}`} dangerouslySetInnerHTML={{ __html: beforeText }} />);
        }

        parts.push(<PostInlineCTA key={offset} shortcode={name} />);
        lastIndex = offset + match.length;
        return match;
    });

    const remainingText = text.slice(lastIndex);
    if (remainingText) {
        parts.push(<span key="remaining" dangerouslySetInnerHTML={{ __html: remainingText }} />);
    }

    return parts;
};
