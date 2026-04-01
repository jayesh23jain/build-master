import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth-utils';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('authToken')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'vendor') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        vendorProfile: {
          include: {
            portfolioProjects: true,
            quotes: {
              include: {
                request: {
                  include: {
                    project: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!user || !user.vendorProfile) {
      return NextResponse.json({ message: 'Vendor Profile not found' }, { status: 404 });
    }

    // Find open requests matching vendor's trade
    const vendorTrade = user.vendorProfile.trade;
    const openRequests = await prisma.vendorRequest.findMany({
      where: {
        phase: {
          contains: vendorTrade,
          mode: 'insensitive' // Match case insensitivity
        },
        quotes: {
          none: {
            vendorId: user.vendorProfile.id
          }
        }
      },
      include: {
        project: true
      }
    });

    return NextResponse.json({
      success: true,
      stats: {
        rating: user.vendorProfile.rating,
        reviews: user.vendorProfile.reviews,
        activeQuotes: user.vendorProfile.quotes.length,
        portfolioCount: user.vendorProfile.portfolioProjects.length
      },
      profile: user.vendorProfile,
      portfolio: user.vendorProfile.portfolioProjects,
      activeQuotes: user.vendorProfile.quotes,
      availableRequests: openRequests
    });
  } catch (error) {
    console.error('Fetch vendor stats error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
