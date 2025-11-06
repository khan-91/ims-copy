import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "tanveera915637@gmail.com" },
    create: {
      name: "Admin User",
      email: "tanveera915637@gmail.com",
      passwordHash: hashedPassword,
      role: "ADMIN"
    }
  });

  console.log("Admin user created:", admin);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
