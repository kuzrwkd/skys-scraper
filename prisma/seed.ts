import { contentsMasterFactory, organizationMasterFactory } from './factory';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.organizationMaster.createMany({ ...organizationMasterFactory });
  await prisma.contentsMaster.createMany({ ...contentsMasterFactory });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
