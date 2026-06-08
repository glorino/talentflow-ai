"use client";

import { useState } from "react";
import {
  Building2,
  Save,
  Upload,
  Globe,
  Mail,
  Phone,
  MapPin,
  Users,
  Calendar,
  Shield,
  Bell,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "notifications" | "security" | "billing">("general");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Company Settings</h1>
        <p className="text-muted-foreground">Manage your company profile and preferences</p>
      </div>

      <div className="flex items-center gap-1 rounded-lg border bg-muted p-1 w-fit">
        {(["general", "notifications", "security", "billing"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "general" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="card-enterprise p-6">
              <h2 className="mb-4 font-semibold flex items-center gap-2">
                <Building2 size={16} className="text-primary" />
                Company Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Company Name</label>
                  <input
                    type="text"
                    defaultValue="TalentFlow Inc."
                    className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Industry</label>
                  <input
                    type="text"
                    defaultValue="Technology"
                    className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Website</label>
                  <input
                    type="url"
                    defaultValue="https://talentflow.ai"
                    className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue="hr@talentflow.ai"
                    className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 000-0000"
                    className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Company Size</label>
                  <select className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>1-50</option>
                    <option>51-200</option>
                    <option>201-1000</option>
                    <option selected>1000+</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <input
                    type="text"
                    defaultValue="123 Innovation Drive, New York, NY 10001"
                    className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>

            <div className="card-enterprise p-6">
              <h2 className="mb-4 font-semibold flex items-center gap-2">
                <Palette size={16} className="text-primary" />
                Branding
              </h2>
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed bg-muted">
                  <Upload size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Company Logo</p>
                  <p className="text-sm text-muted-foreground">SVG, PNG, or JPG (max 2MB)</p>
                  <button className="mt-2 text-sm font-medium text-primary hover:underline">
                    Upload Logo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-enterprise p-5">
              <h3 className="mb-4 font-semibold">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Employees</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Departments</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Locations</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Plan</span>
                  <span className="badge badge-info">Enterprise</span>
                </div>
              </div>
            </div>

            <div className="card-enterprise p-5">
              <h3 className="mb-4 font-semibold">Working Hours</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Timezone</span>
                  <span className="font-medium">EST (UTC-5)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Work Week</span>
                  <span className="font-medium">Mon - Fri</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Hours/Day</span>
                  <span className="font-medium">8 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Break</span>
                  <span className="font-medium">1 hour</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="card-enterprise p-6">
          <h2 className="mb-6 font-semibold flex items-center gap-2">
            <Bell size={16} className="text-primary" />
            Notification Preferences
          </h2>
          <div className="space-y-4">
            {[
              { label: "Email notifications for new leave requests", defaultChecked: true },
              { label: "Email notifications for payroll processing", defaultChecked: true },
              { label: "Push notifications for urgent approvals", defaultChecked: true },
              { label: "Weekly attendance summary report", defaultChecked: false },
              { label: "Monthly payroll summary report", defaultChecked: true },
              { label: "AI insights digest (daily)", defaultChecked: true },
            ].map((item) => (
              <label key={item.label} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 cursor-pointer">
                <span className="text-sm font-medium">{item.label}</span>
                <input
                  type="checkbox"
                  defaultChecked={item.defaultChecked}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="card-enterprise p-6">
          <h2 className="mb-6 font-semibold flex items-center gap-2">
            <Shield size={16} className="text-primary" />
            Security Settings
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground mb-3">Add an extra layer of security to your account</p>
              <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
                Enable 2FA
              </button>
            </div>
            <div className="border-t pt-6">
              <h3 className="font-medium mb-2">Session Management</h3>
              <p className="text-sm text-muted-foreground mb-3">Manage active sessions and devices</p>
              <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
                View Active Sessions
              </button>
            </div>
            <div className="border-t pt-6">
              <h3 className="font-medium mb-2">API Keys</h3>
              <p className="text-sm text-muted-foreground mb-3">Manage API keys for integrations</p>
              <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
                Manage API Keys
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "billing" && (
        <div className="card-enterprise p-6">
          <h2 className="mb-6 font-semibold">Billing & Subscription</h2>
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Enterprise Plan</h3>
                <p className="text-muted-foreground">Full access to all features</p>
              </div>
              <span className="badge badge-info text-sm">Active</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Cost</p>
                <p className="text-2xl font-bold">$4,999</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Per Employee</p>
                <p className="text-2xl font-bold">$4</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Billing</p>
                <p className="text-2xl font-bold">Jul 1</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
