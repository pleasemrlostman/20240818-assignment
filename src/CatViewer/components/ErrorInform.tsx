import styles from "../style/CatViewer.module.css";

interface ErrorInformProps {
  refetch: () => void;
}

const ErrorInform = ({ refetch }: ErrorInformProps) => {
  return (
    <div className={styles.errorInform}>
      <p>There is a network error. Please request again.</p>
      <button
        onClick={() => {
          refetch();
        }}
      >
        restart
      </button>
    </div>
  );
};

export default ErrorInform;
