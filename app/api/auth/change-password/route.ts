import { NextRequest, NextResponse } from 'next/server';

// Mock database
const users: Record<string, any> = {
  'test@example.com': {
    email: 'test@example.com',
    password: '3010',
    needsPasswordChange: true,
  },
};

export async function POST(request: NextRequest) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return NextResponse.json({ error: 'Email and new password required' }, { status: 400 });
    }

    // Find user
    const user = users[email];
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update password
    user.password = newPassword;
    user.needsPasswordChange = false;

    return NextResponse.json({
      message: 'Password changed successfully',
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
