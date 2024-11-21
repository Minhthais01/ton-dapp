import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Đọc tệp db.json
    const filePath = path.join(process.cwd(), 'db.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data).products;

    return new Response(JSON.stringify(products), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Error reading db.json', { status: 500 });
  }
}
