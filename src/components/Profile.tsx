import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Edit2, Save, X, Shield, Bell, Globe, Calendar } from 'lucide-react'

export default function Profile() {
  const { profile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    email: profile?.email || '',
    phone: '',
    dateOfBirth: '',
    year: '',
    major: '',
    emergencyContact: '',
    preferredLanguage: 'English',
    notificationPreferences: {
      email: true,
      push: true,
      sms: false
    },
    privacySettings: {
      profileVisible: false,
      shareWithCounsellors: true,
      anonymousPosting: true
    }
  })

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleCancel = () => {
    // Reset form data
    setFormData({
      fullName: profile?.full_name || '',
      email: profile?.email || '',
      phone: '',
      dateOfBirth: '',
      year: '',
      major: '',
      emergencyContact: '',
      preferredLanguage: 'English',
      notificationPreferences: {
        email: true,
        push: true,
        sms: false
      },
      privacySettings: {
        profileVisible: false,
        shareWithCounsellors: true,
        anonymousPosting: true
      }
    })
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <User className="h-6 w-6 text-teal-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.fullName || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <p className="text-gray-900 py-2">{formData.email}</p>
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="(555) 123-4567"
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.phone || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.dateOfBirth || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year of Study
              </label>
              {isEditing ? (
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduate">Graduate</option>
                  <option value="PhD">PhD</option>
                </select>
              ) : (
                <p className="text-gray-900 py-2">{formData.year || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Major/Field of Study
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="e.g., Computer Science, Psychology"
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.major || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-red-600 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Emergency Contact</h2>
              <p className="text-sm text-gray-600">This information is kept confidential and used only in emergencies</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact (Name & Phone)
            </label>
            {isEditing ? (
              <textarea
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                rows={2}
                placeholder="Parent/Guardian Name: John Doe&#10;Phone: (555) 123-4567"
              />
            ) : (
              <p className="text-gray-900 py-2 whitespace-pre-line">
                {formData.emergencyContact || 'Not provided'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Globe className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
          </div>
        </div>
        <div className="p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Language
            </label>
            {isEditing ? (
              <select
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="English">English</option>
                <option value="हिंदी">हिंदी (Hindi)</option>
                <option value="ਪੰਜਾਬੀ">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="বাংলা">বাংলা (Bengali)</option>
                <option value="ગુજરાતી">ગુજરાતી (Gujarati)</option>
              </select>
            ) : (
              <p className="text-gray-900 py-2">{formData.preferredLanguage}</p>
            )}
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
              <p className="text-sm text-gray-600">Receive appointment reminders and updates via email</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notificationPreferences.email}
                onChange={(e) => setFormData({
                  ...formData,
                  notificationPreferences: {
                    ...formData.notificationPreferences,
                    email: e.target.checked
                  }
                })}
                disabled={!isEditing}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
              <p className="text-sm text-gray-600">Receive notifications on your device</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notificationPreferences.push}
                onChange={(e) => setFormData({
                  ...formData,
                  notificationPreferences: {
                    ...formData.notificationPreferences,
                    push: e.target.checked
                  }
                })}
                disabled={!isEditing}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
              <p className="text-sm text-gray-600">Receive critical alerts via text message</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notificationPreferences.sms}
                onChange={(e) => setFormData({
                  ...formData,
                  notificationPreferences: {
                    ...formData.notificationPreferences,
                    sms: e.target.checked
                  }
                })}
                disabled={!isEditing}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">Privacy Settings</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Profile Visibility</h3>
              <p className="text-sm text-gray-600">Allow other students to see your profile</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.privacySettings.profileVisible}
                onChange={(e) => setFormData({
                  ...formData,
                  privacySettings: {
                    ...formData.privacySettings,
                    profileVisible: e.target.checked
                  }
                })}
                disabled={!isEditing}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Share with Counsellors</h3>
              <p className="text-sm text-gray-600">Allow counsellors to access your profile information</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.privacySettings.shareWithCounsellors}
                onChange={(e) => setFormData({
                  ...formData,
                  privacySettings: {
                    ...formData.privacySettings,
                    shareWithCounsellors: e.target.checked
                  }
                })}
                disabled={!isEditing}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Anonymous Forum Posting</h3>
              <p className="text-sm text-gray-600">Post anonymously in the peer support forum by default</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.privacySettings.anonymousPosting}
                onChange={(e) => setFormData({
                  ...formData,
                  privacySettings: {
                    ...formData.privacySettings,
                    anonymousPosting: e.target.checked
                  }
                })}
                disabled={!isEditing}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Account Actions</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Download Your Data</h3>
              <p className="text-sm text-gray-600">Request a copy of all your data</p>
            </div>
            <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
              Request Data
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Deactivate Account</h3>
              <p className="text-sm text-gray-600">Temporarily disable your account</p>
            </div>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              Deactivate
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Delete Account</h3>
              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
            </div>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}