import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div>
      <div className={styles['c-loader']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
