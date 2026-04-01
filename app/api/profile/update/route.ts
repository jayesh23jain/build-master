import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth-utils';

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get('authToken')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const auth = verifyToken(token);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { firstName, lastName, phone, location, bio, trade, license, experience } = body;

    // 1. Update Base User Info
    await prisma.user.update({
      where: { id: auth.userId },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      },
    });

    // 2. Update Role-Specific Profile
    if (auth.role === 'vendor') {
      await prisma.vendorProfile.upsert({
        where: { userId: auth.userId },
        create: {
          userId: auth.userId,
          phone: phone || '',
          location: location || '',
          bio: bio || '',
          trade: trade || 'General Contractor',
          license: license || '',
          experience: experience || '',
        },
        update: {
          phone: phone || undefined,
          location: location || undefined,
          bio: bio || undefined,
          trade: trade || undefined,
          license: license || undefined,
          experience: experience || undefined,
        },
      });
    } else if (auth.role === 'customer') {
      await prisma.customerProfile.upsert({
        where: { userId: auth.userId },
        create: {
          userId: auth.userId,
          phone: phone || '',
          address: location || '',
        },
        update: {
          phone: phone || undefined,
          address: location || undefined,
        },
      });
    }

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile Update Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
