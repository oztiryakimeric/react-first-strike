import { useEffect } from "react";
import PropTypes from "prop-types";

import { logEvent } from "common/firebase/Firebase";

function TrackedComponent({ children, event, params }) {
  useEffect(() => {
    logEvent(event, params);
  }, []);

  return children;
}

TrackedComponent.defaultProps = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default TrackedComponent;
