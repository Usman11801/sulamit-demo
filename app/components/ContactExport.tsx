"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  FileSpreadsheet,
  Mail,
  Users,
  Filter,
  CheckSquare,
  Square,
  X,
  Settings,
} from "lucide-react";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  group: string;
  tags: string[];
  lastContact: string;
  notes?: string;
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Cohen",
    phone: "+1-555-0123",
    email: "sarah.cohen@email.com",
    group: "Family",
    tags: ["birthday", "anniversary"],
    lastContact: "2024-01-15",
    notes: "Prefers morning calls",
  },
  {
    id: 2,
    name: "David Levy",
    phone: "+1-555-0124",
    email: "david.levy@email.com",
    group: "Synagogue",
    tags: ["yahrzeit", "holiday"],
    lastContact: "2024-01-10",
    notes: "Board member",
  },
  {
    id: 3,
    name: "Rachel Green",
    phone: "+1-555-0125",
    email: "rachel.green@email.com",
    group: "Friends",
    tags: ["birthday"],
    lastContact: "2024-01-08",
  },
  {
    id: 4,
    name: "Michael Brown",
    phone: "+1-555-0126",
    email: "michael.brown@email.com",
    group: "Work",
    tags: ["professional"],
    lastContact: "2024-01-05",
  },
  {
    id: 5,
    name: "Lisa Wilson",
    phone: "+1-555-0127",
    email: "lisa.wilson@email.com",
    group: "Family",
    tags: ["birthday", "anniversary", "holiday"],
    lastContact: "2024-01-03",
  },
];

const exportFormats = [
  {
    id: "csv",
    name: "CSV",
    description: "Comma-separated values",
    icon: FileSpreadsheet,
    extension: ".csv",
  },
  {
    id: "json",
    name: "JSON",
    description: "JavaScript Object Notation",
    icon: FileText,
    extension: ".json",
  },
  {
    id: "vcf",
    name: "vCard",
    description: "Virtual Contact File",
    icon: Users,
    extension: ".vcf",
  },
];

export default function ContactExport() {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [selectedFormat, setSelectedFormat] = useState("csv");
  const [selectedFields, setSelectedFields] = useState([
    "name",
    "phone",
    "email",
    "group",
    "tags",
  ]);
  const [filterGroup, setFilterGroup] = useState("all");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);

  const availableFields = [
    { id: "name", label: "Name", required: true },
    { id: "phone", label: "Phone", required: true },
    { id: "email", label: "Email", required: false },
    { id: "group", label: "Group", required: false },
    { id: "tags", label: "Tags", required: false },
    { id: "lastContact", label: "Last Contact", required: false },
    { id: "notes", label: "Notes", required: false },
  ];

  const availableGroups = [
    "all",
    ...Array.from(new Set(mockContacts.map((c) => c.group))),
  ];
  const availableTags = Array.from(
    new Set(mockContacts.flatMap((c) => c.tags))
  );

  const filteredContacts = mockContacts.filter((contact) => {
    const matchesGroup = filterGroup === "all" || contact.group === filterGroup;
    const matchesTags =
      filterTags.length === 0 ||
      filterTags.some((tag) => contact.tags.includes(tag));
    return matchesGroup && matchesTags;
  });

  const toggleContact = (id: number) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleAllContacts = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map((c) => c.id));
    }
  };

  const toggleField = (fieldId: string) => {
    const field = availableFields.find((f) => f.id === fieldId);
    if (field?.required) return; // Can't deselect required fields

    setSelectedFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((f) => f !== fieldId)
        : [...prev, fieldId]
    );
  };

  const toggleTag = (tag: string) => {
    setFilterTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const generateCSV = (contacts: Contact[]) => {
    const headers = selectedFields.map(
      (field) => availableFields.find((f) => f.id === field)?.label || field
    );

    const rows = contacts.map((contact) =>
      selectedFields.map((field) => {
        const value = contact[field as keyof Contact];
        if (field === "tags" && Array.isArray(value)) {
          return value.join(", ");
        }
        return value || "";
      })
    );

    return [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
  };

  const generateJSON = (contacts: Contact[]) => {
    return JSON.stringify(
      contacts.map((contact) => {
        const obj: any = {};
        selectedFields.forEach((field) => {
          obj[field] = contact[field as keyof Contact];
        });
        return obj;
      }),
      null,
      2
    );
  };

  const generateVCF = (contacts: Contact[]) => {
    return contacts
      .map(
        (contact) =>
          `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL:${contact.phone}
${contact.email ? `EMAIL:${contact.email}` : ""}
${contact.group ? `ORG:${contact.group}` : ""}
${contact.notes ? `NOTE:${contact.notes}` : ""}
END:VCARD`
      )
      .join("\n\n");
  };

  const handleExport = () => {
    const contactsToExport = mockContacts.filter((c) =>
      selectedContacts.includes(c.id)
    );
    let content = "";
    let filename = `contacts_${new Date().toISOString().split("T")[0]}`;

    switch (selectedFormat) {
      case "csv":
        content = generateCSV(contactsToExport);
        filename += ".csv";
        break;
      case "json":
        content = generateJSON(contactsToExport);
        filename += ".json";
        break;
      case "vcf":
        content = generateVCF(contactsToExport);
        filename += ".vcf";
        break;
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowExportModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Export Contacts</h2>
        <button
          onClick={() => setShowExportModal(true)}
          disabled={selectedContacts.length === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export ({selectedContacts.length})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Filters
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group
                </label>
                <select
                  value={filterGroup}
                  onChange={(e) => setFilterGroup(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {availableGroups.map((group) => (
                    <option key={group} value={group}>
                      {group === "all" ? "All Groups" : group}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="space-y-2">
                  {availableTags.map((tag) => (
                    <label key={tag} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filterTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Export Fields
            </h3>

            <div className="space-y-2">
              {availableFields.map((field) => (
                <label key={field.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(field.id)}
                    onChange={() => toggleField(field.id)}
                    disabled={field.required}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                  />
                  <span
                    className={`text-sm ${
                      field.required ? "text-gray-500" : "text-gray-700"
                    }`}
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Contact List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Contacts ({filteredContacts.length})
                </h3>
                <button
                  onClick={toggleAllContacts}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {selectedContacts.length === filteredContacts.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedContacts.length === filteredContacts.length &&
                          filteredContacts.length > 0
                        }
                        onChange={toggleAllContacts}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Contact
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(contact.id)}
                          onChange={() => toggleContact(contact.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {contact.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {contact.phone}
                          </div>
                          {contact.email && (
                            <div className="text-sm text-gray-500">
                              {contact.email}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                          {contact.group}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(contact.lastContact).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
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
            className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 sm:p-6 max-w-md w-full mx-4 sm:mx-0 shadow-2xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Export Contacts
              </h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Format
                </label>
                <div className="space-y-2">
                  {exportFormats.map((format) => (
                    <label
                      key={format.id}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="format"
                        value={format.id}
                        checked={selectedFormat === format.id}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <format.icon className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {format.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {format.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">
                  <div>Selected: {selectedContacts.length} contacts</div>
                  <div>Fields: {selectedFields.length} fields</div>
                  <div>
                    Format:{" "}
                    {exportFormats.find((f) => f.id === selectedFormat)?.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
