import React from "react";

interface Attempt {
  id: string;
  targetEmail: string;
  subject: string;
  status: string;
  createdAt: string;
}

interface AttemptsTableProps {
  attempts: Attempt[];
}

export const AttemptsTable: React.FC<AttemptsTableProps> = ({ attempts }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CLICKED":
        return "bg-green-100 text-green-800";
      case "SENT":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Target Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {attempts.map((attempt) => (
            <tr key={attempt.id}>
              <td className="px-6 text-black py-4 whitespace-nowrap text-sm">
                {attempt.targetEmail}
              </td>
              <td className="px-6 text-black py-4 whitespace-nowrap text-sm">
                {attempt.subject}
              </td>
              <td className="px-6 text-black py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    attempt.status
                  )}`}
                >
                  {attempt.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(attempt.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
