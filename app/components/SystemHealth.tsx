"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Server,
  Database,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
  Cpu,
  HardDrive,
  Globe,
  Shield,
  RefreshCw,
} from "lucide-react";

interface SystemMetric {
  name: string;
  value: string | number;
  status: "healthy" | "warning" | "error";
  trend: "up" | "down" | "stable";
  icon: any;
  description: string;
}

interface ServiceStatus {
  name: string;
  status: "online" | "offline" | "degraded";
  responseTime: number;
  uptime: string;
  lastCheck: string;
  icon: any;
}

const mockSystemMetrics: SystemMetric[] = [
  {
    name: "CPU Usage",
    value: "23%",
    status: "healthy",
    trend: "stable",
    icon: Cpu,
    description: "Current CPU utilization",
  },
  {
    name: "Memory Usage",
    value: "67%",
    status: "warning",
    trend: "up",
    icon: HardDrive,
    description: "RAM utilization",
  },
  {
    name: "Database Connections",
    value: 45,
    status: "healthy",
    trend: "stable",
    icon: Database,
    description: "Active MongoDB connections",
  },
  {
    name: "SMS Queue",
    value: 12,
    status: "healthy",
    trend: "down",
    icon: Activity,
    description: "Messages in queue",
  },
  {
    name: "API Response Time",
    value: "145ms",
    status: "healthy",
    trend: "stable",
    icon: Zap,
    description: "Average API response time",
  },
  {
    name: "Error Rate",
    value: "0.2%",
    status: "healthy",
    trend: "down",
    icon: AlertTriangle,
    description: "Failed requests percentage",
  },
];

const mockServiceStatus: ServiceStatus[] = [
  {
    name: "Twilio SMS Gateway",
    status: "online",
    responseTime: 120,
    uptime: "99.9%",
    lastCheck: "2 minutes ago",
    icon: Wifi,
  },
  {
    name: "MongoDB Database",
    status: "online",
    responseTime: 45,
    uptime: "99.8%",
    lastCheck: "1 minute ago",
    icon: Database,
  },
  {
    name: "Redis Cache",
    status: "online",
    responseTime: 8,
    uptime: "99.9%",
    lastCheck: "30 seconds ago",
    icon: Server,
  },
  {
    name: "CDN (Static Assets)",
    status: "online",
    responseTime: 25,
    uptime: "99.9%",
    lastCheck: "1 minute ago",
    icon: Globe,
  },
  {
    name: "SSL Certificate",
    status: "online",
    responseTime: 0,
    uptime: "100%",
    lastCheck: "5 minutes ago",
    icon: Shield,
  },
];

const mockRecentAlerts = [
  {
    id: "1",
    type: "warning",
    message: "Memory usage increased to 67%",
    timestamp: "10 minutes ago",
    resolved: false,
  },
  {
    id: "2",
    type: "info",
    message: "Scheduled maintenance completed successfully",
    timestamp: "2 hours ago",
    resolved: true,
  },
  {
    id: "3",
    type: "error",
    message: "Failed to send 3 SMS messages - retrying",
    timestamp: "1 hour ago",
    resolved: true,
  },
];

export default function SystemHealth() {
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "online":
        return "text-green-600";
      case "warning":
      case "degraded":
        return "text-yellow-600";
      case "error":
      case "offline":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "online":
        return "bg-green-100";
      case "warning":
      case "degraded":
        return "bg-yellow-100";
      case "error":
      case "offline":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      case "stable":
        return "→";
      default:
        return "→";
    }
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">System Health</h2>
        <button
          onClick={handleRefresh}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              System Status
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">
                All Systems Operational
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Uptime</span>
              <span className="text-sm font-medium text-gray-800">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Restart</span>
              <span className="text-sm font-medium text-gray-800">
                15 days ago
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Updated</span>
              <span className="text-sm font-medium text-gray-800">
                {lastRefresh.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Performance</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Response Time</span>
              <span className="text-sm font-medium text-gray-800">145ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Requests/min</span>
              <span className="text-sm font-medium text-gray-800">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Error Rate</span>
              <span className="text-sm font-medium text-green-600">0.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">SMS Gateway</h3>
            <Wifi className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span className="text-sm font-medium text-green-600">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Messages Sent</span>
              <span className="text-sm font-medium text-gray-800">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Success Rate</span>
              <span className="text-sm font-medium text-green-600">99.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            System Metrics
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {mockSystemMetrics.map((metric) => (
            <div
              key={metric.name}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
            >
              <div
                className={`p-3 rounded-lg ${getStatusBgColor(metric.status)}`}
              >
                <metric.icon
                  className={`w-6 h-6 ${getStatusColor(metric.status)}`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-800">
                    {metric.name}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {getTrendIcon(metric.trend)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800">
                    {metric.value}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusBgColor(
                      metric.status
                    )} ${getStatusColor(metric.status)}`}
                  >
                    {metric.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Status */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Service Status
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Response Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Check
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockServiceStatus.map((service) => (
                <tr key={service.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <service.icon className="w-5 h-5 text-gray-400 mr-3" />
                      <div className="text-sm font-medium text-gray-900">
                        {service.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          service.status === "online"
                            ? "bg-green-500"
                            : service.status === "degraded"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span
                        className={`text-sm font-medium ${getStatusColor(
                          service.status
                        )}`}
                      >
                        {service.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {service.responseTime}ms
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {service.uptime}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">
                      {service.lastCheck}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Alerts</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockRecentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg"
              >
                <div
                  className={`p-2 rounded-full ${
                    alert.type === "error"
                      ? "bg-red-100"
                      : alert.type === "warning"
                      ? "bg-yellow-100"
                      : "bg-blue-100"
                  }`}
                >
                  {alert.type === "error" ? (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  ) : alert.type === "warning" ? (
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{alert.message}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500">
                      {alert.timestamp}
                    </span>
                    {alert.resolved && (
                      <span className="text-xs text-green-600 font-medium">
                        Resolved
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
