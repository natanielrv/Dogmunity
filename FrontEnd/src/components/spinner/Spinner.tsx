import './spinner.css';

/**
 * The Spinner function is a React component that displays a loading spinner with customizable height.
 */
const Spinner = ({ fullPage = "none" }: { fullPage?: string | boolean }) => {
  return (
    <div style={{ height: fullPage === false ? '100vh' : fullPage === true ? '100vh' : fullPage }} className="fallback-spinner">
      <div className="loading component-loader">
        <div className="effect-1 effects" />
        <div className="effect-2 effects" />
        <div className="effect-3 effects" />
      </div>
    </div>
  );
};

export default Spinner;