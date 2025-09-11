import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: number | string;
  padding?: number | string;
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = "1200px",
  padding = "0 24px",
  style,
}) => {
  return (
    <div
      style={{ maxWidth, margin: "0 auto", padding, width: "100%", ...style }}
    >
      {children}
    </div>
  );
};

export default Container;
