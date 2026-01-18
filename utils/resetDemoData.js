import { writeFile, readdir, unlink } from 'fs/promises';
import path from 'path';

// Default demo data for all modules
const DEFAULT_DATA = {
  notices: {
    master: { notices: [] },
    notices: []
  },
  documents: {
    master: { documents: [] },
    documents: []
  },
  events: {
    master: { events: [] },
    events: []
  },
  gallery: {
    master: { albums: [] },
    albums: []
  },
  committee: {
    master: { members: [] },
    members: []
  },
  contact: {
    officeAddress: "Nextland Society, Block A, Phase 2\nSector 42, New Town\nCity - 560001",
    officePhone: "+91-80-1234-5678",
    officeEmail: "office@nextlandsociety.com",
    emergencyContact: "Security Helpdesk",
    emergencyPhone: "+91-98765-43210",
    mapUrl: "https://maps.google.com/?q=Nextland+Society",
    officeHours: "Monday - Saturday: 9:00 AM - 6:00 PM\nSunday: Closed",
    updatedAt: new Date().toISOString(),
    updatedBy: "system"
  },
  settings: {
    society: {
      name: "Nextland Residential Society",
      shortName: "Nextland",
      address: "Block A, Phase 2, Sector 42, New Town",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India",
      registrationNumber: "KA/BLR/2020/12345",
      establishedYear: "2020"
    },
    branding: {
      primaryColor: "#0d6efd",
      secondaryColor: "#6c757d",
      accentColor: "#198754",
      logo: "/images/logo.png",
      favicon: "/favicon.ico",
      tagline: "Building Communities, Creating Homes"
    },
    system: {
      mode: "demo",
      readOnly: false,
      maintenanceMode: false,
      version: "1.0.0"
    },
    features: {
      enableGallery: true,
      enableEvents: true,
      enableDocuments: true,
      enableNotices: true,
      enableCommittee: true,
      enableContact: true
    },
    updatedAt: new Date().toISOString(),
    updatedBy: "system"
  }
};

/**
 * Reset all demo data to default state
 * WARNING: This will delete all existing data
 */
export async function resetAllDemoData() {
  const dataDir = path.join(process.cwd(), 'data', 'demo');
  const publicDir = path.join(process.cwd(), 'public');
  
  try {
    // Reset notices
    await writeFile(
      path.join(dataDir, 'notices', 'notice-master.json'),
      JSON.stringify(DEFAULT_DATA.notices.master, null, 2)
    );
    await cleanDirectory(path.join(dataDir, 'notices'), ['notice-master.json']);

    // Reset documents
    await writeFile(
      path.join(dataDir, 'documents', 'master.json'),
      JSON.stringify(DEFAULT_DATA.documents.master, null, 2)
    );
    await cleanDirectory(path.join(dataDir, 'documents'), ['master.json']);
    await cleanDirectory(path.join(publicDir, 'documents'), []);

    // Reset events
    await writeFile(
      path.join(dataDir, 'events', 'master.json'),
      JSON.stringify(DEFAULT_DATA.events.master, null, 2)
    );
    await cleanDirectory(path.join(dataDir, 'events'), ['master.json']);
    await cleanDirectory(path.join(publicDir, 'images', 'events'), []);

    // Reset gallery
    await writeFile(
      path.join(dataDir, 'gallery', 'master.json'),
      JSON.stringify(DEFAULT_DATA.gallery.master, null, 2)
    );
    await cleanDirectory(path.join(dataDir, 'gallery'), ['master.json']);
    await cleanDirectory(path.join(publicDir, 'images', 'gallery'), []);

    // Reset committee
    await writeFile(
      path.join(dataDir, 'committee', 'master.json'),
      JSON.stringify(DEFAULT_DATA.committee.master, null, 2)
    );
    await cleanDirectory(path.join(dataDir, 'committee'), ['master.json']);

    // Reset contact
    await writeFile(
      path.join(dataDir, 'contact.json'),
      JSON.stringify(DEFAULT_DATA.contact, null, 2)
    );

    // Reset settings
    await writeFile(
      path.join(dataDir, 'settings.json'),
      JSON.stringify(DEFAULT_DATA.settings, null, 2)
    );

    return {
      success: true,
      message: 'All demo data has been reset successfully',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error resetting demo data:', error);
    throw new Error(`Failed to reset demo data: ${error.message}`);
  }
}

/**
 * Clean all files in a directory except specified files
 */
async function cleanDirectory(dirPath, excludeFiles = []) {
  try {
    const files = await readdir(dirPath);
    
    for (const file of files) {
      if (!excludeFiles.includes(file)) {
        const filePath = path.join(dirPath, file);
        await unlink(filePath);
      }
    }
  } catch (error) {
    // Directory might not exist, ignore error
    if (error.code !== 'ENOENT') {
      console.error(`Error cleaning directory ${dirPath}:`, error);
    }
  }
}

/**
 * Get reset statistics
 */
export async function getResetStats() {
  const dataDir = path.join(process.cwd(), 'data', 'demo');
  
  try {
    const stats = {
      notices: 0,
      documents: 0,
      events: 0,
      gallery: 0,
      committee: 0
    };

    // Count items in each module
    const noticesFiles = await readdir(path.join(dataDir, 'notices')).catch(() => []);
    stats.notices = noticesFiles.filter(f => f !== 'notice-master.json').length;

    const documentsFiles = await readdir(path.join(dataDir, 'documents')).catch(() => []);
    stats.documents = documentsFiles.filter(f => f !== 'master.json').length;

    const eventsFiles = await readdir(path.join(dataDir, 'events')).catch(() => []);
    stats.events = eventsFiles.filter(f => f !== 'master.json').length;

    const galleryFiles = await readdir(path.join(dataDir, 'gallery')).catch(() => []);
    stats.gallery = galleryFiles.filter(f => f !== 'master.json').length;

    const committeeFiles = await readdir(path.join(dataDir, 'committee')).catch(() => []);
    stats.committee = committeeFiles.filter(f => f !== 'master.json').length;

    return stats;
  } catch (error) {
    console.error('Error getting reset stats:', error);
    return null;
  }
}
