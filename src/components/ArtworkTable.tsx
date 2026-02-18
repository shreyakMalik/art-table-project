import { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import type { Artwork } from '../types';
import { fetchArtworks } from '../api';
import RowSelectOverlay from './RowSelectOverlay';

const ROWS_PER_PAGE = 12;

const ArtworkTable = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔑 persistent selection
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [deselectedIds, setDeselectedIds] = useState<Set<number>>(new Set());

  const overlayRef = useRef<OverlayPanel>(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    fetchArtworks(page)
      .then(res => {
        if (!isMounted) return;
        setArtworks(res.data);
        setTotalRecords(res.pagination.total);
      })
      .catch(console.error)
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [page]);

  const handleSelectionChange = (selectedRows: Artwork[]) => {
    const newSelected = new Set(selectedIds);
    const newDeselected = new Set(deselectedIds);

    const pageIds = artworks.map(a => a.id);
    const selectedOnPage = new Set(selectedRows.map(a => a.id));

    pageIds.forEach(id => {
      if (selectedOnPage.has(id)) {
        newSelected.add(id);
        newDeselected.delete(id);
      } else {
        newSelected.delete(id);
        newDeselected.add(id);
      }
    });

    setSelectedIds(newSelected);
    setDeselectedIds(newDeselected);
  };

  const selectedRows = artworks.filter(a => selectedIds.has(a.id));

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <Button
          label="Custom Select"
          icon="pi pi-sliders-h"
          disabled={loading}
          onClick={(e) => overlayRef.current?.toggle(e)}
        />
      </div>

      <OverlayPanel ref={overlayRef}>
        <RowSelectOverlay
          artworks={artworks}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </OverlayPanel>

      <DataTable
        value={artworks}
        loading={loading}
        paginator
        lazy
        rows={ROWS_PER_PAGE}
        totalRecords={totalRecords}
        first={(page - 1) * ROWS_PER_PAGE}
        onPage={(e) => {
          if (typeof e.page === 'number') {
            setPage(e.page + 1);
          }
        }}
        dataKey="id"
        selectionMode="checkbox"
        selection={selectedRows}
        onSelectionChange={(e) => handleSelectionChange(e.value)}
        emptyMessage={loading ? 'Loading artworks…' : 'No artworks found'}
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Year" />
        <Column field="date_end" header="End Year" />
      </DataTable>
    </>
  );
};

export default ArtworkTable;
