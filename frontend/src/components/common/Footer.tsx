import React from "react";
import { Flex, Button } from "antd";
import { Link } from "react-router-dom";
import FacebookFilled from "@ant-design/icons/lib/icons/FacebookFilled";
import InstagramFilled from "@ant-design/icons/lib/icons/InstagramFilled";
import TikTokFilled from "@ant-design/icons/lib/icons/TikTokFilled";
import YoutubeFilled from "@ant-design/icons/lib/icons/YoutubeFilled";
const Footer = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <Flex justify="center" align="center" gap="6rem">
        <div>
          <Flex gap="middle" vertical align="flex-start">
            <span style={{ fontWeight: "bold" }}>CAR RENTAL</span>
            <span>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/about"
              >
                About us
              </Link>
            </span>
            <span>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/team"
              >
                Team
              </Link>
            </span>
            <span>Policies</span>
            <span>Careers</span>
          </Flex>
        </div>
        <div>
          <Flex gap="middle" vertical align="flex-start">
            <span style={{ fontWeight: "bold" }}>Explore</span>
            <span>Why choose CAR RENTAL</span>
            <span>Pitch a trip</span>
            <span>Trust & safety</span>
            <span>Get help</span>
          </Flex>
        </div>
        <div>
          <Flex style={{ fontSize: "2rem" }} gap="middle" align="flex-start">
            <FacebookFilled />
            <InstagramFilled />
            <TikTokFilled />
            <YoutubeFilled />
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default Footer;
