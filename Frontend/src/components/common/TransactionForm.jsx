import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllAccounts, getMyAccounts } from '../../api/bankingService';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Alert from '../common/Alert';
import { formatCurrency, formatAccountNumber, accountTypeColor } from '../../utils/helpers';

export default function TransactionForm({
  title,
  description,
  accentColor = 'rose',
  icon,
  fields = [], // 'from' | 'to' | 'amount'
  onSubmit,
  loading,
  error,
  success,
}) {
  const location = useLocation();
  const prefillId = location.state?.accountId;
  const { isAdmin } = useAuth();
  const { data: accounts, loading: loadingAccounts, execute: fetchAccounts } = useApi(isAdmin ? getAllAccounts : getMyAccounts);

  const [fromId, setFromId] = useState(prefillId || '');
  const [toId, setToId] = useState('');
  const [amount, setAmount] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => { fetchAccounts(); }, []);

  const accountList = accounts || [];

  const validate = () => {
    const errs = {};
    if (fields.includes('from') && !fromId) errs.fromId = 'Select an account';
    if (fields.includes('to') && !toId) errs.toId = 'Select a destination account';
    if (fields.includes('to') && fromId && toId && fromId === toId) errs.toId = 'Cannot transfer to the same account';
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) errs.amount = 'Enter a valid amount greater than 0';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    onSubmit({ fromId, toId, amount: parseFloat(amount) });
  };

  const colorMap = {
    rose: { badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20', btn: 'bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-300 hover:to-rose-400 shadow-rose-500/20' },
    emerald: { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', btn: 'bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-emerald-500/20' },
    amber: { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', btn: 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-amber-500/20' },
    lavender: { badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20', btn: 'bg-gradient-to-r from-violet-400 to-violet-500 hover:from-violet-300 hover:to-violet-400 shadow-violet-500/20' },
    // Legacy aliases
    sky: { badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20', btn: 'bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-300 hover:to-rose-400 shadow-rose-500/20' },
    violet: { badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20', btn: 'bg-gradient-to-r from-violet-400 to-violet-500 hover:from-violet-300 hover:to-violet-400 shadow-violet-500/20' },
  };
  const colors = colorMap[accentColor] || colorMap.rose;

  const AccountSelect = ({ value, onChange, error: selectError, exclude }) => {
    const filtered = exclude ? accountList.filter((a) => String(a.id) !== String(exclude)) : accountList;
    return (
      <div className="space-y-1.5">
        <div className="relative">
          <select
            value={value}
            onChange={(e) => { onChange(e.target.value); setFormErrors((fe) => ({ ...fe })); }}
            className="w-full bg-white/5 border border-white/10 rounded-xl text-stone-200 focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/30 transition-all duration-200 py-2.5 pl-4 pr-10 text-sm appearance-none cursor-pointer disabled:opacity-50"
            disabled={loadingAccounts}
          >
            <option value="" className="bg-stone-900">{loadingAccounts ? 'Loading accounts...' : 'Select an account'}</option>
            {filtered.map((a) => (
              <option key={a.id} value={a.id} className="bg-stone-900">
                #{String(a.id).padStart(4, '0')} — {a.holderName || 'Unknown'} ({formatCurrency(a.balance)})
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">▾</div>
        </div>
        {selectError && <p className="text-xs text-red-400">{selectError}</p>}

        {/* Preview selected account */}
        {value && (() => {
          const acct = accountList.find((a) => String(a.id) === String(value));
          if (!acct) return null;
          return (
            <div className="flex items-center gap-3 px-3 py-2.5 bg-white/3 rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400/20 to-amber-400/20 flex items-center justify-center text-xs font-bold text-rose-400">
                {(acct.holderName || 'U')[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-stone-200 text-sm font-medium">{acct.holderName}</p>
                <p className="text-stone-600 text-xs font-mono">{formatAccountNumber(acct.id)}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-amber-400 text-sm font-mono font-semibold">{formatCurrency(acct.balance)}</p>
                <span className={`text-xs px-1.5 py-0.5 rounded ${accountTypeColor(acct.accountType || '')}`}>
                  {acct.accountType || 'Std'}
                </span>
              </div>
            </div>
          );
        })()}
      </div>
    );
  };

  return (
    <div className="max-w-lg space-y-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${colors.badge}`}>
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-stone-500 text-sm mt-0.5">{description}</p>
        </div>
      </div>

      {success && <Alert type="success" message={`${title} completed successfully!`} />}
      {error && <Alert type="error" message={error} />}

      <div className="glass rounded-2xl p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.includes('from') && (
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-stone-400">
                {fields.includes('to') ? 'From Account' : 'Account'}
              </label>
              <AccountSelect
                value={fromId}
                onChange={(v) => { setFromId(v); setFormErrors((fe) => ({ ...fe, fromId: '' })); }}
                error={formErrors.fromId}
              />
            </div>
          )}

          {fields.includes('to') && (
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-stone-400">To Account</label>
              <AccountSelect
                value={toId}
                onChange={(v) => { setToId(v); setFormErrors((fe) => ({ ...fe, toId: '' })); }}
                error={formErrors.toId}
                exclude={fromId}
              />
            </div>
          )}

          {fields.includes('amount') && (
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-stone-400">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm font-mono">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setFormErrors((fe) => ({ ...fe, amount: '' })); }}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/30 transition-all duration-200 py-2.5 pl-7 pr-4 text-sm font-mono"
                />
              </div>
              {formErrors.amount && <p className="text-xs text-red-400">{formErrors.amount}</p>}

              {/* Quick amount chips */}
              <div className="flex gap-2 flex-wrap">
                {[100, 500, 1000, 5000].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAmount(String(v))}
                    className={`px-3 py-1 text-xs rounded-lg border transition-all duration-150 ${
                      Number(amount) === v
                        ? `${colors.badge} border`
                        : 'bg-white/5 border-white/10 text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    ${v.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          {amount && Number(amount) > 0 && (
            <div className={`p-4 rounded-xl border ${colors.badge} bg-opacity-5`}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">Transaction Summary</p>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">Amount</span>
                <span className="text-lg font-bold font-mono">{formatCurrency(Number(amount))}</span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            disabled={success}
            className={`w-full text-slate-950 shadow-lg ${colors.btn}`}
            size="lg"
          >
            {icon} Confirm {title}
          </Button>
        </form>
      </div>
    </div>
  );
}
