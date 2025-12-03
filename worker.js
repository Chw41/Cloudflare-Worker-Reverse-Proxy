const TUNNEL_HOST = "<your-tunnel-host>";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    url.hostname = TUNNEL_HOST;
    url.protocol = "https:"; 
    url.port = "443";

    const headers = new Headers(request.headers);
    headers.set("Host", TUNNEL_HOST);

    return fetch(url.toString(), {
      method: request.method,
      headers,
      body: request.body,
    });
  }
}
