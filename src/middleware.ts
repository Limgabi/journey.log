import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const deviceType = device.type === 'mobile' ? 'mobile' : 'desktop';

  const response = NextResponse.next();

  response.headers.set('device-type', deviceType);

  return response;
}
