// Skeleton for employee list rows
export function EmployeeRowSkeleton() {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </td>
    </tr>
  );
}

// Skeleton for attendance rows
export function AttendanceRowSkeleton() {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
      </td>
    </tr>
  );
}

// Skeleton for card
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-40 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
      </div>
    </div>
  );
}

// Skeleton for form
export function FormSkeleton() {
  return (
    <div className="space-y-4">
      <div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-full"></div>
      </div>
      <div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-full"></div>
      </div>
      <div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-full"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-full"></div>
    </div>
  );
}
