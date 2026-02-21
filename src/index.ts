import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// Sabhi requests ke liye CORS allow karein
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
    return c.text('Error: Please provide url parameter. Example: ?url=https://google.com', 400);
  }

  try {
    const url = new URL(targetUrl);
    
    const targetRequest = new Request(url, {
      method: c.req.method,
      headers: c.req.header(),
      body: ['GET', 'HEAD'].includes(c.req.method) ? null : await c.req.raw.blob(),
    });

    const response = await fetch(targetRequest);

    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Access-Control-Allow-Methods', '*');
    newHeaders.set('Access-Control-Allow-Headers', '*');

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  } catch (err: any) {
    return c.text(`Proxy Error: ${err.message}`, 500);
  }
});

// Port setting Render ke liye
const port = Number(process.env.PORT) || 3000;
console.log(`CORS Proxy is live on port ${port}`);

serve({
  fetch: app.fetch,
  port
});

export default app;
