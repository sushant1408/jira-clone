"use client";

import { AlertTriangleIcon } from "lucide-react";

const PageError = ({ message }: { message?: string }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-amber-100 p-3 rounded-full">
            <AlertTriangleIcon className="size-10 text-amber-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            Something went wrong
          </h2>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export { PageError };
