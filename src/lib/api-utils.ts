export function jsonResponse(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export function errorResponse(detail: string, status: number) {
  return Response.json({ detail }, { status });
}

export function noContentResponse() {
  return new Response(null, { status: 204 });
}
