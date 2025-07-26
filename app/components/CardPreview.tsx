"use client";

import { motion } from "framer-motion";
import { Heart, Star, Cake, Gift, Flower2, Sparkles } from "lucide-react";

interface CardPreviewProps {
  template: {
    id: number;
    name: string;
    category: string;
    preview: string;
    color: string;
  };
  recipientName: string;
  customMessage: string;
  senderName?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "birthday":
      return <Cake className="w-6 h-6" />;
    case "anniversary":
      return <Heart className="w-6 h-6" />;
    case "congratulations":
      return <Star className="w-6 h-6" />;
    case "thank-you":
      return <Flower2 className="w-6 h-6" />;
    case "holiday":
      return <Gift className="w-6 h-6" />;
    default:
      return <Sparkles className="w-6 h-6" />;
  }
};

export default function CardPreview({
  template,
  recipientName,
  customMessage,
  senderName,
}: CardPreviewProps) {
  const colorMap: { [key: string]: string } = {
    "bg-pink-500": "from-pink-400 to-pink-600",
    "bg-red-500": "from-red-400 to-red-600",
    "bg-green-500": "from-green-400 to-green-600",
    "bg-yellow-500": "from-yellow-400 to-yellow-600",
    "bg-blue-500": "from-blue-400 to-blue-600",
    "bg-purple-500": "from-purple-400 to-purple-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* SMS Preview */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">
              Sulemait Greetings
            </p>
            <p className="text-xs text-gray-500">+1-555-123-4567</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-3 mb-3">
          <p className="text-sm text-gray-800 mb-2">
            🎂 Happy Birthday {recipientName}!
          </p>
          <p className="text-sm text-gray-700 mb-2">
            {customMessage ||
              "Wishing you a wonderful day filled with joy and love!"}
          </p>
          <p className="text-xs text-blue-600">
            View full card: bit.ly/sulemait-abc123
          </p>
        </div>

        <p className="text-xs text-gray-500">Today at 10:30 AM</p>
      </div>

      {/* Full Card Preview */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div
          className={`h-48 bg-gradient-to-br ${
            colorMap[template.color]
          } flex items-center justify-center relative`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10 text-center text-white">
            <div className="mb-4">{getCategoryIcon(template.category)}</div>
            <h2 className="text-2xl font-bold mb-2">{template.preview}</h2>
            <p className="text-lg opacity-90">Dear {recipientName}</p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4">
            <Sparkles className="w-4 h-4 text-white opacity-60" />
          </div>
          <div className="absolute top-4 right-4">
            <Sparkles className="w-4 h-4 text-white opacity-60" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Sparkles className="w-4 h-4 text-white opacity-60" />
          </div>
          <div className="absolute bottom-4 right-4">
            <Sparkles className="w-4 h-4 text-white opacity-60" />
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-4">
            <p className="text-gray-700 leading-relaxed">
              {customMessage ||
                "Wishing you a wonderful day filled with joy, love, and all the happiness you deserve. May this special day bring you countless blessings and beautiful memories."}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">From</p>
                <p className="font-medium text-gray-800">
                  {senderName || "Your Friends at Sulemait"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Powered by</p>
                <p className="font-medium text-blue-600">Sulemait SMS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
