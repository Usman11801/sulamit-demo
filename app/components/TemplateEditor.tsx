"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Palette, Type, Save, X, Eye } from "lucide-react";

interface TemplateEditorProps {
  onClose: () => void;
  template?: {
    id: number;
    name: string;
    category: string;
    preview: string;
    color: string;
  };
}

const categories = [
  { id: "birthday", name: "Birthday", icon: "🎂" },
  { id: "anniversary", name: "Anniversary", icon: "💕" },
  { id: "get-well", name: "Get Well", icon: "🏥" },
  { id: "congratulations", name: "Congratulations", icon: "🎉" },
  { id: "thank-you", name: "Thank You", icon: "🙏" },
  { id: "holiday", name: "Holiday", icon: "🎄" },
];

const colors = [
  { id: "bg-pink-500", name: "Pink", class: "bg-pink-500" },
  { id: "bg-red-500", name: "Red", class: "bg-red-500" },
  { id: "bg-green-500", name: "Green", class: "bg-green-500" },
  { id: "bg-yellow-500", name: "Yellow", class: "bg-yellow-500" },
  { id: "bg-blue-500", name: "Blue", class: "bg-blue-500" },
  { id: "bg-purple-500", name: "Purple", class: "bg-purple-500" },
];

export default function TemplateEditor({
  onClose,
  template,
}: TemplateEditorProps) {
  const [formData, setFormData] = useState({
    name: template?.name || "",
    category: template?.category || "birthday",
    preview: template?.preview || "",
    color: template?.color || "bg-pink-500",
    defaultMessage: "",
    customImage: null as File | null,
  });
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, customImage: file }));
    }
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log("Saving template:", formData);
    onClose();
  };

  const renderPreview = () => {
    const colorMap: { [key: string]: string } = {
      "bg-pink-500": "from-pink-400 to-pink-600",
      "bg-red-500": "from-red-400 to-red-600",
      "bg-green-500": "from-green-400 to-green-600",
      "bg-yellow-500": "from-yellow-400 to-yellow-600",
      "bg-blue-500": "from-blue-400 to-blue-600",
      "bg-purple-500": "from-purple-400 to-purple-600",
    };

    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div
          className={`h-48 bg-gradient-to-br ${
            colorMap[formData.color]
          } flex items-center justify-center relative`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10 text-center text-white">
            <div className="mb-4 text-4xl">
              {categories.find((cat) => cat.id === formData.category)?.icon}
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {formData.preview || "Your Greeting"}
            </h2>
            <p className="text-lg opacity-90">Dear [Recipient Name]</p>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-4">
            <p className="text-gray-700 leading-relaxed">
              {formData.defaultMessage ||
                "Your custom message will appear here..."}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">From</p>
                <p className="font-medium text-gray-800">[Sender Name]</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Powered by</p>
                <p className="font-medium text-blue-600">Sulemait SMS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 sm:p-6 max-w-4xl w-full mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {template ? "Edit Template" : "Create New Template"}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              <span>{previewMode ? "Edit" : "Preview"}</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Form Section */}
          {!previewMode && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  placeholder="e.g., Birthday Celebration"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleInputChange("category", category.id)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                        formData.category === category.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview Text
                </label>
                <input
                  type="text"
                  value={formData.preview}
                  onChange={(e) => handleInputChange("preview", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  placeholder="e.g., Happy Birthday!"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleInputChange("color", color.id)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                        formData.color === color.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full ${color.class}`}
                      ></div>
                      <span className="font-medium">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Message
                </label>
                <textarea
                  value={formData.defaultMessage}
                  onChange={(e) =>
                    handleInputChange("defaultMessage", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  placeholder="Enter the default message that will appear on the card..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Background Image (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="mt-2 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Preview Section */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {previewMode ? "Live Preview" : "Template Preview"}
            </h3>
            {renderPreview()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Template</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
