"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Users,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

interface ContactImportProps {
  onClose: () => void;
}

interface Contact {
  name: string;
  phone: string;
  email?: string;
  group?: string;
  notes?: string;
}

export default function ContactImport({ onClose }: ContactImportProps) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [mapping, setMapping] = useState({
    name: "",
    phone: "",
    email: "",
    group: "",
    notes: "",
  });
  const [importResults, setImportResults] = useState({
    total: 0,
    success: 0,
    errors: 0,
    errorsList: [] as string[],
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // Simulate parsing CSV
      const mockContacts: Contact[] = [
        {
          name: "Sarah Cohen",
          phone: "+1-555-0123",
          email: "sarah@example.com",
          group: "Family",
        },
        {
          name: "David Levy",
          phone: "+1-555-0124",
          email: "david@example.com",
          group: "Synagogue",
        },
        {
          name: "Rachel Green",
          phone: "+1-555-0125",
          email: "rachel@example.com",
          group: "Friends",
        },
        {
          name: "Michael Brown",
          phone: "+1-555-0126",
          email: "michael@example.com",
          group: "Work",
        },
        {
          name: "Lisa Wilson",
          phone: "+1-555-0127",
          email: "lisa@example.com",
          group: "Family",
        },
      ];
      setContacts(mockContacts);
      setStep(2);
    }
  };

  const handleMappingChange = (field: string, value: string) => {
    setMapping((prev) => ({ ...prev, [field]: value }));
  };

  const handleImport = () => {
    // Simulate import process
    const results = {
      total: contacts.length,
      success: Math.floor(contacts.length * 0.8),
      errors: Math.floor(contacts.length * 0.2),
      errorsList: [
        "Invalid phone number: +1-555-0127",
        "Duplicate contact: Sarah Cohen",
      ],
    };
    setImportResults(results);
    setStep(3);
  };

  const renderStep1 = () => (
    <div className="text-center">
      <div className="mb-6">
        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Import Contacts
        </h3>
        <p className="text-gray-600">
          Upload a CSV or Excel file with your contact information
        </p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-gray-500 mb-4">CSV, XLS, XLSX up to 10MB</p>
        <input
          type="file"
          accept=".csv,.xls,.xlsx"
          onChange={handleFileUpload}
          className="hidden"
          id="contact-file-upload"
        />
        <label
          htmlFor="contact-file-upload"
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          <Upload className="w-4 h-4 mr-2" />
          Choose File
        </label>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 text-left">
        <h4 className="font-medium text-blue-800 mb-2">
          File Format Requirements:
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• First row should contain column headers</li>
          <li>• Required columns: Name, Phone Number</li>
          <li>• Optional columns: Email, Group, Notes</li>
          <li>• Phone numbers should include country code</li>
        </ul>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Map Columns
        </h3>
        <p className="text-gray-600">
          Match your file columns to our contact fields
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <select
            value={mapping.name}
            onChange={(e) => handleMappingChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select column</option>
            <option value="name">Name</option>
            <option value="full_name">Full Name</option>
            <option value="first_name">First Name</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <select
            value={mapping.phone}
            onChange={(e) => handleMappingChange("phone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select column</option>
            <option value="phone">Phone</option>
            <option value="mobile">Mobile</option>
            <option value="phone_number">Phone Number</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email (Optional)
          </label>
          <select
            value={mapping.email}
            onChange={(e) => handleMappingChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select column</option>
            <option value="email">Email</option>
            <option value="email_address">Email Address</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Group (Optional)
          </label>
          <select
            value={mapping.group}
            onChange={(e) => handleMappingChange("group", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select column</option>
            <option value="group">Group</option>
            <option value="category">Category</option>
            <option value="tags">Tags</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-800 mb-3">
          Preview (First 5 contacts)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Phone</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Group</th>
              </tr>
            </thead>
            <tbody>
              {contacts.slice(0, 5).map((contact, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2">{contact.name}</td>
                  <td className="py-2">{contact.phone}</td>
                  <td className="py-2">{contact.email}</td>
                  <td className="py-2">{contact.group}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setStep(1)}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleImport}
          disabled={!mapping.name || !mapping.phone}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Import Contacts
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center">
      <div className="mb-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Import Complete!
        </h3>
        <p className="text-gray-600">
          Your contacts have been imported successfully
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-800">
              {importResults.total}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {importResults.success}
            </div>
            <div className="text-sm text-gray-600">Imported</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {importResults.errors}
            </div>
            <div className="text-sm text-gray-600">Errors</div>
          </div>
        </div>
      </div>

      {importResults.errors > 0 && (
        <div className="bg-red-50 rounded-lg p-4 mb-6 text-left">
          <h4 className="font-medium text-red-800 mb-2">Errors Found:</h4>
          <ul className="text-sm text-red-700 space-y-1">
            {importResults.errorsList.map((error, index) => (
              <li key={index} className="flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

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
          <h2 className="text-2xl font-bold text-gray-800">Import Contacts</h2>
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
            {[1, 2, 3].map((stepNumber) => (
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
                {stepNumber < 3 && (
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
      </motion.div>
    </motion.div>
  );
}
