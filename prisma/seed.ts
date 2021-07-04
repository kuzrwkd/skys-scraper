import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.organizationMaster.createMany({
    data: [{ name: '日本経済新聞' }, { name: 'Bloomberg' }, { name: 'Reuters' }, { name: 'CNBC' }],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
