"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Plus,
  Phone,
  Mail,
  Heart,
  Gift,
  Cake,
  Star,
  ChevronRight,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Activity,
  Type,
  Download,
  Menu,
} from "lucide-react";
import CardPreview from "./components/CardPreview";
import TemplateEditor from "./components/TemplateEditor";
import ContactImport from "./components/ContactImport";
import BulkScheduler from "./components/BulkScheduler";
import MessageLogs from "./components/MessageLogs";
import RecurringCampaigns from "./components/RecurringCampaigns";
import SystemHealth from "./components/SystemHealth";
import NotificationCenter from "./components/NotificationCenter";
import MergeFieldEditor from "./components/MergeFieldEditor";
import SMSFormatter from "./components/SMSFormatter";
import ContactExport from "./components/ContactExport";

// Mock data for demonstration
const mockTemplates = [
  {
    id: 1,
    name: "Birthday Celebration",
    category: "birthday",
    preview: "🎂 Happy Birthday!",
    color: "bg-pink-500",
  },
  {
    id: 2,
    name: "Anniversary Love",
    category: "anniversary",
    preview: "💕 Happy Anniversary!",
    color: "bg-red-500",
  },
  {
    id: 3,
    name: "Get Well Soon",
    category: "get-well",
    preview: "🏥 Get Well Soon!",
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "Congratulations",
    category: "congratulations",
    preview: "🎉 Congratulations!",
    color: "bg-yellow-500",
  },
  {
    id: 5,
    name: "Thank You",
    category: "thank-you",
    preview: "🙏 Thank You!",
    color: "bg-blue-500",
  },
  {
    id: 6,
    name: "Holiday Greetings",
    category: "holiday",
    preview: "🎄 Happy Holidays!",
    color: "bg-purple-500",
  },
];

const mockContacts = [
  {
    id: 1,
    name: "Sarah Cohen",
    phone: "+1-555-0123",
    group: "Family",
    lastContact: "2024-01-15",
  },
  {
    id: 2,
    name: "David Levy",
    phone: "+1-555-0124",
    group: "Synagogue",
    lastContact: "2024-01-10",
  },
  {
    id: 3,
    name: "Rachel Green",
    phone: "+1-555-0125",
    group: "Friends",
    lastContact: "2024-01-08",
  },
  {
    id: 4,
    name: "Michael Brown",
    phone: "+1-555-0126",
    group: "Work",
    lastContact: "2024-01-12",
  },
];

const mockScheduledMessages = [
  {
    id: 1,
    recipient: "Sarah Cohen",
    template: "Birthday Celebration",
    scheduledFor: "2024-02-15",
    status: "scheduled",
  },
  {
    id: 2,
    recipient: "David Levy",
    template: "Anniversary Love",
    scheduledFor: "2024-02-20",
    status: "sent",
  },
  {
    id: 3,
    recipient: "Rachel Green",
    template: "Get Well Soon",
    scheduledFor: "2024-02-18",
    status: "scheduled",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSMSFlow, setShowSMSFlow] = useState(false);
  const [smsStep, setSmsStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [recipientInfo, setRecipientInfo] = useState({
    name: "",
    phone: "",
    message: "",
  });

  // New component states
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [showContactImport, setShowContactImport] = useState(false);
  const [showBulkScheduler, setShowBulkScheduler] = useState(false);
  const [showCardPreview, setShowCardPreview] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSMSFlow = () => {
    setShowSMSFlow(true);
    setSmsStep(1);
  };

  const nextSMSStep = () => {
    if (smsStep < 5) {
      setSmsStep(smsStep + 1);
    } else {
      setShowSMSFlow(false);
      setSmsStep(1);
    }
  };

  const renderSMSFlow = () => {
    const steps = [
      {
        title: "Keyword Recognition",
        content: (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Incoming SMS:</p>
              <p className="font-medium">"birthday"</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-600">System Response:</p>
              <p className="font-medium">
                "🎂 Great! Here are our birthday card options:
              </p>
              <div className="mt-2 space-y-1">
                <p>1. Birthday Celebration</p>
                <p>2. Sweet Birthday</p>
                <p>3. Party Birthday</p>
                <p>Reply with your choice (1-3)"</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Template Selection",
        content: (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">User Response:</p>
              <p className="font-medium">"1"</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-600">System Response:</p>
              <p className="font-medium">
                "Perfect! You chose Birthday Celebration. Please reply with the
                recipient's name."
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mockTemplates.slice(0, 3).map((template) => (
                <div
                  key={template.id}
                  className={`${template.color} p-3 rounded-lg text-white text-center text-sm`}
                >
                  {template.name}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        title: "Recipient Details",
        content: (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">User Response:</p>
              <p className="font-medium">"Sarah Cohen"</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-600">System Response:</p>
              <p className="font-medium">
                "Thanks! Now please reply with your custom message (or just send
                'default' for our standard message)."
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <p className="text-sm text-gray-600">
                Recipient: <span className="font-medium">Sarah Cohen</span>
              </p>
              <p className="text-sm text-gray-600">
                Template:{" "}
                <span className="font-medium">Birthday Celebration</span>
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Custom Message",
        content: (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">User Response:</p>
              <p className="font-medium">
                "Happy Birthday Sarah! Hope you have an amazing day filled with
                joy and love! 🎂"
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-600">System Response:</p>
              <p className="font-medium">
                "Perfect! When would you like to send this card? Reply with:
              </p>
              <div className="mt-2 space-y-1">
                <p>• 'now' to send immediately</p>
                <p>• 'tomorrow' for tomorrow</p>
                <p>• or a specific date (MM/DD)"</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Recipient: <span className="font-medium">Sarah Cohen</span>
                </p>
                <p className="text-sm text-gray-600">
                  Template:{" "}
                  <span className="font-medium">Birthday Celebration</span>
                </p>
                <p className="text-sm text-gray-600">
                  Message:{" "}
                  <span className="font-medium">
                    "Happy Birthday Sarah! Hope you have an amazing day filled
                    with joy and love! 🎂"
                  </span>
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Confirmation & Send",
        content: (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">User Response:</p>
              <p className="font-medium">"now"</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-green-600">System Response:</p>
              <p className="font-medium">
                "🎉 Your birthday card has been sent to Sarah Cohen!
              </p>
              <p className="text-sm mt-2">
                View the full card online: bit.ly/sulemait-abc123
              </p>
              <p className="text-sm">
                Thank you for using Sulemait SMS Greetings!"
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-600">
                    ✓ Card Sent Successfully
                  </p>
                  <p className="text-sm text-gray-600">
                    Recipient: Sarah Cohen
                  </p>
                  <p className="text-sm text-gray-600">
                    Link: bit.ly/sulemait-abc123
                  </p>
                </div>
                <CheckCircle className="text-green-500 w-8 h-8" />
              </div>
            </div>
          </div>
        ),
      },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 modal-backdrop flex items-center justify-center p-4 z-50"
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 sm:p-6 max-w-2xl w-full mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              SMS Flow Simulation
            </h2>
            <button
              onClick={() => setShowSMSFlow(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-4 overflow-x-auto">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0 ${
                      step <= smsStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 5 && (
                    <div
                      className={`w-8 sm:w-12 h-1 mx-1 sm:mx-2 flex-shrink-0 ${
                        step < smsStep ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {steps[smsStep - 1].title}
            </h3>
            {steps[smsStep - 1].content}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowSMSFlow(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={nextSMSStep}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
            >
              <span>{smsStep === 5 ? "Finish" : "Next"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/95 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Messages</p>
              <p className="text-2xl font-bold text-gray-800">1,247</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <span>+12%</span>
            <span className="ml-1">from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/95 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Contacts</p>
              <p className="text-2xl font-bold text-gray-800">342</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <span>+8%</span>
            <span className="ml-1">from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/95 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-800">23</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-blue-600">
            <span>Next: 2 hours</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/95 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Templates</p>
              <p className="text-2xl font-bold text-gray-800">18</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Gift className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-purple-600">
            <span>6 categories</span>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/95 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={handleSMSFlow}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="bg-blue-100 p-2 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Test SMS Flow</p>
              <p className="text-sm text-gray-600">Simulate user experience</p>
            </div>
          </button>

          <button
            onClick={() => setShowTemplateEditor(true)}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="bg-green-100 p-2 rounded-lg">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">New Template</p>
              <p className="text-sm text-gray-600">Create custom design</p>
            </div>
          </button>

          <button
            onClick={() => setShowContactImport(true)}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="bg-purple-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Import Contacts</p>
              <p className="text-sm text-gray-600">Add from CSV/Excel</p>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/95 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Messages
          </h3>
          <div className="space-y-3">
            {mockScheduledMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {message.recipient}
                  </p>
                  <p className="text-sm text-gray-600">{message.template}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      message.status === "sent"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {message.status === "sent" ? "Sent" : "Scheduled"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {message.scheduledFor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/95 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Popular Templates
          </h3>
          <div className="space-y-3">
            {mockTemplates.slice(0, 4).map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full ${template.color}`}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-800">{template.name}</p>
                    <p className="text-sm text-gray-600">{template.preview}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">156</p>
                  <p className="text-sm text-gray-600">uses</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Card Templates</h2>
        <button
          onClick={() => setShowTemplateEditor(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div
              className={`h-32 ${template.color} flex items-center justify-center`}
            >
              <span className="text-white text-2xl">{template.preview}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{template.preview}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {template.category}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowCardPreview(true)}
                    className="text-green-500 hover:text-green-700 text-sm"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => {
                      setEditingTemplate(template);
                      setShowTemplateEditor(true);
                    }}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Contact Management</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowContactImport(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Import Contacts</span>
          </button>
          <button
            onClick={() => setActiveTab("contact-export")}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Contacts</span>
          </button>
          <button
            onClick={() => setShowBulkScheduler(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Bulk Schedule</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search contacts..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Groups</option>
              <option>Family</option>
              <option>Synagogue</option>
              <option>Friends</option>
              <option>Work</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {contact.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {contact.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contact.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {contact.group}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contact.lastContact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
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

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Analytics & Reports</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Message Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Birthday Cards</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Anniversary Cards</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium">60%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Get Well Cards</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium">45%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Birthday card sent to Sarah Cohen
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  New template "Holiday Greetings" added
                </p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  15 contacts imported from CSV
                </p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            SMS Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twilio Phone Number
              </label>
              <input
                type="text"
                value="+1-555-123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL
              </label>
              <input
                type="text"
                value="https://api.sulemait.com/webhook/sms"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Timezone
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>America/New_York</option>
                <option>America/Los_Angeles</option>
                <option>Europe/London</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Notification Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Email Notifications
                </p>
                <p className="text-xs text-gray-500">
                  Receive alerts for failed sends
                </p>
              </div>
              <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">SMS Alerts</p>
                <p className="text-xs text-gray-500">
                  Get notified of system issues
                </p>
              </div>
              <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Daily Reports
                </p>
                <p className="text-xs text-gray-500">
                  Summary of daily activity
                </p>
              </div>
              <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-200/50 relative z-[9999]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg lg:text-xl font-bold text-gray-800">
                  Sulemait
                </span>
              </div>
              <span className="hidden sm:block text-sm text-gray-500">
                SMS Greetings Platform
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              <NotificationCenter />
              <button className="text-gray-500 hover:text-gray-700">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0">
          {/* Sidebar */}
          <nav
            className={`w-full lg:w-64 flex-shrink-0 ${
              showMobileMenu ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-4">
              <div className="flex lg:flex-col lg:space-y-2 space-x-2 lg:space-x-0 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {[
                  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                  { id: "templates", label: "Templates", icon: Gift },
                  { id: "merge-fields", label: "Merge Fields", icon: Type },
                  { id: "contacts", label: "Contacts", icon: Users },
                  { id: "campaigns", label: "Campaigns", icon: Send },
                  { id: "logs", label: "Message Logs", icon: MessageSquare },
                  {
                    id: "sms-formatter",
                    label: "SMS Formatter",
                    icon: MessageSquare,
                  },
                  { id: "analytics", label: "Analytics", icon: BarChart3 },
                  { id: "health", label: "System Health", icon: Activity },
                  { id: "settings", label: "Settings", icon: Settings },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex-shrink-0 lg:w-full flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-left transition-colors text-sm lg:text-base ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 w-full">
            <AnimatePresence mode="wait">
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderDashboard()}
                </motion.div>
              )}

              {activeTab === "templates" && (
                <motion.div
                  key="templates"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTemplates()}
                </motion.div>
              )}

              {activeTab === "merge-fields" && (
                <motion.div
                  key="merge-fields"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <MergeFieldEditor />
                </motion.div>
              )}

              {activeTab === "contacts" && (
                <motion.div
                  key="contacts"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderContacts()}
                </motion.div>
              )}

              {activeTab === "contact-export" && (
                <motion.div
                  key="contact-export"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ContactExport />
                </motion.div>
              )}

              {activeTab === "analytics" && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderAnalytics()}
                </motion.div>
              )}

              {activeTab === "campaigns" && (
                <motion.div
                  key="campaigns"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <RecurringCampaigns />
                </motion.div>
              )}

              {activeTab === "logs" && (
                <motion.div
                  key="logs"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageLogs />
                </motion.div>
              )}

              {activeTab === "sms-formatter" && (
                <motion.div
                  key="sms-formatter"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <SMSFormatter />
                </motion.div>
              )}

              {activeTab === "health" && (
                <motion.div
                  key="health"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <SystemHealth />
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderSettings()}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* SMS Flow Modal */}
      <AnimatePresence>{showSMSFlow && renderSMSFlow()}</AnimatePresence>

      {/* Template Editor Modal */}
      <AnimatePresence>
        {showTemplateEditor && (
          <TemplateEditor
            onClose={() => {
              setShowTemplateEditor(false);
              setEditingTemplate(null);
            }}
            template={editingTemplate}
          />
        )}
      </AnimatePresence>

      {/* Contact Import Modal */}
      <AnimatePresence>
        {showContactImport && (
          <ContactImport onClose={() => setShowContactImport(false)} />
        )}
      </AnimatePresence>

      {/* Bulk Scheduler Modal */}
      <AnimatePresence>
        {showBulkScheduler && (
          <BulkScheduler onClose={() => setShowBulkScheduler(false)} />
        )}
      </AnimatePresence>

      {/* Card Preview Modal */}
      <AnimatePresence>
        {showCardPreview && (
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
                  Card Preview
                </h2>
                <button
                  onClick={() => setShowCardPreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <CardPreview
                template={mockTemplates[0]}
                recipientName="Sarah Cohen"
                customMessage="Happy Birthday Sarah! Hope you have an amazing day filled with joy and love! 🎂"
                senderName="Your Friends at Sulemait"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
