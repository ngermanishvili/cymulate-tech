import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import {
  createPhishingAttempt,
  fetchAttempts,
  clearError,
} from "../stores/phishing.slice";
import type { CreatePhishingAttemptDto, PhishingAttempt } from "../types";

export const usePhishing = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const attempts = useAppSelector((state) => state.phishing.attempts);
  const error = useAppSelector((state) => state.phishing.error);
  const reduxLoading = useAppSelector((state) => state.phishing.loading);

  const handleCreateAttempt = async (data: CreatePhishingAttemptDto) => {
    try {
      setLoading(true);
      dispatch(clearError());
      await dispatch(createPhishingAttempt(data)).unwrap();

      await Promise.all([dispatch(fetchAttempts())]);
      return true;
    } catch (err: any) {
      if (err.response?.status === 429) {
        return {
          success: false,
          error: err.response.data.message,
          retryAfter: err.response.data.retryAfter,
        };
      } else {
        console.error("Failed to create attempt:", err);
        return {
          success: false,
          error:
            err instanceof Error
              ? err.message
              : "Attempt limit reached, try later (max one attempt in 10 seconds)",
        };
      }
    } finally {
      setLoading(false);
    }
  };

  const loadAttempts = async () => {
    try {
      setLoading(true);
      dispatch(clearError());
      await dispatch(fetchAttempts()).unwrap();
      return true;
    } catch (err) {
      console.error("Failed to load attempts:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      await Promise.all([dispatch(fetchAttempts())]);
      return true;
    } catch (err) {
      console.error("Failed to refresh data:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearPhishingError = () => {
    dispatch(clearError());
  };

  return {
    attempts,
    error,
    loading: loading || reduxLoading,

    handleCreateAttempt,
    loadAttempts,
    refreshData,
    clearPhishingError,
  };
};
