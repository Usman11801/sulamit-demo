"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Settings,
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  Bell,
  Repeat,
  Target,
} from "lucide-react";

interface RecurringCampaign {
  id: string;
  name: string;
  description: string;
  template: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly" | "custom";
  nextRun: string;
  status: "active" | "paused" | "draft";
  recipients: number;
  totalSent: number;
  lastSent?: string;
  customSchedule?: string;
  conditions?: string[];
}

const mockRecurringCampaigns: RecurringCampaign[] = [
  {
    id: "1",
    name: "Monthly Yahrzeit Reminders",
    description:
      "Send yahrzeit reminders to family members on the Hebrew calendar",
    template: "Yahrzeit Reminder",
    frequency: "monthly",
    nextRun: "2024-03-15 09:00:00",
    status: "active",
    recipients: 45,
    totalSent: 180,
    lastSent: "2024-02-15 09:00:00",
    conditions: ["Hebrew calendar dates", "Family group only"],
  },
  {
    id: "2",
    name: "Weekly Torah Study Reminders",
    description: "Remind synagogue members about weekly Torah study sessions",
    template: "Torah Study Reminder",
    frequency: "weekly",
    nextRun: "2024-02-18 10:00:00",
    status: "active",
    recipients: 120,
    totalSent: 480,
    lastSent: "2024-02-11 10:00:00",
    conditions: ["Synagogue members", "Sundays only"],
  },
  {
    id: "3",
    name: "Birthday Wishes",
    description: "Automated birthday greetings for all contacts",
    template: "Birthday Celebration",
    frequency: "daily",
    nextRun: "2024-02-16 08:00:00",
    status: "active",
    recipients: 342,
    totalSent: 1247,
    lastSent: "2024-02-15 08:00:00",
  },
  {
    id: "4",
    name: "Holiday Greetings",
    description: "Send holiday greetings for Jewish holidays",
    template: "Holiday Greetings",
    frequency: "yearly",
    nextRun: "2024-09-15 12:00:00",
    status: "paused",
    recipients: 200,
    totalSent: 0,
    conditions: ["Jewish holidays", "All contacts"],
  },
  {
    id: "5",
    name: "Custom Anniversary Campaign",
    description: "Special anniversary campaign for specific dates",
    template: "Anniversary Love",
    frequency: "custom",
    nextRun: "2024-06-15 14:00:00",
    status: "draft",
    recipients: 25,
    totalSent: 0,
    customSchedule: "Every June 15th at 2 PM",
    conditions: ["Specific anniversary dates", "Married couples only"],
  },
];

export default function RecurringCampaigns() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] =
    useState<RecurringCampaign | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "paused":
        return "bg-yellow-100 text-yellow-700";
      case "draft":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return <Calendar className="w-4 h-4" />;
      case "weekly":
        return <Clock className="w-4 h-4" />;
      case "monthly":
        return <Calendar className="w-4 h-4" />;
      case "yearly":
        return <Calendar className="w-4 h-4" />;
      case "custom":
        return <Settings className="w-4 h-4" />;
      default:
        return <Repeat className="w-4 h-4" />;
    }
  };

  const handleToggleStatus = (campaign: RecurringCampaign) => {
    // Toggle between active and paused
    console.log(`Toggling status for campaign: ${campaign.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Recurring Campaigns
        </h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-800">
                {
                  mockRecurringCampaigns.filter((c) => c.status === "active")
                    .length
                }
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Play className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Recipients</p>
              <p className="text-2xl font-bold text-gray-800">
                {mockRecurringCampaigns.reduce(
                  (sum, c) => sum + c.recipients,
                  0
                )}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Messages Sent</p>
              <p className="text-2xl font-bold text-gray-800">
                {mockRecurringCampaigns.reduce(
                  (sum, c) => sum + c.totalSent,
                  0
                )}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Scheduled</p>
              <p className="text-2xl font-bold text-gray-800">
                {
                  mockRecurringCampaigns.filter((c) => c.status === "active")
                    .length
                }
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRecurringCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {campaign.description}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Template: {campaign.template}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getFrequencyIcon(campaign.frequency)}
                      <div>
                        <div className="text-sm font-medium text-gray-900 capitalize">
                          {campaign.frequency}
                        </div>
                        <div className="text-sm text-gray-500">
                          Next:{" "}
                          {new Date(campaign.nextRun).toLocaleDateString()}
                        </div>
                        {campaign.customSchedule && (
                          <div className="text-xs text-gray-400">
                            {campaign.customSchedule}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {campaign.recipients.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">recipients</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {campaign.totalSent.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">messages sent</div>
                    {campaign.lastSent && (
                      <div className="text-xs text-gray-400">
                        Last: {new Date(campaign.lastSent).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleStatus(campaign)}
                        className={`${
                          campaign.status === "active"
                            ? "text-yellow-600 hover:text-yellow-900"
                            : "text-green-600 hover:text-green-900"
                        }`}
                      >
                        {campaign.status === "active" ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => setSelectedCampaign(campaign)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conditions Summary */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Campaign Conditions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockRecurringCampaigns
            .filter((c) => c.conditions)
            .map((campaign) => (
              <div
                key={campaign.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h4 className="font-medium text-gray-800 mb-2">
                  {campaign.name}
                </h4>
                <div className="space-y-1">
                  {campaign.conditions?.map((condition, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm text-gray-600"
                    >
                      <Target className="w-3 h-3" />
                      <span>{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Create Campaign Modal Placeholder */}
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 modal-backdrop flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Create Recurring Campaign
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Monthly Yahrzeit Reminders"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe what this campaign does..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Template</option>
                    <option>Birthday Celebration</option>
                    <option>Yahrzeit Reminder</option>
                    <option>Holiday Greetings</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Create Campaign
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
