export async function handler(event, context) {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://stickypopcorn1.netlify.app", // Frontend domain
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
      "Content-Security-Policy":
        "default-src 'self' https://stickypopcorn1.netlify.app; connect-src 'self' https://stickypopcorn1.netlify.app https://stickypopcorn.netlify.app; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    },
    body: JSON.stringify({ message: "Netlify Functions are working!" }),
  };
}
