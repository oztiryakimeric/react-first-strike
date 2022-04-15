import PropTypes from "prop-types";
import { useUser } from "context/UserContext";

function Restricted({ children }) {
  const { loading, user } = useUser();

  if (!loading && user?.uid) {
    return children;
  }
  return null;
}

Restricted.defaultProps = {
  children: null,
};

Restricted.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Restricted;
