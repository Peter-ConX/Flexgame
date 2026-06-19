import { NextRequest, NextResponse } from 'next/server';

// Mock database - shared with signup
const users: Record<string, any> = {
  'test@example.com': {
    email: 'test@example.com',
    password: '3010',
    needsPasswordChange: true,
  },
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Find user
    const user = users[email];
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate simple token (in production, use JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      token,
      needsPasswordChange: user.needsPasswordChange,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
