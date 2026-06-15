#!/bin/bash
# DocMind vector database backup utility

BACKUP_DIR="backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="docmind_db_backup_$TIMESTAMP.tar.gz"

echo "Initializing backup process..."

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Check if vector DB storage directory exists
DB_DIR="db_storage"
if [ ! -d "$DB_DIR" ] && [ -d "chroma_db" ]; then
    DB_DIR="chroma_db"
fi

if [ -d "$DB_DIR" ]; then
    echo "Compressing database directory '$DB_DIR'..."
    tar -czf "$BACKUP_DIR/$BACKUP_NAME" "$DB_DIR"
    echo "Backup completed successfully: $BACKUP_DIR/$BACKUP_NAME"
else
    echo "Error: Database storage directory not found. Nothing to backup."
    exit 1
fi
