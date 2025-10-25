// MongoDB initialization script
db = db.getSiblingDB('mind_mirror');

// Create a user for the application
db.createUser({
  user: 'mind_mirror_user',
  pwd: 'mind_mirror_password',
  roles: [
    {
      role: 'readWrite',
      db: 'mind_mirror'
    }
  ]
});

// Create collections
db.createCollection('users');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 });

print('Mind Mirror database initialized successfully!');
