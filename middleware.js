import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` insides
export async function middleware(request) {
    if (request.method === 'OPTIONS') {
             return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}