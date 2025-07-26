"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  Settings,
  Trash2,
} from "lucide-react";

interface Notification {
  id: string;
  type: "success" | "warning" | "error" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Campaign Completed",
    message:
      "Monthly Yahrzeit Reminders campaign has been sent successfully to 45 recipients.",
    timestamp: "2 minutes ago",
    read: false,
    action: {
      label: "View Details",
      onClick: () => console.log("View campaign details"),
    },
  },
  {
    id: "2",
    type: "warning",
    title: "High Memory Usage",
    message:
      "System memory usage has increased to 67%. Consider optimizing or scaling up.",
    timestamp: "10 minutes ago",
    read: false,
    action: {
      label: "Check System",
      onClick: () => console.log("Check system health"),
    },
  },
  {
    id: "3",
    type: "error",
    title: "SMS Delivery Failed",
    message: "Failed to deliver 3 SMS messages. Retrying automatically.",
    timestamp: "1 hour ago",
    read: true,
    action: {
      label: "View Logs",
      onClick: () => console.log("View message logs"),
    },
  },
  {
    id: "4",
    type: "info",
    title: "New Template Available",
    message:
      "A new 'Holiday Greetings' template has been added to your library.",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "success",
    title: "Contact Import Complete",
    message: "Successfully imported 25 contacts from CSV file.",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "info",
    title: "System Maintenance",
    message:
      "Scheduled maintenance completed successfully. All systems are operational.",
    timestamp: "1 day ago",
    read: true,
  },
];

export default function NotificationCenter() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.read;
    if (filter === "read") return notification.read;
    return true;
  });

  return (
    <div className="relative z-[9999]">
      {/* Notification Bell */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors z-10"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="fixed top-20 right-2 sm:right-4 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-[99999] max-h-[80vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Notifications
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Mark all read
                </button>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-1 p-3 border-b border-gray-200">
              {[
                { key: "all", label: "All", count: notifications.length },
                { key: "unread", label: "Unread", count: unreadCount },
                {
                  key: "read",
                  label: "Read",
                  count: notifications.filter((n) => n.read).length,
                },
              ].map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key as any)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === filterOption.key
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {filterOption.label} ({filterOption.count})
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 ${getNotificationBgColor(
                        notification.type
                      )} ${
                        !notification.read ? "border-l-4 border-blue-500" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">
                                {notification.timestamp}
                              </span>
                              <button
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                className="text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          {notification.action && (
                            <button
                              onClick={() => {
                                notification.action?.onClick();
                                markAsRead(notification.id);
                              }}
                              className="text-sm text-blue-600 hover:text-blue-700 mt-2"
                            >
                              {notification.action.label}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {unreadCount} unread notifications
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
