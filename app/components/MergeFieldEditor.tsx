"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  X,
  Type,
  Calendar,
  User,
  Hash,
  Save,
  Eye,
  Copy,
  Trash2,
} from "lucide-react";

interface MergeField {
  id: string;
  name: string;
  placeholder: string;
  type: "text" | "date" | "name" | "number" | "custom";
  description: string;
  example: string;
  required: boolean;
}

const defaultMergeFields: MergeField[] = [
  {
    id: "1",
    name: "Recipient Name",
    placeholder: "{{recipient_name}}",
    type: "name",
    description: "The name of the person receiving the card",
    example: "Sarah Cohen",
    required: true,
  },
  {
    id: "2",
    name: "Sender Name",
    placeholder: "{{sender_name}}",
    type: "name",
    description: "The name of the person sending the card",
    example: "David Levy",
    required: false,
  },
  {
    id: "3",
    name: "Event Date",
    placeholder: "{{event_date}}",
    type: "date",
    description: "The date of the event (birthday, anniversary, etc.)",
    example: "February 15, 2024",
    required: false,
  },
  {
    id: "4",
    name: "Custom Message",
    placeholder: "{{custom_message}}",
    type: "text",
    description: "Personal message from the sender",
    example: "Wishing you a wonderful day!",
    required: false,
  },
  {
    id: "5",
    name: "Age",
    placeholder: "{{age}}",
    type: "number",
    description: "Age of the recipient (for birthdays)",
    example: "25",
    required: false,
  },
  {
    id: "6",
    name: "Years Together",
    placeholder: "{{years_together}}",
    type: "number",
    description: "Number of years (for anniversaries)",
    example: "10",
    required: false,
  },
];

export default function MergeFieldEditor() {
  const [mergeFields, setMergeFields] =
    useState<MergeField[]>(defaultMergeFields);
  const [showAddField, setShowAddField] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [newField, setNewField] = useState<Partial<MergeField>>({
    name: "",
    placeholder: "",
    type: "text",
    description: "",
    example: "",
    required: false,
  });

  const [previewData, setPreviewData] = useState({
    recipient_name: "Sarah Cohen",
    sender_name: "David Levy",
    event_date: "February 15, 2024",
    custom_message: "Wishing you a wonderful day filled with joy and love!",
    age: "25",
    years_together: "10",
  });

  const sampleTemplate = `Dear {{recipient_name}},

{{custom_message}}

{{#if age}}Happy {{age}}th Birthday!{{/if}}
{{#if years_together}}Congratulations on {{years_together}} years together!{{/if}}

Best wishes,
{{sender_name}}`;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <Type className="w-4 h-4" />;
      case "date":
        return <Calendar className="w-4 h-4" />;
      case "name":
        return <User className="w-4 h-4" />;
      case "number":
        return <Hash className="w-4 h-4" />;
      default:
        return <Type className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "text":
        return "bg-blue-100 text-blue-700";
      case "date":
        return "bg-green-100 text-green-700";
      case "name":
        return "bg-purple-100 text-purple-700";
      case "number":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const addMergeField = () => {
    if (newField.name && newField.placeholder) {
      const field: MergeField = {
        id: Date.now().toString(),
        name: newField.name,
        placeholder: newField.placeholder,
        type: newField.type as any,
        description: newField.description || "",
        example: newField.example || "",
        required: newField.required || false,
      };
      setMergeFields([...mergeFields, field]);
      setNewField({
        name: "",
        placeholder: "",
        type: "text",
        description: "",
        example: "",
        required: false,
      });
      setShowAddField(false);
    }
  };

  const deleteMergeField = (id: string) => {
    setMergeFields(mergeFields.filter((field) => field.id !== id));
  };

  const copyPlaceholder = (placeholder: string) => {
    navigator.clipboard.writeText(placeholder);
  };

  const renderPreview = () => {
    let previewText = sampleTemplate;

    // Replace merge fields with actual values
    mergeFields.forEach((field) => {
      const value =
        previewData[
          field.placeholder.replace(/[{}]/g, "") as keyof typeof previewData
        ] || field.example;
      previewText = previewText.replace(
        new RegExp(field.placeholder, "g"),
        value
      );
    });

    // Handle conditional blocks
    previewText = previewText.replace(
      /\{\{#if age\}\}(.*?)\{\{\/if\}\}/g,
      previewData.age ? "$1" : ""
    );
    previewText = previewText.replace(
      /\{\{#if years_together\}\}(.*?)\{\{\/if\}\}/g,
      previewData.years_together ? "$1" : ""
    );

    return previewText;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Merge Field Management
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>{previewMode ? "Edit Mode" : "Preview Mode"}</span>
          </button>
          <button
            onClick={() => setShowAddField(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Field</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Merge Fields List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Available Merge Fields
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Manage dynamic content placeholders for your templates
            </p>
          </div>

          <div className="p-6 space-y-4">
            {mergeFields.map((field) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getTypeIcon(field.type)}
                      <h4 className="font-medium text-gray-800">
                        {field.name}
                      </h4>
                      {field.required && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          Required
                        </span>
                      )}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                          field.type
                        )}`}
                      >
                        {field.type}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {field.placeholder}
                      </code>
                      <button
                        onClick={() => copyPlaceholder(field.placeholder)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      {field.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      Example: {field.example}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteMergeField(field.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview/Add Field Panel */}
        <div className="space-y-6">
          {previewMode ? (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Template Preview
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  See how merge fields render with sample data
                </p>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Sample Data
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(previewData).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Rendered Template
                  </h4>
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                    {renderPreview()}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Template Example
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Sample template using merge fields
                </p>
              </div>

              <div className="p-6">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded-lg">
                  {sampleTemplate}
                </pre>
                <p className="text-xs text-gray-500 mt-2">
                  Use the merge fields above in your templates. Copy the
                  placeholders and paste them where you want dynamic content.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Field Modal */}
      {showAddField && (
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
                Add Merge Field
              </h3>
              <button
                onClick={() => setShowAddField(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field Name
                </label>
                <input
                  type="text"
                  value={newField.name}
                  onChange={(e) =>
                    setNewField({ ...newField, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Placeholder
                </label>
                <input
                  type="text"
                  value={newField.placeholder}
                  onChange={(e) =>
                    setNewField({ ...newField, placeholder: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., {{company_name}}"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={newField.type}
                  onChange={(e) =>
                    setNewField({ ...newField, type: e.target.value as any })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                  <option value="name">Name</option>
                  <option value="number">Number</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newField.description}
                  onChange={(e) =>
                    setNewField({ ...newField, description: e.target.value })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe what this field is for..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Example Value
                </label>
                <input
                  type="text"
                  value={newField.example}
                  onChange={(e) =>
                    setNewField({ ...newField, example: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Acme Corp"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="required"
                  checked={newField.required}
                  onChange={(e) =>
                    setNewField({ ...newField, required: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="required"
                  className="ml-2 text-sm text-gray-700"
                >
                  Required field
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddField(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addMergeField}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Add Field</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
