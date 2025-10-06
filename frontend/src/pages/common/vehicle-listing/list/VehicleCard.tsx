import React from "react";
import { Card, Flex, theme } from "antd";
import { Vehicle } from "@/common/types/vehicle.type";
import CarSeat from "@/assets/vehicles/car-seat.png";
import FuelType from "@/assets/vehicles/gas-station.png";
import Transmission from "@/assets/vehicles/manual-transmission.png";
import PricePerDay from "@/assets/vehicles/money.png";
import Deal from "@/assets/vehicles/deal.png";
import VImage from "@/assets/car-auth.jpg";
import { formatVND } from "@/common/utils/format";
import { useNavigate } from "react-router-dom";

interface VehicleCardProps {
  vehicle: Vehicle;
  selectedDates?: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  selectedDates,
}) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/vehicles/${vehicle._id}`, { state: { vehicle, selectedDates } });
  };

  const cardStyles: React.CSSProperties = {
    borderRadius: token.borderRadiusLG,
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    margin: token.marginMD,
    width: "100%",
    maxWidth: "400px", // hoặc 600px tuỳ UI
    backgroundColor: token.colorBgContainer,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: token.fontSizeHeading3,
    fontWeight: token.fontWeightStrong,
    color: token.colorText,
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
    paddingBottom: token.paddingSM,
    marginBottom: token.marginSM,
  };

  const contentStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: token.marginSM,
    fontSize: token.fontSize,
    color: token.colorTextSecondary,
  };

  const iconStyle: React.CSSProperties = {
    width: "24px",
    height: "24px",
    objectFit: "contain",
    flexShrink: 0,
  };

  const infoRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: token.marginXS,
  };

  const buttonStyles: React.CSSProperties = {
    backgroundColor: token.colorPrimary,
    color: token.colorWhite,
    border: "none",
    borderRadius: token.borderRadiusSM,
    padding: `${token.paddingXS}px ${token.paddingMD}px`,
    cursor: "pointer",
    fontSize: token.fontSize,
    fontWeight: 500,
    transition: "background-color 0.3s ease, transform 0.2s ease",
  };

  return (
    <Card
      hoverable
      style={cardStyles}
      styles={{ body: { padding: token.paddingMD } }}
      cover={
        <img
          alt={`${vehicle.make} ${vehicle.model}`}
          src={
            vehicle.files?.[0]
              ? `${import.meta.env.VITE_API_BASE_URL}${vehicle.files[0]}`
              : VImage
          }
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: token.borderRadiusLG,
            borderTopRightRadius: token.borderRadiusLG,
          }}
          onError={(e) => (e.currentTarget.src = VImage)}
        />
      }
      title={
        <div style={titleStyles}>
          {vehicle.make} {vehicle.model}
        </div>
      }
    >
      <div style={contentStyles}>
        <Flex wrap="wrap" gap={token.marginSM}>
          <Flex align="center" gap={token.marginXS} style={{ flex: "1 1 45%" }}>
            <img src={Transmission} alt="Transmission" style={iconStyle} />
            <span>{vehicle.transmission}</span>
          </Flex>
          <Flex align="center" gap={token.marginXS} style={{ flex: "1 1 45%" }}>
            <img src={FuelType} alt="Fuel Type" style={iconStyle} />
            <span>{vehicle.fuelType}</span>
          </Flex>
          <Flex align="center" gap={token.marginXS} style={{ flex: "1 1 45%" }}>
            <img src={CarSeat} alt="Seats" style={iconStyle} />
            <span>{vehicle.seats ?? "N/A"} seats</span>
          </Flex>
          <Flex align="center" gap={token.marginXS} style={{ flex: "1 1 45%" }}>
            <img src={Deal} alt="Trip Count" style={iconStyle} />
            <span>{vehicle.bookingCount ?? 0}+ rented</span>
          </Flex>
        </Flex>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: token.paddingSM,
            borderTop: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <div style={infoRowStyle}>
            <img src={PricePerDay} alt="Price" style={iconStyle} />
            <span
              style={{
                fontWeight: 500,
                color: token.colorPrimary,
                fontSize: token.fontSizeHeading4,
              }}
            >
              {formatVND(vehicle.pricePerDay) ?? "N/A"}/day
            </span>
          </div>
        </div>
        <button
          style={buttonStyles}
          onClick={handleClick}
          onMouseOver={(e) =>
            Object.assign(e.currentTarget.style, {
              backgroundColor: token.colorPrimaryHover,
              transform: "scale(1.05)",
            })
          }
          onMouseOut={(e) =>
            Object.assign(e.currentTarget.style, {
              backgroundColor: token.colorPrimary,
              transform: "scale(1)",
            })
          }
          onFocus={(e) =>
            Object.assign(e.currentTarget.style, {
              outline: `2px solid ${token.colorPrimaryBorder}`,
            })
          }
          onBlur={(e) =>
            Object.assign(e.currentTarget.style, { outline: "none" })
          }
        >
          Rent now
        </button>
      </div>
    </Card>
  );
};

export default VehicleCard;
