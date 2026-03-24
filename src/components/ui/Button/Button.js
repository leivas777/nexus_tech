import styles from "./Button.module.css";

/**
 * A reusable Button component with a loading spinner state.
 *
 * @param {boolean} isLoading - Shows a spinner and disables the button if true.
 * @param {string} variant - 'primary', 'secondary', 'danger', 'ghost'.
 * @param {string} size - 'small', 'medium', 'large'.
 * @param {React.ReactNode} children - Button text or elements.
 * @param {object} props - Other standard button attributes (onClick, type, etc.).
 */
const Button = ({
  isLoading = false,
  variant = "primary",
  size = "medium",
  children,
  className,
  disabled,
  ...props
}) => {
  // Determine CSS classes based on props
  const buttonClasses = [
    styles.btn,
    styles[variant] || styles.primary,
    styles[size] || styles.medium,
    isLoading ? styles.loading : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <span className={styles.spinner} aria-hidden="true"></span>}
      <span className={styles.content}>{children}</span>
    </button>
  );
};

export default Button;
