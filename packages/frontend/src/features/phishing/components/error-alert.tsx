interface ErrorAlertProps {
  error: string | null;
  onClose?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-1">
          <p className="text-red-700">{error}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-red-700 hover:text-red-900">
            ×
          </button>
        )}
      </div>
    </div>
  );
};
