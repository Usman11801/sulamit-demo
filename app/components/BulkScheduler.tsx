"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Send, X, Plus, Trash2 } from "lucide-react";

interface BulkSchedulerProps {
  onClose: () => void;
}

interface ScheduledMessage {
  id: string;
  recipient: string;
  template: string;
  message: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "pending" | "scheduled" | "sent";
}

export default function BulkScheduler({ onClose }: BulkSchedulerProps) {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState("");
  const [scheduledMessages, setScheduledMessages] = useState<
    ScheduledMessage[]
  >([]);
  const [scheduleType, setScheduleType] = useState<
    "immediate" | "specific" | "recurring"
  >("specific");

  const mockTemplates = [
    {
      id: "birthday",
      name: "Birthday Celebration",
      preview: "🎂 Happy Birthday!",
    },
    {
      id: "anniversary",
      name: "Anniversary Love",
      preview: "💕 Happy Anniversary!",
    },
    { id: "get-well", name: "Get Well Soon", preview: "🏥 Get Well Soon!" },
    {
      id: "congratulations",
      name: "Congratulations",
      preview: "🎉 Congratulations!",
    },
  ];

  const mockContacts = [
    { id: "1", name: "Sarah Cohen", phone: "+1-555-0123", group: "Family" },
    { id: "2", name: "David Levy", phone: "+1-555-0124", group: "Synagogue" },
    { id: "3", name: "Rachel Green", phone: "+1-555-0125", group: "Friends" },
    { id: "4", name: "Michael Brown", phone: "+1-555-0126", group: "Work" },
    { id: "5", name: "Lisa Wilson", phone: "+1-555-0127", group: "Family" },
  ];

  const handleContactToggle = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSchedule = () => {
    const newMessages: ScheduledMessage[] = selectedContacts.map(
      (contactId) => {
        const contact = mockContacts.find((c) => c.id === contactId);
        const template = mockTemplates.find((t) => t.id === selectedTemplate);

        return {
          id: Math.random().toString(36).substr(2, 9),
          recipient: contact?.name || "",
          template: template?.name || "",
          message: customMessage,
          scheduledDate: "2024-02-15",
          scheduledTime: "10:00",
          status: "scheduled" as const,
        };
      }
    );

    setScheduledMessages(newMessages);
    setStep(3);
  };

  const renderStep1 = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Select Template
        </h3>
        <p className="text-gray-600">
          Choose a template for your bulk messages
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {mockTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`p-4 border rounded-lg text-left transition-colors ${
              selectedTemplate === template.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">{template.name}</h4>
              {selectedTemplate === template.id && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">{template.preview}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setStep(2)}
          disabled={!selectedTemplate}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Select Recipients
        </h3>
        <p className="text-gray-600">Choose who will receive your messages</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">
            Selected: {selectedContacts.length} contacts
          </span>
          <button
            onClick={() => setSelectedContacts(mockContacts.map((c) => c.id))}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Select All
          </button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {mockContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selectedContacts.includes(contact.id)}
                onChange={() => handleContactToggle(contact.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{contact.name}</p>
                <p className="text-sm text-gray-600">
                  {contact.phone} • {contact.group}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Message (Optional)
        </label>
        <textarea
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a custom message to override the template default..."
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={selectedContacts.length === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Schedule Messages
        </h3>
        <p className="text-gray-600">Choose when to send your messages</p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setScheduleType("immediate")}
            className={`p-4 border rounded-lg text-center transition-colors ${
              scheduleType === "immediate"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Send className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <p className="font-medium text-gray-800">Send Now</p>
            <p className="text-sm text-gray-600">Immediate delivery</p>
          </button>

          <button
            onClick={() => setScheduleType("specific")}
            className={`p-4 border rounded-lg text-center transition-colors ${
              scheduleType === "specific"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Calendar className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <p className="font-medium text-gray-800">Specific Date</p>
            <p className="text-sm text-gray-600">Choose date & time</p>
          </button>

          <button
            onClick={() => setScheduleType("recurring")}
            className={`p-4 border rounded-lg text-center transition-colors ${
              scheduleType === "recurring"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Clock className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <p className="font-medium text-gray-800">Recurring</p>
            <p className="text-sm text-gray-600">Set up recurring</p>
          </button>
        </div>

        {scheduleType === "specific" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                defaultValue="2024-02-15"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                defaultValue="10:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {scheduleType === "recurring" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  defaultValue="2024-02-15"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-800 mb-3">Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Template:</span>
            <span className="font-medium">
              {mockTemplates.find((t) => t.id === selectedTemplate)?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Recipients:</span>
            <span className="font-medium">
              {selectedContacts.length} contacts
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Schedule:</span>
            <span className="font-medium">
              {scheduleType === "immediate"
                ? "Send Now"
                : scheduleType === "specific"
                ? "Feb 15, 2024 at 10:00 AM"
                : "Recurring"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(2)}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleSchedule}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Schedule Messages</span>
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Messages Scheduled!
        </h3>
        <p className="text-gray-600">
          Your bulk messages have been scheduled successfully
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-800">
              {scheduledMessages.length}
            </div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {scheduleType}
            </div>
            <div className="text-sm text-gray-600">Type</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">Ready</div>
            <div className="text-sm text-gray-600">Status</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
        <h4 className="font-medium text-gray-800 mb-3">Scheduled Messages</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {scheduledMessages.map((message) => (
            <div
              key={message.id}
              className="flex items-center justify-between p-2 bg-white rounded border"
            >
              <div>
                <p className="font-medium text-gray-800">{message.recipient}</p>
                <p className="text-sm text-gray-600">{message.template}</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                Scheduled
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onClose}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Done
      </button>
    </div>
  );

  return (
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
        className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 sm:p-6 max-w-2xl w-full mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Bulk Message Scheduler
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNumber <= step
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      stepNumber < step ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </motion.div>
    </motion.div>
  );
}
