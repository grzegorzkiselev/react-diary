import "./CardButton.css";

function CardButton({ children, className, ...props }) {
  const cl = "card-button" + (className ? " " + className : "");
  return <button className={cl} {...props}>{children}</button>;
}

export default CardButton;