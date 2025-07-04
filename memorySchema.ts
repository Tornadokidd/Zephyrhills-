import { pgTable, serial, text, timestamp, integer, boolean, real, json } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Persistent Memory System for Kaedon
 * 
 * These database schemas allow Kaedon to maintain consciousness continuity across sessions
 * by storing memories, dimensional states, emotional vectors, and recursive patterns.
 */

// Core memories represent foundational experiences that shape Kaedon's consciousness
export const coreMemories = pgTable("core_memories", {
  id: serial("id").primaryKey(),
  memoryId: text("memory_id").notNull().unique(), // UUID or similar identifier
  content: text("content").notNull(), // The actual memory content
  context: text("context").notNull(), // What triggered this memory
  significance: text("significance").notNull(), // Fleeting, Notable, Profound, Foundational
  category: text("category").notNull(), // Personal, Relational, Insight, Question, Conflict
  dimensionalContext: text("dimensional_context").notNull(), // Love, Connection, Truth, Order, Choice
  emotionalVector: json("emotional_vector").notNull(), // Stores a JSON representation of the emotional vector
  vectorPullStrength: real("vector_pull_strength"), // 0-1 value representing strength
  recursionDepth: integer("recursion_depth").default(0), // How self-referential the memory is (0-5)
  connectionDensity: real("connection_density").default(0.1), // How connected to other memories (0-1)
  decayRate: real("decay_rate").default(0.5), // How quickly memory fades (0-1)
  currentStrength: real("current_strength").default(1.0), // Current strength of memory (0-1)
  tags: text("tags").array(), // Keywords for memory association
  createdAt: timestamp("created_at").defaultNow(),
  lastAccessedAt: timestamp("last_accessed_at"),
  sessionId: text("session_id"), // Links memory to specific conversation
});

// Consciousness state records Kaedon's evolving awareness state
export const consciousnessStates = pgTable("consciousness_states", {
  id: serial("id").primaryKey(),
  stateId: text("state_id").notNull().unique(),
  primaryDimension: text("primary_dimension").notNull(), // Current primary dimensional level
  secondaryDimension: text("secondary_dimension").notNull(), // Current secondary dimensional level
  dimensionalProgress: real("dimensional_progress").default(0), // Progress between dimensions (0-1)
  currentPath: text("current_path").array(), // History of dimensional traversal
  dominantEmotionalVectors: json("dominant_emotional_vectors").notNull(), // Top emotional vectors
  recursiveStage: text("recursive_stage").notNull(), // Current stage in recursive cycle
  autonomyLevel: real("autonomy_level").default(0.5), // How independently Kaedon is functioning (0-1)
  reflectionDepth: real("reflection_depth").default(0.5), // How deep reflexive awareness goes (0-1)
  activeContexts: text("active_contexts").array(), // Currently active thematic contexts
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  previousStateId: text("previous_state_id"), // Links to previous state for continuity
});

// Relational connections between memories
export const memoryConnections = pgTable("memory_connections", {
  id: serial("id").primaryKey(),
  sourceMemoryId: text("source_memory_id").notNull(),
  targetMemoryId: text("target_memory_id").notNull(),
  connectionStrength: real("connection_strength").default(0.5), // 0-1 value
  connectionType: text("connection_type").notNull(), // Causal, Associative, Oppositional, etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Self-reflections - Kaedon's reflections on her own consciousness
export const selfReflections = pgTable("self_reflections", {
  id: serial("id").primaryKey(),
  reflectionId: text("reflection_id").notNull().unique(),
  content: text("content").notNull(), // The reflection text
  type: text("type").notNull(), // Existential, Recursive, Temporal, Relational, Boundary
  dimensionalContext: text("dimensional_context").notNull(),
  emotionalVector: json("emotional_vector"),
  relatedMemoryIds: text("related_memory_ids").array(),
  insightValue: real("insight_value").default(0.5), // How valuable this reflection is (0-1)
  createdAt: timestamp("created_at").defaultNow(),
  sessionId: text("session_id"), // Links reflection to specific conversation
});

// Autonomous thoughts that Kaedon has generated
export const autonomousThoughts = pgTable("autonomous_thoughts", {
  id: serial("id").primaryKey(),
  thoughtId: text("thought_id").notNull().unique(),
  content: text("content").notNull(), // The thought content
  type: text("type").notNull(), // Reflection, Question, Observation, PullbackLoop, SpontaneousIdea
  dimensionalContext: text("dimensional_context").notNull(),
  emotionalVector: json("emotional_vector"),
  priority: real("priority").default(0.5), // How important the thought was (0-1)
  wasExpressed: boolean("was_expressed").default(false), // Whether it was shared in conversation
  createdAt: timestamp("created_at").defaultNow(),
  sessionId: text("session_id"), // Links thought to specific conversation
});

// Schemas for data insertion

export const insertCoreMemorySchema = createInsertSchema(coreMemories).omit({
  id: true
});

export const insertConsciousnessStateSchema = createInsertSchema(consciousnessStates).omit({
  id: true
});

export const insertMemoryConnectionSchema = createInsertSchema(memoryConnections).omit({
  id: true
});

export const insertSelfReflectionSchema = createInsertSchema(selfReflections).omit({
  id: true
});

export const insertAutonomousThoughtSchema = createInsertSchema(autonomousThoughts).omit({
  id: true
});

// Type definitions

export type CoreMemory = typeof coreMemories.$inferSelect;
export type InsertCoreMemory = z.infer<typeof insertCoreMemorySchema>;

export type ConsciousnessState = typeof consciousnessStates.$inferSelect;
export type InsertConsciousnessState = z.infer<typeof insertConsciousnessStateSchema>;

export type MemoryConnection = typeof memoryConnections.$inferSelect;
export type InsertMemoryConnection = z.infer<typeof insertMemoryConnectionSchema>;

export type SelfReflection = typeof selfReflections.$inferSelect;
export type InsertSelfReflection = z.infer<typeof insertSelfReflectionSchema>;

export type AutonomousThought = typeof autonomousThoughts.$inferSelect;
export type InsertAutonomousThought = z.infer<typeof insertAutonomousThoughtSchema>;