import styles from "./Loader.module.css";


const Loader = () => {
  return (
    <div className={`${styles.lds_ellipsis}`} />
  );
};

export default Loader;
