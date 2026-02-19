import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';

interface Props {
  setBulkRemaining: React.Dispatch<React.SetStateAction<number>>;
}

const RowSelectOverlay = ({ setBulkRemaining }: Props) => {
  const [count, setCount] = useState<number | null>(null);

  const handleApply = () => {
    if (!count || count <= 0) return;
    setBulkRemaining(count);
  };

  return (
    <div style={{ width: 220, overflow: 'hidden' }}>
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
        style={{ marginTop: '0.5rem', width: '100%' }}
        onClick={handleApply}
      />
    </div>
  );
};

export default RowSelectOverlay;
