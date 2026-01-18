# NextLand Society CMS: Data Storage

## Overview
NextLand Society CMS uses a flexible, modular approach to data storage, supporting both file-based and database-backed solutions. The default implementation is JSON/file-based, making it easy to deploy, backup, and migrate. Future versions will support pluggable database adapters for scalability and advanced features.

## Storage Types
### 1. File-Based Storage (Default)
- Data is stored as JSON files in the `data/` directory.
- Suitable for small to medium societies and quick deployments.
- Easy to backup, restore, and migrate.
- Directory structure:
  - `data/schemas/` — Data validation schemas
  - `data/uploads/` — User-uploaded files (documents, images)
  - `data/admin/`, `data/committee/`, etc. — Module-specific data

### 2. Database Storage (Planned)
- Support for PostgreSQL, MySQL, and other databases (see roadmap).
- Enables advanced querying, scalability, and integrations.
- Pluggable adapters will allow seamless migration from file-based to database storage.

## Data Organization
- Each module (admin, committee, events, etc.) has its own data folder or table.
- Schemas define the structure and validation rules for each data type.
- Uploaded files are stored in dedicated folders and referenced in data records.

## Backup & Restore
- File-based storage can be backed up by copying the `data/` directory.
- Database backups should follow standard DBMS procedures.
- Regular backups are recommended for disaster recovery.

## Security & Access
- Role-based access control (RBAC) restricts data access by user role.
- Sensitive data is protected via authentication and authorization checks.
- Audit logs track changes to critical data.

## Migration
- Migration scripts/tools will be provided for moving from file-based to database storage.
- Data export/import features are planned for future releases.

## Best Practices
- Regularly backup your data directory or database.
- Validate data using schemas to prevent corruption.
- Store sensitive files securely and restrict access.
- Monitor audit logs for unusual activity.

---

For more details, see:
- `application-specification.md` (architecture)
- `roadmap.md` (future database support)
- `security.md` (data protection)
