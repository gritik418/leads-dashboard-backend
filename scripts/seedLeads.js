import "dotenv/config";
import connectToDB from "../dist/database/index.js";
import { faker } from "@faker-js/faker";
import Lead from "../dist/models/Lead.js";

const seedLeads = async () => {
  try {
    await connectToDB();
    console.log("Connected to MongoDB");

    const sources = ["Website", "Referral", "Ads", "Social"];
    const statuses = ["New", "Contacted", "Converted", "Lost"];
    const stages = ["Lead", "Qualified", "Proposal"];

    const leads = [];

    for (let i = 0; i < 100; i++) {
      leads.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        source: faker.helpers.arrayElement(sources),
        status: faker.helpers.arrayElement(statuses),
        stage: faker.helpers.arrayElement(stages),
      });
    }

    await Lead.insertMany(leads);
    console.log("100 leads seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedLeads();
