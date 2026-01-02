import "./ButtonWithIconAndTitle.css";

const ButtonWithIconAndTitle = ({
  height = "40px",
  width = "100%",
  background_color = "var(--primary-button-color)",
  icon,
  title = "Button",
  onClick,
}) => {
  return (
    <div
      className="button-with-icon-and-title-container"
      onClick={onClick}
      style={{
        height: height,
        width: width,
        "--button-background-color": background_color,
      }}
    >
      {icon}
      {title}
    </div>
  );
};

export default ButtonWithIconAndTitle;
