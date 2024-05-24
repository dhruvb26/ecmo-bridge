// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { is, relations, sql } from "drizzle-orm";
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
  decimal,
  numeric,
  doublePrecision,
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
  hospitalId: integer("hospitalId")
    .references(() => hospitals.id)
    .notNull(),
  isMatched: boolean("is_matched").default(false).notNull(),
  ecmoType: ecmoType("ecmoType").notNull(), // ECMOType is optional
  coordinates: json("coordinates").notNull(), // Added JSON type for coordinates
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const ecmos = createTable("ecmos", {
  id: serial("id").primaryKey().unique(),
  model: varchar("model", { length: 256 }).notNull(),
  serial: varchar("serial", { length: 256 }).notNull(),
  inUse: boolean("in_use").default(false).notNull(),
  isMatched: boolean("is_matched").default(false).notNull(),
  coordinates: json("coordinates").notNull(),
  hospitalId: integer("hospitalId")
    .references(() => hospitals.id)
    .notNull(),
  type: ecmoType("type").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const matches = createTable("matches", {
  id: serial("id").primaryKey().unique(),
  patientId: integer("patient_id")
    .references(() => patients.id)
    .notNull(),
  hospitalId: integer("hospital_id")
    .references(() => hospitals.id)
    .notNull(),
  ecmoId: integer("ecmo_id"),
  distance: doublePrecision("distance"),
  duration: doublePrecision("duration"),
  location: varchar("location", { length: 256 }),
  matchedAt: timestamp("matched_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const matchesRelations = relations(matches, ({ one }) => ({
  patient: one(patients, {
    fields: [matches.patientId],
    references: [patients.id],
  }),
  hospital: one(hospitals, {
    fields: [matches.hospitalId],
    references: [hospitals.id],
  }),
}));

export const hospitalsRelations = relations(hospitals, ({ many }) => ({
  patients: many(patients),
  ecmos: many(ecmos),
  matches: many(matches),
}));

export const patientsRelations = relations(patients, ({ one }) => ({
  hospital: one(hospitals, {
    fields: [patients.hospitalId],
    references: [hospitals.id],
  }),
}));

export const ecmosRelations = relations(ecmos, ({ one }) => ({
  hospital: one(hospitals, {
    fields: [ecmos.hospitalId],
    references: [hospitals.id],
  }),
}));
