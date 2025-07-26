"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Scissors,
  Link,
  Copy,
  RefreshCw,
  Settings,
} from "lucide-react";

interface SMSMessage {
  id: string;
  content: string;
  characterCount: number;
  segments: number;
  cost: number;
  includesMedia: boolean;
  mediaUrl?: string;
}

const SMS_LIMITS = {
  GSM: 160,
  UNICODE: 70,
  CONCATENATED: 153,
};

const COST_PER_SEGMENT = 0.05; // USD

export default function SMSFormatter() {
  const [message, setMessage] = useState("");
  const [includeMedia, setIncludeMedia] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [autoSplit, setAutoSplit] = useState(true);
  const [encoding, setEncoding] = useState<"GSM" | "UNICODE">("GSM");
  const [formattedMessages, setFormattedMessages] = useState<SMSMessage[]>([]);

  const detectEncoding = (text: string): "GSM" | "UNICODE" => {
    // Simple detection - if text contains non-GSM characters, it's Unicode
    const gsmChars =
      /^[A-Za-z0-9\s\-\.,!?@#$%^&*()_+\=\[\]{}|\\:;"'<>\/\n\r]+$/;
    return gsmChars.test(text) ? "GSM" : "UNICODE";
  };

  const calculateSegments = (
    text: string,
    encoding: "GSM" | "UNICODE"
  ): number => {
    const limit = encoding === "GSM" ? SMS_LIMITS.GSM : SMS_LIMITS.UNICODE;
    const concatLimit =
      encoding === "GSM" ? SMS_LIMITS.CONCATENATED : SMS_LIMITS.CONCATENATED;

    if (text.length <= limit) return 1;

    const remainingChars = text.length - limit;
    const additionalSegments = Math.ceil(remainingChars / concatLimit);
    return 1 + additionalSegments;
  };

  const splitMessage = (
    text: string,
    encoding: "GSM" | "UNICODE"
  ): string[] => {
    const limit = encoding === "GSM" ? SMS_LIMITS.GSM : SMS_LIMITS.UNICODE;
    const concatLimit =
      encoding === "GSM" ? SMS_LIMITS.CONCATENATED : SMS_LIMITS.CONCATENATED;

    if (text.length <= limit) return [text];

    const segments: string[] = [];
    let remaining = text;

    // First segment
    segments.push(remaining.substring(0, limit));
    remaining = remaining.substring(limit);

    // Additional segments
    while (remaining.length > 0) {
      const segmentLength = Math.min(concatLimit, remaining.length);
      segments.push(remaining.substring(0, segmentLength));
      remaining = remaining.substring(segmentLength);
    }

    return segments;
  };

  const formatMessages = () => {
    if (!message.trim()) {
      setFormattedMessages([]);
      return;
    }

    const detectedEncoding = detectEncoding(message);
    const finalEncoding = encoding;
    const segments = autoSplit
      ? splitMessage(message, finalEncoding)
      : [message];

    const messages: SMSMessage[] = segments.map((segment, index) => {
      const segmentCount = calculateSegments(segment, finalEncoding);
      const cost = segmentCount * COST_PER_SEGMENT;

      return {
        id: `segment-${index}`,
        content: segment,
        characterCount: segment.length,
        segments: segmentCount,
        cost: cost,
        includesMedia: includeMedia && index === 0, // Media only in first segment
        mediaUrl: includeMedia && index === 0 ? mediaUrl : undefined,
      };
    });

    setFormattedMessages(messages);
  };

  useEffect(() => {
    formatMessages();
  }, [message, includeMedia, mediaUrl, autoSplit, encoding]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusIcon = (message: SMSMessage) => {
    const limit = encoding === "GSM" ? SMS_LIMITS.GSM : SMS_LIMITS.UNICODE;

    if (message.characterCount <= limit) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (message.segments <= 3) {
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    } else {
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (message: SMSMessage) => {
    const limit = encoding === "GSM" ? SMS_LIMITS.GSM : SMS_LIMITS.UNICODE;

    if (message.characterCount <= limit) {
      return "bg-green-100 text-green-700";
    } else if (message.segments <= 3) {
      return "bg-yellow-100 text-yellow-700";
    } else {
      return "bg-red-100 text-red-700";
    }
  };

  const totalCost = formattedMessages.reduce((sum, msg) => sum + msg.cost, 0);
  const totalSegments = formattedMessages.reduce(
    (sum, msg) => sum + msg.segments,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          SMS Message Formatter
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMessage("")}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-6">
          {/* Message Input */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Message Content
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Text
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your SMS message here..."
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    {message.length} characters
                  </span>
                  <span className="text-sm text-gray-500">
                    Encoding: {detectEncoding(message)}
                  </span>
                </div>
              </div>

              {/* Media Options */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="checkbox"
                    id="includeMedia"
                    checked={includeMedia}
                    onChange={(e) => setIncludeMedia(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="includeMedia"
                    className="text-sm font-medium text-gray-700"
                  >
                    Include Media Link
                  </label>
                </div>

                {includeMedia && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Media URL
                    </label>
                    <input
                      type="url"
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Formatting Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Encoding
                </label>
                <select
                  value={encoding}
                  onChange={(e) =>
                    setEncoding(e.target.value as "GSM" | "UNICODE")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="GSM">GSM (160 chars)</option>
                  <option value="UNICODE">Unicode (70 chars)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoSplit"
                  checked={autoSplit}
                  onChange={(e) => setAutoSplit(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="autoSplit"
                  className="text-sm font-medium text-gray-700"
                >
                  Auto-split long messages
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Message Summary
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {totalSegments}
                </div>
                <div className="text-sm text-gray-600">Total Segments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  ${totalCost.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Estimated Cost</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Character Limit:</span>
                <span className="font-medium">
                  {encoding === "GSM" ? "160" : "70"} per segment
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm mt-1">
                <Scissors className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Concatenated Limit:</span>
                <span className="font-medium">
                  {encoding === "GSM" ? "153" : "67"} per additional segment
                </span>
              </div>
            </div>
          </div>

          {/* Message Segments */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Message Segments
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Preview how your message will be sent
              </p>
            </div>

            <div className="p-6 space-y-4">
              {formattedMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Enter a message to see the preview</p>
                </div>
              ) : (
                formattedMessages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(msg)}
                        <h4 className="font-medium text-gray-800">
                          Segment {index + 1}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                            msg
                          )}`}
                        >
                          {msg.segments} part{msg.segments > 1 ? "s" : ""}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(msg.content)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">
                        {msg.content}
                      </p>
                      {msg.includesMedia && msg.mediaUrl && (
                        <div className="mt-2 flex items-center space-x-2 text-xs text-blue-600">
                          <Link className="w-3 h-3" />
                          <span>{msg.mediaUrl}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{msg.characterCount} characters</span>
                      <span>${msg.cost.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SMS Guidelines */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          SMS Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h4 className="font-medium mb-2">Character Limits</h4>
            <ul className="space-y-1">
              <li>• GSM: 160 characters per message</li>
              <li>• Unicode: 70 characters per message</li>
              <li>• Long messages are automatically split</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Cost Considerations</h4>
            <ul className="space-y-1">
              <li>• Each segment costs approximately $0.05</li>
              <li>• Media links count toward character limit</li>
              <li>• Keep messages concise to reduce costs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
