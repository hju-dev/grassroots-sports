// Vercel's platform-wide ~4.5MB serverless body limit is the real backstop,
// but that's a wildly generous ceiling for endpoints that only ever expect
// a few form fields — this catches an oversized body (garbage padding, a
// misbehaving client, a deliberate probe) before it's worth parsing at all.
export function isBodyTooLarge(request: Request, maxBytes: number): boolean {
  const contentLength = request.headers.get('content-length');
  if (!contentLength) return false; // no header — let JSON parsing fail naturally rather than guess
  return Number(contentLength) > maxBytes;
}
