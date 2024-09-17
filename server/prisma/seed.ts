import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    // Delete dependent records first
    await prisma.sales.deleteMany({});
    await prisma.purchases.deleteMany({});
    await prisma.expenseByCategory.deleteMany({});
    
    // Now, delete from the main tables
    await prisma.products.deleteMany({});
    await prisma.expenseSummary.deleteMany({});
    await prisma.salesSummary.deleteMany({});
    await prisma.purchaseSummary.deleteMany({});
    await prisma.users.deleteMany({});
    await prisma.expenses.deleteMany({});

    console.log("Cleared all data successfully.");
  } catch (error) {
    console.error("Error while clearing data: ", error);
  }
}

async function seedData(orderedFileNames: string[], dataDirectory: string) {
  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

  await deleteAllData();
  await seedData(orderedFileNames, dataDirectory);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
