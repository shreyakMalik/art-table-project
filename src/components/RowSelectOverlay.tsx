import { useState } from 'react';
import type { Artwork } from '../types';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';

interface Props {
  artworks: Artwork[];
  selectedIds: Set<number>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const RowSelectOverlay = ({ artworks, selectedIds, setSelectedIds }: Props) => {
  const [count, setCount] = useState<number | null>(null);

  const handleApply = () => {
    if (!count || count <= 0) return;

    const newSelected = new Set(selectedIds);
    const available = artworks.filter(a => !newSelected.has(a.id));

    available.slice(0, count).forEach(a => newSelected.add(a.id));
    setSelectedIds(newSelected);
  };

  return (
    <div style={{ width: 220 }}>
      <h4>Select rows</h4>
      <InputNumber
        value={count}
        onValueChange={(e) => setCount(e.value ?? null)}
        placeholder="Enter number"
        style={{ width: '100%' }}
      />
      <Button
        label="Apply"
        className="p-button-sm p-button-primary"
        style={{ marginTop: '0.5rem' }}
        onClick={handleApply}
      />
    </div>
  );
};

export default RowSelectOverlay;
