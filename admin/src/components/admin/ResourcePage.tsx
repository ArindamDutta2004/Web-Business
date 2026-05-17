'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Edit3, Loader2, Plus, RefreshCcw, Search, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export type AdminRecord = Record<string, any>;

export type ResourceField = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'date' | 'tags' | 'json';
  options?: Array<{ label: string; value: string | number | boolean }>;
  placeholder?: string;
  required?: boolean;
  createOnly?: boolean;
  rows?: number;
  helper?: string;
};

export type ResourceColumn = {
  label: string;
  render: (item: AdminRecord) => ReactNode;
  className?: string;
};

type ResourcePageProps = {
  title: string;
  kicker: string;
  description?: string;
  listPath: string;
  createPath?: string;
  updatePath?: (item: AdminRecord) => string;
  deletePath?: (item: AdminRecord) => string;
  fields: ResourceField[];
  columns: ResourceColumn[];
  searchPlaceholder?: string;
  emptyText?: string;
  createLabel?: string;
  allowCreate?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  getId?: (item: AdminRecord) => string;
  getTitle?: (item: AdminRecord) => string;
  mapFormToPayload?: (form: AdminRecord, mode: 'create' | 'edit', original?: AdminRecord | null) => AdminRecord;
  normalizeItemToForm?: (item: AdminRecord) => AdminRecord;
  initialForm?: AdminRecord;
  afterChange?: () => void;
  filterItem?: (item: AdminRecord, query: string) => boolean;
  headerExtra?: ReactNode;
  rowActions?: (item: AdminRecord, refresh: () => void) => ReactNode;
  baseFilter?: (item: AdminRecord) => boolean;
};

const defaultGetId = (item: AdminRecord) => item._id || item.id || item.slug || item.email || item.title;

function getByPath(item: AdminRecord, path: string) {
  return path.split('.').reduce<any>((acc, part) => acc?.[part], item);
}

function errorMessage(error: unknown, fallback: string) {
  if (typeof error === 'object' && error && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export function formatDate(value?: string | Date) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
}

export function money(value?: number, currency = 'USD') {
  if (typeof value !== 'number') return '-';
  return new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
}

export function StatusBadge({ value, tone = 'neutral' }: { value?: string; tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'accent' | 'info' }) {
  const toneClass = {
    neutral: 'text-white/45 border-white/12 bg-white/[0.02]',
    success: 'text-green-400 border-green-500/30 bg-green-500/5',
    warning: 'text-yellow-300 border-yellow-400/30 bg-yellow-400/5',
    danger: 'text-red-300 border-red-400/30 bg-red-400/5',
    accent: 'text-kinetic border-kinetic/35 bg-kinetic/5',
    info: 'text-blue-300 border-blue-400/30 bg-blue-400/5',
  }[tone];

  return <span className={`admin-badge ${toneClass}`}>{String(value || 'unknown').replaceAll('-', ' ').toUpperCase()}</span>;
}

export function statusTone(value?: string): 'neutral' | 'success' | 'warning' | 'danger' | 'accent' | 'info' {
  if (!value) return 'neutral';
  if (['active', 'paid', 'published', 'completed', 'won', 'resolved', 'replied'].includes(value)) return 'success';
  if (['draft', 'review', 'proposal', 'sent', 'contacted', 'qualified', 'read'].includes(value)) return 'warning';
  if (['inactive', 'overdue', 'cancelled', 'lost', 'archived'].includes(value)) return 'danger';
  if (['new', 'in-progress', 'urgent', 'featured'].includes(value)) return 'accent';
  return 'neutral';
}

function normalizeFormValue(field: ResourceField, value: unknown) {
  if (field.type === 'checkbox') return Boolean(value);
  if (field.type === 'tags') return Array.isArray(value) ? value.join(', ') : value || '';
  if (field.type === 'json') return typeof value === 'string' ? value : JSON.stringify(value ?? {}, null, 2);
  if (field.type === 'date' && value) return String(value).slice(0, 10);
  return value ?? '';
}

function coerceValue(field: ResourceField, value: FormDataEntryValue | null) {
  if (field.type === 'checkbox') return value === 'on';
  if (field.type === 'number') return value === null || value === '' ? undefined : Number(value);
  if (field.type === 'tags') {
    return String(value || '')
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);
  }
  if (field.type === 'json') {
    const raw = String(value || '').trim();
    if (!raw) return undefined;
    return JSON.parse(raw);
  }
  if (field.type === 'date') return value ? new Date(String(value)).toISOString() : undefined;
  return String(value || '').trim();
}

export default function ResourcePage({
  title,
  kicker,
  description,
  listPath,
  createPath,
  updatePath,
  deletePath,
  fields,
  columns,
  searchPlaceholder = 'Search records...',
  emptyText = 'No records found.',
  createLabel = 'Add record',
  allowCreate = true,
  allowEdit = true,
  allowDelete = true,
  getId = defaultGetId,
  getTitle,
  mapFormToPayload,
  normalizeItemToForm,
  initialForm = {},
  afterChange,
  filterItem,
  headerExtra,
  rowActions,
  baseFilter,
}: ResourcePageProps) {
  const [items, setItems] = useState<AdminRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<AdminRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(listPath);
      setItems(Array.isArray(data.data) ? data.data : []);
    } catch (error: unknown) {
      toast.error(errorMessage(error, `Could not load ${title.toLowerCase()}`));
    } finally {
      setLoading(false);
    }
  }, [listPath, title]);

  useEffect(() => {
    queueMicrotask(() => {
      void load();
    });
  }, [load]);

  const filteredItems = useMemo(() => {
    const baseItems = baseFilter ? items.filter(baseFilter) : items;
    const normalized = query.trim().toLowerCase();
    if (!normalized) return baseItems;
    if (filterItem) return baseItems.filter((item) => filterItem(item, normalized));
    return baseItems.filter((item) => JSON.stringify(item).toLowerCase().includes(normalized));
  }, [baseFilter, filterItem, items, query]);

  const activeFields = fields.filter((field) => !(editing && field.createOnly));
  const formDefaults = editing
    ? { ...initialForm, ...(normalizeItemToForm ? normalizeItemToForm(editing) : editing) }
    : initialForm;

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (item: AdminRecord) => {
    setEditing(item);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData(event.currentTarget);
      const form = activeFields.reduce<AdminRecord>((acc, field) => {
        acc[field.name] = coerceValue(field, formData.get(field.name));
        return acc;
      }, {});

      const mode = editing ? 'edit' : 'create';
      const payload = mapFormToPayload ? mapFormToPayload(form, mode, editing) : form;

      if (editing) {
        await api.put(updatePath ? updatePath(editing) : `${createPath || listPath}/${getId(editing)}`, payload);
        toast.success(`${title} updated`);
      } else {
        await api.post(createPath || listPath, payload);
        toast.success(`${title} created`);
      }

      closeForm();
      await load();
      afterChange?.();
    } catch (error: unknown) {
      toast.error(errorMessage(error, 'Save failed'));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: AdminRecord) => {
    const label = getTitle ? getTitle(item) : getId(item);
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;
    try {
      await api.delete(deletePath ? deletePath(item) : `${createPath || listPath}/${getId(item)}`);
      toast.success(`${title} deleted`);
      await load();
      afterChange?.();
    } catch (error: unknown) {
      toast.error(errorMessage(error, 'Delete failed'));
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">{kicker}</p>
          <h1 className="admin-title">{title}</h1>
          {description && <p className="admin-page-description">{description}</p>}
        </div>
        <div className="admin-header-actions">
          {headerExtra}
          <button type="button" className="admin-icon-button" onClick={load} aria-label="Refresh records">
            <RefreshCcw size={16} />
          </button>
          {allowCreate && (
            <button type="button" className="admin-button" onClick={openCreate}>
              <Plus size={15} /> {createLabel}
            </button>
          )}
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} />
        </div>
        <span className="admin-count">{filteredItems.length} RECORDS</span>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((column) => <th key={column.label}>{column.label}</th>)}
              {(allowEdit || allowDelete || rowActions) && <th aria-label="Actions" />}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="admin-empty"><Loader2 className="animate-spin" size={18} /> Loading records...</div>
                </td>
              </tr>
            ) : filteredItems.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="admin-empty">{emptyText}</div>
                </td>
              </tr>
            ) : filteredItems.map((item) => (
              <tr key={getId(item)}>
                {columns.map((column) => (
                  <td key={column.label} className={column.className}>{column.render(item)}</td>
                ))}
                {(allowEdit || allowDelete || rowActions) && (
                  <td>
                    <div className="admin-row-actions">
                      {rowActions?.(item, load)}
                      {allowEdit && (
                        <button type="button" className="admin-icon-button" onClick={() => openEdit(item)} aria-label={`Edit ${getTitle ? getTitle(item) : getId(item)}`}>
                          <Edit3 size={15} />
                        </button>
                      )}
                      {allowDelete && (
                        <button type="button" className="admin-icon-button admin-danger" onClick={() => remove(item)} aria-label={`Delete ${getTitle ? getTitle(item) : getId(item)}`}>
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeForm()}>
          <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="resource-form-title">
            <div className="admin-modal-header">
              <div>
                <p className="admin-kicker">{editing ? '[EDIT]' : '[CREATE]'}</p>
                <h2 id="resource-form-title" className="admin-section-title">{editing ? getTitle?.(editing) || 'Edit record' : createLabel}</h2>
              </div>
              <button type="button" className="admin-icon-button" onClick={closeForm} aria-label="Close form">
                <X size={17} />
              </button>
            </div>
            <form onSubmit={submit} className="admin-form-grid">
              {activeFields.map((field) => {
                const value = normalizeFormValue(field, getByPath(formDefaults, field.name));
                return (
                  <label key={field.name} className={`admin-field ${field.type === 'textarea' || field.type === 'json' ? 'admin-field-wide' : ''}`}>
                    <span className="admin-label">{field.label}</span>
                    {field.type === 'textarea' || field.type === 'json' ? (
                      <textarea
                        name={field.name}
                        defaultValue={String(value)}
                        rows={field.rows || (field.type === 'json' ? 8 : 4)}
                        required={field.required}
                        placeholder={field.placeholder}
                        className="admin-input"
                      />
                    ) : field.type === 'select' ? (
                      <select name={field.name} defaultValue={String(value)} required={field.required} className="admin-input">
                        <option value="">Select...</option>
                        {field.options?.map((option) => (
                          <option key={String(option.value)} value={String(option.value)}>{option.label}</option>
                        ))}
                      </select>
                    ) : field.type === 'checkbox' ? (
                      <span className="admin-check-row">
                        <input type="checkbox" name={field.name} defaultChecked={Boolean(value)} />
                        <span>Enabled</span>
                      </span>
                    ) : (
                      <input
                        name={field.name}
                        type={field.type || 'text'}
                        defaultValue={String(value)}
                        required={field.required}
                        placeholder={field.placeholder}
                        className="admin-input"
                      />
                    )}
                    {field.helper && <span className="admin-field-helper">{field.helper}</span>}
                  </label>
                );
              })}
              <div className="admin-modal-actions">
                <button type="button" className="admin-button admin-button-outline" onClick={closeForm}>Cancel</button>
                <button type="submit" className="admin-button" disabled={saving}>
                  {saving ? <Loader2 size={15} className="animate-spin" /> : null}
                  {saving ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
