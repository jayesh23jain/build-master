import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create a Customer
  const customerPassword = await bcrypt.hash('Customer123!', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      email: 'customer@test.com',
      passwordHash: customerPassword,
      firstName: 'Jayesh',
      lastName: 'Jain',
      role: 'customer',
      customerProfile: {
        create: {
          phone: '+91 98765 43210',
          location: 'Mumbai, Maharashtra',
          address: 'Greenfield Residence, Sector 12',
        }
      }
    },
    include: { customerProfile: true }
  });

  // 2. Create a Vendor
  const vendorPassword = await bcrypt.hash('Vendor123!', 10);
  const vendor = await prisma.user.upsert({
    where: { email: 'vendor@test.com' },
    update: {},
    create: {
      email: 'vendor@test.com',
      passwordHash: vendorPassword,
      firstName: 'Ravi',
      lastName: 'Sharma',
      role: 'vendor',
      vendorProfile: {
        create: {
          trade: 'Foundation & Excavation',
          license: 'GC-2024-00881',
          phone: '+91 98765 43210',
          location: 'Pune, Maharashtra',
          bio: 'Specializing in high-end residential foundation and excavation since 2010.',
          rating: 4.9,
          reviews: 12,
        }
      }
    },
    include: { vendorProfile: true }
  });

  // 3. Create a Customer Project
  if (customer.customerProfile) {
    const project = await prisma.customerProject.create({
      data: {
        customerId: customer.customerProfile.id,
        title: 'Greenfield Residence',
        description: 'Modern 4-bedroom villa with sustainable features.',
        address: 'Plot 42, Green Valley, Mumbai',
        phase: 'Structural Framing',
        budget: '₹1.2Cr',
        timeline: 'Jan–May 2025',
        status: 'active',
      }
    });

    // 4. Create Vendor Requests (derived from phases)
    const phases = [
      { num: '01', title: 'Foundation & Groundwork', budget: '₹15L – ₹25L', status: 'completed' },
      { num: '02', title: 'Structural Framing', budget: '₹30L – ₹50L', status: 'active' },
      { num: '03', title: 'Electrical & Plumbing', budget: '₹12L – ₹20L', status: 'active' },
      { num: '04', title: 'Interiors & Woodwork', budget: '₹20L – ₹40L', status: 'planning' },
    ];

    for (const ph of phases) {
      const request = await prisma.vendorRequest.create({
        data: {
          projectId: project.id,
          phase: ph.title,
          title: ph.title,
          budget: ph.budget,
        }
      });

      // Add a quote for the active phase from our vendor
      if (ph.num === '02' && vendor.vendorProfile) {
        await prisma.quote.create({
          data: {
            requestId: request.id,
            vendorId: vendor.vendorProfile.id,
            amount: '₹32L',
            description: 'Full structural framing using premium steel and timber.',
            timeline: '45 days',
            status: 'pending',
          }
        });
      }
    }
  }

  // 5. Add Vendor Portfolio Projects
  if (vendor.vendorProfile) {
    await prisma.portfolioProject.createMany({
      data: [
        {
          vendorId: vendor.vendorProfile.id,
          title: 'Luxury Villa Foundation',
          description: 'Custom excavation and deep foundation for a 10,000 sq ft villa.',
          category: 'residential',
          budget: '₹45L',
          timeline: '3 months',
          status: 'completed',
          location: 'Pune',
          tags: ['Concrete', 'Excavation', 'Structural'],
        },
        {
          vendorId: vendor.vendorProfile.id,
          title: 'Metropolis Office Complex',
          description: 'Large scale excavation and soil stabilization for commercial complex.',
          category: 'commercial',
          budget: '₹1.2Cr',
          timeline: '6 months',
          status: 'completed',
          location: 'Mumbai',
          tags: ['Heavy Machinery', 'Grading'],
        }
      ]
    });
  }

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
