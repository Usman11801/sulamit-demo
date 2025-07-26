"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Filter,
  Search,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";

interface MessageLog {
  id: string;
  recipient: string;
  phone: string;
  template: string;
  message: string;
  sentAt: string;
  status: "delivered" | "failed" | "pending" | "read";
  deliveryTime?: string;
  readTime?: string;
  shortLink: string;
  clicks: number;
}

const mockMessageLogs: MessageLog[] = [
  {
    id: "1",
    recipient: "Sarah Cohen",
    phone: "+1-555-0123",
    template: "Birthday Celebration",
    message: "Happy Birthday Sarah! Hope you have an amazing day! 🎂",
    sentAt: "2024-02-15 10:30:00",
    status: "read",
    deliveryTime: "2024-02-15 10:30:05",
    readTime: "2024-02-15 10:35:22",
    shortLink: "bit.ly/sulemait-abc123",
    clicks: 3,
  },
  {
    id: "2",
    recipient: "David Levy",
    phone: "+1-555-0124",
    template: "Anniversary Love",
    message: "Happy Anniversary! Wishing you many more years of love! 💕",
    sentAt: "2024-02-15 09:15:00",
    status: "delivered",
    deliveryTime: "2024-02-15 09:15:03",
    shortLink: "bit.ly/sulemait-def456",
    clicks: 1,
  },
  {
    id: "3",
    recipient: "Rachel Green",
    phone: "+1-555-0125",
    template: "Get Well Soon",
    message: "Get well soon! Sending you healing thoughts! 🏥",
    sentAt: "2024-02-15 08:45:00",
    status: "failed",
    shortLink: "bit.ly/sulemait-ghi789",
    clicks: 0,
  },
  {
    id: "4",
    recipient: "Michael Brown",
    phone: "+1-555-0126",
    template: "Congratulations",
    message: "Congratulations on your achievement! 🎉",
    sentAt: "2024-02-14 16:20:00",
    status: "delivered",
    deliveryTime: "2024-02-14 16:20:02",
    shortLink: "bit.ly/sulemait-jkl012",
    clicks: 2,
  },
  {
    id: "5",
    recipient: "Lisa Wilson",
    phone: "+1-555-0127",
    template: "Thank You",
    message: "Thank you for everything! 🙏",
    sentAt: "2024-02-14 14:10:00",
    status: "pending",
    shortLink: "bit.ly/sulemait-mno345",
    clicks: 0,
  },
];

export default function MessageLogs() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "read":
        return <Eye className="w-4 h-4 text-blue-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "read":
        return "bg-blue-100 text-blue-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredLogs = mockMessageLogs.filter((log) => {
    const matchesStatus =
      selectedStatus === "all" || log.status === selectedStatus;
    const matchesSearch =
      log.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.template.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: mockMessageLogs.length,
    delivered: mockMessageLogs.filter((log) => log.status === "delivered")
      .length,
    read: mockMessageLogs.filter((log) => log.status === "read").length,
    failed: mockMessageLogs.filter((log) => log.status === "failed").length,
    pending: mockMessageLogs.filter((log) => log.status === "pending").length,
    totalClicks: mockMessageLogs.reduce((sum, log) => sum + log.clicks, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Message Logs</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Logs</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Sent</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {stats.delivered}
          </div>
          <div className="text-sm text-gray-600">Delivered</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{stats.read}</div>
          <div className="text-sm text-gray-600">Read</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
          <div className="text-sm text-gray-600">Failed</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">
            {stats.totalClicks}
          </div>
          <div className="text-sm text-gray-600">Total Clicks</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipients or templates..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="read">Read</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Message Logs Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Template
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sent At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {log.recipient.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {log.recipient}
                        </div>
                        <div className="text-sm text-gray-500">{log.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {log.template}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {log.message}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(log.sentAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(log.sentAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(log.status)}
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          log.status
                        )}`}
                      >
                        {log.status}
                      </span>
                    </div>
                    {log.deliveryTime && (
                      <div className="text-xs text-gray-500 mt-1">
                        Delivered:{" "}
                        {new Date(log.deliveryTime).toLocaleTimeString()}
                      </div>
                    )}
                    {log.readTime && (
                      <div className="text-xs text-gray-500">
                        Read: {new Date(log.readTime).toLocaleTimeString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {log.clicks} clicks
                    </div>
                    <div className="text-xs text-gray-500">{log.shortLink}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Resend
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
