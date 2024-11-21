import React, { useState } from "react";
import { usePhishing } from "../hooks/usePhishing";
import type { CreatePhishingAttemptDto } from "../types";
import { ErrorAlert } from "./error-alert";

interface NewCampaignFormProps {
  onSuccess: () => void;
}

export const NewCampaignForm: React.FC<NewCampaignFormProps> = ({
  onSuccess,
}) => {
  const { handleCreateAttempt, loading } = usePhishing();
  const [formData, setFormData] = useState<CreatePhishingAttemptDto>({
    targetEmail: "",
    subject: "",
  });
  const [error, setError] = useState("");
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await handleCreateAttempt(formData);
      if (result === true) {
        onSuccess();
        setFormData({ targetEmail: "", subject: "" });
        setError("");
        setRemainingTime(null);
      } else {
        setError(result.error);
        setRemainingTime(result.retryAfter);
      }
    } catch (err: any) {
      setError(
        err instanceof Error ? err.message : "Failed to create campaign"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Target Email
        </label>
        <input
          type="email"
          value={formData.targetEmail}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, targetEmail: e.target.value }))
          }
          className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
          required
          placeholder="Email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email Subject
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, subject: e.target.value }))
          }
          className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
          required
          placeholder="Subject"
        />
      </div>

      <ErrorAlert error={error} onClose={() => setError("")} />

      {remainingTime && (
        <div className="text-sm text-red-600">
          Please wait {remainingTime} seconds before trying again
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading || remainingTime !== null}
        >
          {loading ? "Creating..." : "Create Campaign"}
        </button>
        {error && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg">
              <h3 className="text-lg font-bold mb-4 text-black">Error</h3>
              <p className="mb-4 text-red-700">{error}</p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  window.location.reload();
                  setError("");
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
