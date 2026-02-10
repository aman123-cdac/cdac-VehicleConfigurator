import { useState, useCallback, useMemo, useEffect } from "react";

export const useVehicleConfig = (initialSelection = []) => {
  // Initialize state. If initialSelection is provided, convert to Set
  const [selectedIds, setSelectedIds] = useState(new Set(initialSelection));
  const [isSaving, setIsSaving] = useState(false);

  // Sync state if initialSelection changes (e.g., loading a template)
  useEffect(() => {
    if (initialSelection.length > 0) {
      setSelectedIds(new Set(initialSelection));
    }
  }, [initialSelection]);

  // Toggles component selection
  const toggleComponent = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const addComponent = useCallback((id) => {
    setSelectedIds((prev) => new Set([...prev, id]));
  }, []);

  const removeComponent = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // Renamed to match the call in Configurator.jsx
  const resetSelections = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isSelected = useCallback(
    (id) => {
      return selectedIds.has(id);
    },
    [selectedIds],
  );

  // Memoized array version for components that prefer arrays over Sets
  const selectedComponentsList = useMemo(() => {
    return Array.from(selectedIds);
  }, [selectedIds]);

  const getSelectedDetails = useCallback(
    (allComponents) => {
      return allComponents.filter((c) => selectedIds.has(c.id));
    },
    [selectedIds],
  );

  return {
    selectedIds,
    selectedComponents: selectedComponentsList,
    toggleComponent,
    addComponent,
    removeComponent,
    resetSelections, // Use this name in Configurator
    isSelected,
    getSelectedDetails,
    isSaving,
    setIsSaving,
  };
};
