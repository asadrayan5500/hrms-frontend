export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <a
              href={item.href}
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-gray-600">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      ))}
    </nav>
  );
}
