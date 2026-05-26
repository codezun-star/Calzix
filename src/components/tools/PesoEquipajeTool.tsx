import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatNumber } from '@/lib/utils/format';

interface Item {
  id: number;
  nombre: string;
  peso: string;
}

const LIMITES: Record<string, number> = {
  'facturado-20': 20,
  'facturado-23': 23,
  'facturado-32': 32,
  'cabina-8': 8,
  'cabina-10': 10,
};

const LIMITE_LABELS: Record<string, string> = {
  'facturado-20': 'Facturado 20 kg',
  'facturado-23': 'Facturado 23 kg',
  'facturado-32': 'Facturado 32 kg',
  'cabina-8': 'Cabina 8 kg',
  'cabina-10': 'Cabina 10 kg',
};

export default function PesoEquipajeTool() {
  const [items, setItems] = useState<Item[]>([{ id: 1, nombre: '', peso: '' }]);
  const [nextId, setNextId] = useState(2);
  const [limite, setLimite] = useState('facturado-23');

  function addItem() {
    setItems((prev) => [...prev, { id: nextId, nombre: '', peso: '' }]);
    setNextId((n) => n + 1);
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function updateItem(id: number, field: 'nombre' | 'peso', value: string) {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  }

  const pesoTotal = items.reduce((acc, it) => {
    const p = parseFloat(it.peso.replace(',', '.'));
    return acc + (isNaN(p) ? 0 : p);
  }, 0);

  const limiteKg = LIMITES[limite];
  const diferencia = limiteKg - pesoTotal;
  const exceso = diferencia < 0;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">
          Limite de la aerolinea
        </label>
        <select
          value={limite}
          onChange={(e) => setLimite(e.target.value)}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          {Object.entries(LIMITE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-[var(--color-text-secondary)]">Artículos del equipaje</p>
        {items.map((it, idx) => (
          <div key={it.id} className="flex gap-2 items-center">
            <input
              type="text"
              value={it.nombre}
              onChange={(e) => updateItem(it.id, 'nombre', e.target.value)}
              placeholder={`Artículo ${idx + 1}`}
              className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
            <div className="flex items-center gap-1 shrink-0">
              <input
                type="number"
                min="0"
                step="0.1"
                value={it.peso}
                onChange={(e) => updateItem(it.id, 'peso', e.target.value)}
                placeholder="kg"
                className="w-20 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
              <span className="text-xs text-[var(--color-text-muted)]">kg</span>
            </div>
            {items.length > 1 && (
              <button
                onClick={() => removeItem(it.id)}
                className="rounded-xl border border-[var(--color-border)] p-2 text-[var(--color-text-muted)] hover:text-red-500 hover:border-red-300 transition-colors"
                aria-label="Eliminar artículo"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addItem}
          className="flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-bg)] hover:border-[var(--color-accent)] transition-colors"
        >
          <Plus size={14} />
          Añadir artículo
        </button>
      </div>

      <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Peso total</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatNumber(pesoTotal, 2)} kg
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Límite</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {limiteKg} kg
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              {exceso ? 'Exceso' : 'Margen'}
            </p>
            <p className={`text-2xl font-extrabold ${exceso ? 'text-red-600' : 'text-green-600'}`}>
              {exceso ? '+' : ''}{formatNumber(Math.abs(diferencia), 2)} kg
            </p>
          </div>
        </div>

        {exceso && (
          <p className="text-sm text-red-600 font-medium text-center">
            Superas el límite en {formatNumber(Math.abs(diferencia), 2)} kg. Debes reducir tu equipaje.
          </p>
        )}
        {!exceso && pesoTotal > 0 && (
          <p className="text-sm text-green-700 text-center">
            Dentro del límite. Te quedan {formatNumber(diferencia, 2)} kg disponibles.
          </p>
        )}
      </div>
    </div>
  );
}
