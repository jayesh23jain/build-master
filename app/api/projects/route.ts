import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth-utils';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('authToken')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'customer') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        customerProfile: {
          include: {
            projects: {
              include: {
                requests: {
                  include: {
                    quotes: {
                      include: {
                        vendor: {
                          include: {
                            user: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!user || !user.customerProfile) {
      return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
    }

    const project = user.customerProfile.projects[0]; // For now, handle the first project

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('Fetch projects error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
