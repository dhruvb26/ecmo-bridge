// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  boolean,
  json,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ecmo-bridge_${name}`);

export const specialCare = pgEnum("special_care_category", [
  "PEDIATRIC",
  "FIRST_RESPONDERS",
  "SINGLE_CARETAKERS",
  "PREGNANT_PATIENTS",
  "SHORT_TERM_SURVIVAL",
]);

export const ecmoType = pgEnum("ecmo_type", ["PULMONARY", "CARDIAC", "ECPR"]);

export const hospitals = createTable(
  "hospitals",
  {
    id: serial("id").primaryKey().unique(),
    userId: varchar("userId", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    location: varchar("location", { length: 256 }).notNull(),
    coordinates: json("coordinates").notNull(),
    isVerified: boolean("isVerified").default(false),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const patients = createTable("patients", {
  id: serial("id").primaryKey().unique(), // Using cuid for generating default IDs
  name: varchar("name", { length: 256 }).notNull(),
  age: integer("age").notNull(),
  score: integer("score").notNull(),
  specialCare: specialCare("specialCare").notNull(), // Using SpecialCareCategory enum
  hospitalId: integer("hospitalId").references(() => hospitals.id),
  ecmoType: ecmoType("ecmoType").notNull(), // ECMOType is optional
  coordinates: json("coordinates").notNull(), // Added JSON type for coordinates
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const ecmos = createTable("ecmos", {
  id: serial("id").primaryKey().unique(),
  model: varchar("model", { length: 256 }).notNull(),
  serial: varchar("serial", { length: 256 }).notNull(),
  inUse: boolean("in_use").default(false).notNull(),
  isMatched: boolean("is_matched").default(false).notNull(),
  coordinates: json("coordinates").notNull(),
  hospitalId: integer("hospitalId").references(() => hospitals.id),
  type: ecmoType("type").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const hospitalsRelations = relations(hospitals, ({ many }) => ({
  patients: many(patients),
  ecmos: many(ecmos),
}));
