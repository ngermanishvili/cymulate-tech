import React, { useState, useEffect } from "react";
import { usePhishing } from "../hooks/usePhishing";
import { NewCampaignForm } from "./campaign-form";
import { AttemptsTable } from "./attempts-table";

export const PhishingDashboard: React.FC = () => {
  const { attempts, loading, refreshData } = usePhishing();

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}

      {/* Campaign Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Phishing Campaigns</h2>
      </div>

      <NewCampaignForm
        onSuccess={() => {
          refreshData();
        }}
      />

      {/* Attempts Table */}
      {loading ? (
        <div className="text-center py-4">Loading campaigns...</div>
      ) : (
        <AttemptsTable attempts={attempts} />
      )}
    </div>
  );
};
