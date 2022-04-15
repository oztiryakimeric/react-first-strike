import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { PropTypes } from "prop-types";

const OverlayContext = createContext({
  overlay: null,
  queue: [],
  open: false,
});

export function OverlayContextProvider({ children }) {
  const [overlay, setOverlay] = useState();
  const [queue, setQueue] = useState([]);
  const [open, setOpen] = useState();

  useEffect(() => {
    if (queue.length && open) {
      setOpen(false);
    } else if (queue.length) {
      const [firstItem, ...rest] = queue;
      setOverlay({ ...firstItem });
      setQueue(rest);
      setOpen(true);
    }
  }, [queue]);

  const contextValue = useMemo(() => {
    const show =
      (type) =>
      ({ id, props }) =>
        setQueue((prev) => [...prev, { type, id, props }]);
    return {
      overlay,
      open,
      showDialog: show("dialog"),
      showDrawer: show("drawer"),
      hide: () => setOpen(false),
      handleExited: () => {
        if (queue.length) {
          const [firstItem, ...rest] = queue;
          setOverlay({ ...firstItem });
          setQueue(rest);
          setOpen(true);
        } else {
          setOverlay(null);
        }
      },
    };
  }, [overlay?.id, open]);

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}
    </OverlayContext.Provider>
  );
}

OverlayContextProvider.defaultProps = {
  children: null,
};

OverlayContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const useOverlay = () => useContext(OverlayContext);
