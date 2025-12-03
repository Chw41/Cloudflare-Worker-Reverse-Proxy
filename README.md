# Cloudflare-Worker-Reverse-Proxy
This Worker proxies incoming requests to a Cloudflare Tunnel origin by rewriting the request URL and forwarding the original method, headers, and body. It enables you to expose remote services through a stable Cloudflare Worker endpoint while keeping the origin hidden and protected behind a tunnel.

## Features
- Acts as a lightweight reverse proxy
- Forwards all HTTP methods and bodies
- Rewrites hostname, protocol, and port to the Cloudflare Tunnel endpoint
- Preserves incoming headers, with rewritten Host to match the tunnel origin
- Useful for scenarios where you want a public Worker URL that routes traffic to a secured private service

## How It Works
### 1. Request interception

All requests to your Worker are captured via the `fetch` handler.

### 2. URL rewriting

The Worker constructs a new URL by replacing:

- `hostname` with your Cloudflare Tunnel endpoint
- `protocol` with `https`
- `port` with `443`

This effectively instructs the Worker to forward traffic to the Tunnel’s public edge hostname.

### 3. Header normalization

The Worker clones the original request headers and explicitly sets:

- Host: `<your-tunnel-host>`

This ensures the tunneled service receives the correct virtual host header as if the request was sent directly to the tunnel.

### 4. Transparent forwarding
The Worker calls `fetch()` with:

- Original HTTP method
- Rewritten URL
- Cloned headers
- Original request body

The response from the tunneled service is returned directly to the client without modification.


