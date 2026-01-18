import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { getConfig, updateConfig, getUsers, upsertUser } from "@/utils/dataStore";

/**
 * Initialize production folder structure
 * Creates all necessary folders and deleted/ subdirectories
 */
function initializeProductionStructure() {
  const basePath = path.join(process.cwd(), "data", "prod");
  const sections = ["auth", "committee", "contact", "documents", "events", "gallery", "notices", "app-config"];
  
  sections.forEach((section) => {
    const sectionPath = path.join(basePath, section);
    const deletedPath = path.join(sectionPath, "deleted");
    
    // Create section folder
    if (!fs.existsSync(sectionPath)) {
      fs.mkdirSync(sectionPath, { recursive: true });
    }
    
    // Create deleted subfolder (except for auth and app-config)
    if (section !== "auth" && section !== "app-config" && !fs.existsSync(deletedPath)) {
      fs.mkdirSync(deletedPath, { recursive: true });
    }
  });
  
  // Create images folder structure
  const imagesPath = path.join(basePath, "images");
  const imageSections = ["events", "gallery", "notices", "documents"];
  
  imageSections.forEach((section) => {
    const imgSectionPath = path.join(imagesPath, section);
    if (!fs.existsSync(imgSectionPath)) {
      fs.mkdirSync(imgSectionPath, { recursive: true });
    }
  });
}

/**
 * GET /api/config
 * Retrieve current configuration
 */
export async function GET() {
  try {
    const config = getConfig();
    
    if (!config) {
      return NextResponse.json({ error: "Config not found" }, { status: 404 });
    }
    
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error fetching config:", error);
    return NextResponse.json({ error: "Config not found" }, { status: 404 });
  }
}

/**
 * POST /api/config
 * Update configuration and create admin user
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { config: incomingConfig, admin } = body || {};

    if (!incomingConfig || !admin) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Initialize production folder structure
    initializeProductionStructure();

    // Update config using service layer
    const configUpdates = {
      ...incomingConfig,
      mode: "production",
    };
    
    const configSuccess = updateConfig(configUpdates, { username: admin.username });
    
    if (!configSuccess) {
      return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
    }

    // Handle user creation using service layer
    const passwordHash = crypto
      .createHash("sha256")
      .update(admin.password || "")
      .digest("hex");

    const newUser = {
      username: admin.username,
      email: admin.email,
      passwordHash,
      role: "admin",
    };

    // Use upsertUser from service layer
    const userSuccess = await upsertUser(newUser, null); // Initial setup, no currentUser yet
    
    if (!userSuccess) {
      return NextResponse.json({ error: "Failed to create admin user" }, { status: 500 });
    }

    const updatedConfig = getConfig();

    return NextResponse.json({ success: true, config: updatedConfig });
  } catch (error) {
    console.error("Failed to save configuration", error);
    return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 });
  }
}
