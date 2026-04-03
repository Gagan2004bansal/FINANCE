/**
 * Database seeder – ensures the default admin account exists.
 * Called once on server startup after the DB connection is established.
 *
 * Admin credentials:
 *   email    : Admin@mail.com
 *   password : Admin@123
 */

const User = require('../models/User');

const ADMIN_EMAIL = 'admin@mail.com';
const ADMIN_PASSWORD = 'Admin@123';
const ADMIN_NAME = 'Admin';

const seedAdmin = async () => {
  try {
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      return;
    }

    await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
      status: 'active',
    });

    console.log(`Admin user created: ${ADMIN_EMAIL}`);
  } catch (error) {
    console.error('Admin seed error:', error.message);
  }
};

module.exports = seedAdmin;
