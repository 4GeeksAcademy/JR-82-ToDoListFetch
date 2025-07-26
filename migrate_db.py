#!/usr/bin/env python3
"""
Migration script to add category column to existing anime database
and set all existing anime to 'general' category
"""

import sqlite3
import os

def migrate_database():
    db_path = 'instance/anime.db'
    
    if not os.path.exists(db_path):
        print("Database file not found!")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if category column exists
        cursor.execute("PRAGMA table_info(anime)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'category' not in columns:
            print("Adding category column...")
            # Add category column with default value
            cursor.execute("ALTER TABLE anime ADD COLUMN category TEXT DEFAULT 'general'")
            
            # Update all existing records to have 'general' category
            cursor.execute("UPDATE anime SET category = 'general' WHERE category IS NULL OR category = ''")
            
            conn.commit()
            print("Migration completed successfully!")
            
            # Show results
            cursor.execute("SELECT COUNT(*) FROM anime WHERE category = 'general'")
            general_count = cursor.fetchone()[0]
            print(f"Total anime with 'general' category: {general_count}")
        else:
            print("Category column already exists!")
            
            # Still update any NULL or empty categories to 'general'
            cursor.execute("UPDATE anime SET category = 'general' WHERE category IS NULL OR category = ''")
            conn.commit()
            
            cursor.execute("SELECT COUNT(*) FROM anime WHERE category = 'general'")
            general_count = cursor.fetchone()[0]
            print(f"Total anime with 'general' category: {general_count}")
            
    except Exception as e:
        print(f"Error during migration: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_database()
