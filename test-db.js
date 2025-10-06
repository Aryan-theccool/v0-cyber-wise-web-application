// Test database connection and check users
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Testing database connection...\n');
  
  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!\n');
    
    // Count users
    const userCount = await prisma.user.count();
    console.log(`📊 Total users in database: ${userCount}\n`);
    
    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        mobile: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    if (users.length === 0) {
      console.log('⚠️  No users found in database!');
      console.log('   This means either:');
      console.log('   1. No accounts have been created yet');
      console.log('   2. Accounts are being created in a different database');
      console.log('   3. There\'s an error during signup\n');
    } else {
      console.log('👥 Users in database:\n');
      users.forEach((user, index) => {
        console.log(`${index + 1}. Username: ${user.username}`);
        console.log(`   Mobile: ${user.mobile}`);
        console.log(`   Created: ${user.createdAt.toLocaleString()}`);
        console.log(`   ID: ${user.id}\n`);
      });
    }
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
