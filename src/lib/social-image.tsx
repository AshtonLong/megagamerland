import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

interface SocialImageOptions {
  eyebrow: string;
  title: string;
  subtitle: string;
  accentLabel: string;
}

export function createSocialImage({
  eyebrow,
  title,
  subtitle,
  accentLabel,
}: SocialImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #0a0a08 0%, #141410 45%, #1c1610 100%)",
          color: "#f5f0e8",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-10%",
            background:
              "radial-gradient(circle at top right, rgba(212, 148, 76, 0.24), transparent 42%), radial-gradient(circle at bottom left, rgba(196, 122, 90, 0.22), transparent 38%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            background:
              "linear-gradient(180deg, rgba(10, 10, 8, 0.42), rgba(10, 10, 8, 0.08) 30%, rgba(10, 10, 8, 0.32) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  background:
                    "linear-gradient(135deg, #d4944c 0%, #c47a5a 100%)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  fontSize: 32,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                }}
              >
                {siteName}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: 999,
                border: "1px solid rgba(212, 148, 76, 0.28)",
                background: "rgba(212, 148, 76, 0.1)",
                padding: "12px 20px",
                fontSize: 22,
                fontWeight: 600,
                color: "#d4944c",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {accentLabel}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              maxWidth: 900,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#d4944c",
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 78,
                lineHeight: 1.04,
                fontWeight: 800,
                letterSpacing: "-0.05em",
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 31,
                lineHeight: 1.32,
                color: "#d7cab6",
                maxWidth: 920,
              }}
            >
              {subtitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(212, 148, 76, 0.16)",
              paddingTop: 22,
              fontSize: 24,
              color: "#bda98c",
            }}
          >
            <div style={{ display: "flex" }}>North Bay, Ontario</div>
            <div style={{ display: "flex" }}>Naturally oxidized since 1998</div>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
