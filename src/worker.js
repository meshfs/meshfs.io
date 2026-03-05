import {
  renderFaviconSvg,
  renderHomePage,
  renderIndexMarkdown,
  renderOgSvg,
  renderRobots,
  renderSitemap,
  stylesCss
} from "./site.js";

const BASE_HEADERS = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-frame-options": "DENY"
};

const HTML_SECURITY_HEADERS = {
  "content-security-policy":
    "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self' 'unsafe-inline'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'"
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    if (host === "www.meshfs.io") {
      const redirectUrl = new URL(request.url);
      redirectUrl.protocol = "https:";
      redirectUrl.hostname = "meshfs.io";
      return Response.redirect(redirectUrl.toString(), 301);
    }

    const origin = `${url.protocol}//${url.host}`;
    const method = request.method.toUpperCase();
    const isHead = method === "HEAD";

    if (method !== "GET" && method !== "HEAD") {
      return createResponse(
        "Method Not Allowed",
        {
          status: 405,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            allow: "GET, HEAD"
          }
        },
        isHead
      );
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return createResponse(
        renderHomePage(origin),
        {
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=300",
            ...HTML_SECURITY_HEADERS
          }
        },
        isHead
      );
    }

    if (url.pathname === "/styles.css") {
      return createResponse(
        stylesCss,
        {
          headers: {
            "content-type": "text/css; charset=utf-8",
            "cache-control": "public, max-age=86400"
          }
        },
        isHead
      );
    }

    if (url.pathname === "/robots.txt") {
      return createResponse(
        renderRobots(origin),
        {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600"
          }
        },
        isHead
      );
    }

    if (url.pathname === "/sitemap.xml") {
      return createResponse(
        renderSitemap(origin),
        {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600"
          }
        },
        isHead
      );
    }

    if (url.pathname === "/index.md") {
      return createResponse(
        renderIndexMarkdown(origin),
        {
          headers: {
            "content-type": "text/markdown; charset=utf-8",
            "cache-control": "public, max-age=3600"
          }
        },
        isHead
      );
    }

    if (url.pathname === "/og.svg") {
      return createResponse(
        renderOgSvg(),
        {
          headers: {
            "content-type": "image/svg+xml; charset=utf-8",
            "cache-control": "public, max-age=604800"
          }
        },
        isHead
      );
    }

    if (url.pathname === "/favicon.svg") {
      return createResponse(
        renderFaviconSvg(),
        {
          headers: {
            "content-type": "image/svg+xml; charset=utf-8",
            "cache-control": "public, max-age=604800"
          }
        },
        isHead
      );
    }

    if (url.pathname === "/healthz") {
      return createResponse(
        "ok",
        {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "no-store"
          }
        },
        isHead
      );
    }

    return createResponse(
      "Not Found",
      {
        status: 404,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "no-store"
        }
      },
      isHead
    );
  }
};

function createResponse(body, init, isHead) {
  const headers = new Headers(BASE_HEADERS);
  const customHeaders = init?.headers ?? {};

  for (const [key, value] of Object.entries(customHeaders)) {
    headers.set(key, value);
  }

  const status = init?.status ?? 200;
  return new Response(isHead ? null : body, { status, headers });
}
