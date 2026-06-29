export default function Input({
  label, error, icon: Icon, prefix, className = '', ...props
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-stone-400">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-500">
            <Icon size={16} />
          </div>
        )}
        {prefix && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-500 text-sm font-mono">
            {prefix}
          </div>
        )}
        <input
          className={`
            w-full bg-white/5 border border-white/10 rounded-xl
            text-stone-200 placeholder-stone-600
            focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/30 focus:bg-white/7
            transition-all duration-200 py-2.5 pr-4
            ${Icon ? 'pl-9' : prefix ? 'pl-6' : 'pl-4'}
            ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
