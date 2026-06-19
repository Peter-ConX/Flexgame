import { NextRequest, NextResponse } from 'next/server';

// Mock database - In production, use a real database
const users: Record<string, any> = {};

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Check if user already exists
    if (users[email]) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create user with default password
    const defaultPassword = '3010';
    users[email] = {
      email,
      password: defaultPassword, // In production, hash this
      needsPasswordChange: true,
    };

    // Simulate sending email (in production, use nodemailer)
    console.log(`Email sent to ${email}: Password: ${defaultPassword}`);

    return NextResponse.json({
      message: 'User created successfully. Check your email for login credentials.',
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
