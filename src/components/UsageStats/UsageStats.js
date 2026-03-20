const ProgressBar = ({ used, total, label }) => {
  const percentage = Math.min((used / total) * 100, 100);
  const color = percentage > 80 ? "#ff4d4f" : "#25d366";

  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          marginBottom: "4px",
        }}
      >
        <span>{label}</span>
        <span>
          {used} / {total}
        </span>
      </div>
      <div
        style={{
          width: "100%",
          bg: "#eee",
          height: "6px",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            backgroudColor: color,
            height: "100%",
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
