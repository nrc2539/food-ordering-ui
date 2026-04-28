"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import { Mitr } from "next/font/google";

const mirt = Mitr({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});
export default function CustomAntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: mirt.style.fontFamily,
          },
          components: {
            Table: {
              headerBg: "#ededed",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
