import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import ChatBot from "./ChatBot";
import Appointments from "./Appointments";
import Resources from "./Resources";
import Forum from "./Forum";
import Profile from "./Profile";
import Analytics from "./Analytics";
import Settings from "./Settings";
import MoodTracker from "./MoodTracker";
import CrisisSupport from "./CrisisSupport";
import MLInsights from "./MLInsights";

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* All routes accessible without login */}
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/crisis" element={<CrisisSupport />} />
          <Route
            path="/students"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold">Students Management</h1>
                <p className="text-gray-600">
                  Manage your assigned students and their progress.
                </p>
              </div>
            }
          />
          <Route path="/analytics" element={<Analytics />} />
          <Route
            path="/users"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold">User Management</h1>
                <p className="text-gray-600">
                  Manage platform users and permissions.
                </p>
              </div>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ml-insights" element={<MLInsights />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
