import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// Global CORS Middleware - Har request par apply hoga
app.use(
  '*',
  cors({
    origin: '*',
    allowHeaders: ['*'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    maxAge: 600,
  })
);

app.all('*', async (c) => {
  const targetUrl = c.req.query('url');

  if (!targetUrl) {
    return c.text('Error: Missing target URL parameter. Use format: ?url=https://example.com', 400);
  }

  try {
    const url = new URL(targetUrl);
    
    // Original request ka data target URL par forward karna
    const targetRequest = new Request(url, {
      method: c.req.method,
      headers: c.req.header(), // Client ke bheje gaye headers pass karte hain
      body: ['GET', 'HEAD'].includes(c.req.method) ? null : await c.req.raw.blob(),
    });

    const response = await fetch(targetRequest);

    // Target server se aaye response headers ko copy karna aur CORS set karna
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Access-Control-Allow-Methods', '*');
    newHeaders.set('Access-Control-Allow-Headers', '*');

    // Final response client ko return karna
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  } catch (err: any) {
    return c.text(`Proxy Error: ${err.message}`, 500);
  }
});

export default app;
