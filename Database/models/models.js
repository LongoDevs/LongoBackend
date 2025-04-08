const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust the path as needed

// User Model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  full_name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password_hash: DataTypes.STRING,
  phone: {
    type: DataTypes.STRING,
    unique: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['admin', 'client', 'service_provider']]
    }
  },
  profile_photo: DataTypes.STRING,
  location: DataTypes.STRING,
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  bio: DataTypes.TEXT,
  experience_years: DataTypes.INTEGER,
  specialties: DataTypes.ARRAY(DataTypes.STRING),
  trophies: DataTypes.ARRAY(DataTypes.STRING),
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Job Model
const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  location: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['open', 'in_progress', 'completed', 'cancelled']]
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Bid Model
const Bid = sequelize.define('Bid', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  offer_price: DataTypes.DECIMAL(10, 2),
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['pending', 'accepted', 'rejected']]
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Payment Model
const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  amount: DataTypes.DECIMAL(10, 2),
  payment_status: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['pending', 'successful', 'failed']]
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Notification Model
const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  message: DataTypes.TEXT,
  type: DataTypes.STRING,
  related_id: DataTypes.UUID,
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Review Model
const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 10
    }
  },
  comment: DataTypes.TEXT,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Points History Model
const PointsHistory = sequelize.define('PointsHistory', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  points_delta: DataTypes.INTEGER,
  reason: DataTypes.TEXT,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Subscription Model
const Subscription = sequelize.define('Subscription', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  start_date: DataTypes.DATE,
  end_date: DataTypes.DATE,
  status: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['active', 'inactive', 'cancelled']]
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Relationships

// A Job is posted by a User (Client)
Job.belongsTo(User, { foreignKey: 'user_id' });

// A Bid is made by a Service Provider on a Job
Bid.belongsTo(Job, { foreignKey: 'job_id' });
Bid.belongsTo(User, { foreignKey: 'user_id' });

// A Payment is linked to a Job and a Bid
Payment.belongsTo(User, { foreignKey: 'user_id' });
Payment.belongsTo(Job, { foreignKey: 'job_id' });
Payment.belongsTo(Bid, { foreignKey: 'bid_id' });

// A Notification is sent to a User
Notification.belongsTo(User, { foreignKey: 'user_id' });

// A Review is given by a Client to a Service Provider
Review.belongsTo(Job, { foreignKey: 'job_id' });
Review.belongsTo(User, { foreignKey: 'client_id' });
Review.belongsTo(User, { foreignKey: 'service_provider_id' });

// PointsHistory is linked to User
PointsHistory.belongsTo(User, { foreignKey: 'user_id' });

// Subscription is linked to User
Subscription.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  User,
  Job,
  Bid,
  Payment,
  Notification,
  Review,
  PointsHistory,
  Subscription
};
