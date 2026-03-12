import mongoose from 'mongoose'

const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['individual', 'association'], required: true },
  orgName: { type: String, default: '' },
  city: { type: String, default: '' },
  email: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
})

export const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema)

