import "server-only";

import sanitizeHtml from "sanitize-html";

const youtubeHosts = ["www.youtube.com", "www.youtube-nocookie.com"];

export function sanitizeBlogHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "h1", "h2", "h3", "strong", "em", "b", "i", "s", "u",
      "code", "pre", "blockquote", "ul", "ol", "li", "hr", "a", "img",
      "div", "iframe", "table", "tbody", "thead", "tr", "td", "th",
    ],
    allowedAttributes: {
      p: ["style"],
      h1: ["style"],
      h2: ["style"],
      h3: ["style"],
      a: ["href"],
      img: ["src", "alt", "title"],
      ol: ["start"],
      td: ["colspan", "rowspan", "colwidth"],
      th: ["colspan", "rowspan", "colwidth"],
      div: ["data-youtube-video"],
      iframe: ["src", "title", "allowfullscreen", "loading"],
    },
    allowedStyles: {
      "*": { "text-align": [/^(left|center|right|justify)$/] },
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https"], iframe: ["https"] },
    allowProtocolRelative: false,
    allowedIframeHostnames: youtubeHosts,
    allowIframeRelativeUrls: false,
    transformTags: {
      iframe: (_tag, { src }) => {
        const attribs: Record<string, string> = {};
        const match = /^https:\/\/(www\.youtube(?:-nocookie)?\.com)\/embed\/([\w-]{11})(?:\?[^#]*)?$/.exec(src || "");
        if (match) {
          const start = new URL(src).searchParams.get("start");
          const videoUrl = "https://" + match[1] + "/embed/" + match[2] + (start && /^\d{1,9}$/.test(start) ? "?start=" + start : "");
          Object.assign(attribs, { src: videoUrl, title: "YouTube video", loading: "lazy", allowfullscreen: "" });
        }
        return { tagName: "iframe", attribs };
      },
    },
    exclusiveFilter: ({ tag, attribs }) =>
      (tag === "img" || tag === "iframe") && !attribs.src,
  });
}

export function blogHtmlText(html: string) {
  // Decode the sanitized text for React and metadata, which escape it on output.
  return sanitizeHtml(html.replace(/<\/(?:p|div|h[1-3]|li|td)>|<br\s*\/?\s*>/gi, "$& "), {
    allowedTags: [],
    allowedAttributes: {},
  }).replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (entity) => ({
    "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " ",
  })[entity] ?? entity).replace(/\s+/g, " ").trim();
}
