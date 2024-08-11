import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mock_interview", {
  id: serial("id").primaryKey(),
  jsonMockResponse: text("json_mock_response").notNull(),
  jonPosition: varchar("job_position").notNull(),
  jobDescription: text("job_description").notNull(),
  jobExperience: text("job_experience").notNull(),

  createdBy: varchar("created_by", { length: 256 }).notNull(),
  createdAt: varchar("created_at").notNull(),

  mockId: varchar("mock_id").notNull(),
});
