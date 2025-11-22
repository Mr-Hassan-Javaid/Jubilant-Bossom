import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - strict allowlist
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL || '',
  process.env.PRODUCTION_URL || ''
].filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests) only in development
    if (!origin && process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Helper function to validate URLs
const isValidUrl = (urlString: string): boolean => {
  try {
    const url = new URL(urlString);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return false;
    }
    // Block localhost and private IPs for security (unless explicitly allowed)
    const hostname = url.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname.startsWith('172.')) {
      // Allow localhost only in development
      if (process.env.NODE_ENV === 'development' && (hostname === 'localhost' || hostname === '127.0.0.1')) {
        return true;
      }
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

// Helper function to extract text content from HTML
const extractTextFromHTML = (html: string): string => {
  // Remove script and style elements
  let cleaned = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Remove HTML tags but keep text content
  cleaned = cleaned.replace(/<[^>]+>/g, ' ');
  
  // Decode HTML entities
  cleaned = cleaned
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // Clean up whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned.substring(0, 5000); // Limit to 5000 chars
};

// Scrape endpoint
app.get('/api/scrape', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ 
        error: 'Missing or invalid url parameter' 
      });
    }
    
    if (!isValidUrl(url)) {
      return res.status(400).json({ 
        error: 'Invalid URL or protocol not allowed' 
      });
    }
    
    // Fetch the HTML content
    const fetchResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StudioAetherBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      // Timeout after 10 seconds
      signal: AbortSignal.timeout(10000)
    });
    
    if (!fetchResponse.ok) {
      return res.status(fetchResponse.status).json({ 
        error: `Failed to fetch URL: ${fetchResponse.statusText}` 
      });
    }
    
    const html = await fetchResponse.text();
    const textContent = extractTextFromHTML(html);
    
    if (!textContent || textContent.length < 10) {
      return res.status(400).json({ 
        error: 'Could not extract meaningful content from URL' 
      });
    }
    
    res.json({ 
      content: textContent,
      url: url,
      length: textContent.length
    });
    
  } catch (error) {
    console.error('Scraping error:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return res.status(408).json({ error: 'Request timeout' });
      }
      return res.status(500).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});

export default app;

