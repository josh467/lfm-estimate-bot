const mongoose = require('mongoose');

const EstimateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectDetails: {
    type: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  materials: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unitPrice: {
      type: Number,
      required: true
    }
  }],
  estimatedCost: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

EstimateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

EstimateSchema.pre('updateOne', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Estimate', EstimateSchema);
