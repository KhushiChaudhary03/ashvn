import React, { useState } from 'react'
import { Settings as SettingsIcon, University, Users, Bell, Shield, Palette, Globe, Save } from 'lucide-react'

export default function Settings() {
  const [settings, setSettings] = useState({
    institution: {
      name: 'State University',
      logo: '',
      primaryColor: '#14B8A6',
      secondaryColor: '#3B82F6',
      contactEmail: 'counseling@university.edu',
      emergencyNumber: '1-800-273-8255',
      address: '123 University Ave, Campus City, ST 12345'
    },
    system: {
      maintenanceMode: false,
      registrationOpen: true,
      maxStudentsPerCounsellor: 50,
      sessionDuration: 60,
      autoLogout: 30,
      dataRetention: 365
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
      riskThreshold: 'high'
    },
    localization: {
      defaultLanguage: 'English',
      supportedLanguages: ['English', 'हिंदी', 'ਪੰਜਾਬੀ'],
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY'
    }
  })

  const [activeTab, setActiveTab] = useState('institution')

  const handleSave = () => {
    // Here you would typically make an API call to save settings
    alert('Settings saved successfully!')
  }

  const tabs = [
    { id: 'institution', name: 'Institution', icon: University },
    { id: 'system', name: 'System', icon: SettingsIcon },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'localization', name: 'Localization', icon: Globe },
  ]

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure platform settings and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center"
        >
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-teal-50 text-teal-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-3" />
                {tab.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 ml-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Institution Settings */}
            {activeTab === 'institution' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Institution Configuration</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution Name
                      </label>
                      <input
                        type="text"
                        value={settings.institution.name}
                        onChange={(e) => updateSetting('institution', 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={settings.institution.contactEmail}
                        onChange={(e) => updateSetting('institution', 'contactEmail', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Helpline
                      </label>
                      <input
                        type="tel"
                        value={settings.institution.emergencyNumber}
                        onChange={(e) => updateSetting('institution', 'emergencyNumber', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Theme Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.institution.primaryColor}
                          onChange={(e) => updateSetting('institution', 'primaryColor', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          value={settings.institution.primaryColor}
                          onChange={(e) => updateSetting('institution', 'primaryColor', e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution Address
                    </label>
                    <textarea
                      value={settings.institution.address}
                      onChange={(e) => updateSetting('institution', 'address', e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution Logo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <p className="text-gray-500">Upload your institution's logo</p>
                      <button className="mt-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
                        Choose File
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">System Configuration</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Students per Counsellor
                      </label>
                      <input
                        type="number"
                        value={settings.system.maxStudentsPerCounsellor}
                        onChange={(e) => updateSetting('system', 'maxStudentsPerCounsellor', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Session Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.system.sessionDuration}
                        onChange={(e) => updateSetting('system', 'sessionDuration', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Auto-logout (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.system.autoLogout}
                        onChange={(e) => updateSetting('system', 'autoLogout', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data Retention (days)
                      </label>
                      <input
                        type="number"
                        value={settings.system.dataRetention}
                        onChange={(e) => updateSetting('system', 'dataRetention', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Maintenance Mode</h3>
                        <p className="text-sm text-gray-600">Temporarily disable access for system updates</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.system.maintenanceMode}
                          onChange={(e) => updateSetting('system', 'maintenanceMode', e.target.checked)}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Open Registration</h3>
                        <p className="text-sm text-gray-600">Allow new students to register</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.system.registrationOpen}
                          onChange={(e) => updateSetting('system', 'registrationOpen', e.target.checked)}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* User Management */}
            {activeTab === 'users' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">User Management</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">1,847</div>
                        <div className="text-sm text-gray-600">Total Students</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">23</div>
                        <div className="text-sm text-gray-600">Active Counsellors</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">5</div>
                        <div className="text-sm text-gray-600">Administrators</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button className="bg-teal-600 text-white p-4 rounded-lg hover:bg-teal-700 transition-colors">
                      <Users className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Manage Students</div>
                      <div className="text-sm opacity-90">View and manage student accounts</div>
                    </button>

                    <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
                      <Shield className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Manage Counsellors</div>
                      <div className="text-sm opacity-90">Add and manage counsellor accounts</div>
                    </button>

                    <button className="border-2 border-gray-300 text-gray-700 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <Users className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Bulk User Import</div>
                      <div className="text-sm">Import users from CSV file</div>
                    </button>

                    <button className="border-2 border-gray-300 text-gray-700 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <SettingsIcon className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Role Permissions</div>
                      <div className="text-sm">Configure user role permissions</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h2>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Email Alerts</h3>
                        <p className="text-sm text-gray-600">Send email notifications for important events</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.emailAlerts}
                          onChange={(e) => updateSetting('notifications', 'emailAlerts', e.target.checked)}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">SMS Alerts</h3>
                        <p className="text-sm text-gray-600">Send SMS for critical alerts and emergencies</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.smsAlerts}
                          onChange={(e) => updateSetting('notifications', 'smsAlerts', e.target.checked)}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                        <p className="text-sm text-gray-600">Send browser push notifications</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.pushNotifications}
                          onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Risk Alert Threshold
                    </label>
                    <select
                      value={settings.notifications.riskThreshold}
                      onChange={(e) => updateSetting('notifications', 'riskThreshold', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="medium">Medium Risk and Above</option>
                      <option value="high">High Risk and Above</option>
                      <option value="critical">Critical Risk Only</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Localization */}
            {activeTab === 'localization' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Localization Settings</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Language
                      </label>
                      <select
                        value={settings.localization.defaultLanguage}
                        onChange={(e) => updateSetting('localization', 'defaultLanguage', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="English">English</option>
                        <option value="हिंदी">हिंदी (Hindi)</option>
                        <option value="ਪੰਜਾਬੀ">ਪੰਜਾਬੀ (Punjabi)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.localization.timezone}
                        onChange={(e) => updateSetting('localization', 'timezone', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="Asia/Mumbai">Asia/Mumbai</option>
                        <option value="Asia/Delhi">Asia/Delhi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Format
                      </label>
                      <select
                        value={settings.localization.dateFormat}
                        onChange={(e) => updateSetting('localization', 'dateFormat', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supported Languages
                    </label>
                    <div className="space-y-2">
                      {['English', 'हिंदी', 'ਪੰਜਾਬੀ', 'বাংলা', 'ગુજરાતી', 'मराठी'].map((language) => (
                        <label key={language} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.localization.supportedLanguages.includes(language)}
                            onChange={(e) => {
                              const current = settings.localization.supportedLanguages
                              const updated = e.target.checked
                                ? [...current, language]
                                : current.filter(l => l !== language)
                              updateSetting('localization', 'supportedLanguages', updated)
                            }}
                            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 mr-3"
                          />
                          <span className="text-sm text-gray-700">{language}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Default content for other tabs */}
            {!['institution', 'system', 'users', 'notifications', 'localization'].includes(activeTab) && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  {tabs.find(t => t.id === activeTab)?.name} Settings
                </h2>
                <div className="text-center py-12">
                  <p className="text-gray-500">Settings for this section are coming soon.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}