import { ImageResponse } from "next/og";
import { ME } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${ME.name} — ${ME.title}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", background: "#0c0e11", color: "#e9ecef",
          padding: 72, fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#99a1a9", letterSpacing: 2 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#3f9d6d" }} />
          OPEN TO WORK · CHICAGO, IL
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 900, letterSpacing: -4, lineHeight: 1 }}>Vikas</div>
          <div style={{ fontSize: 112, fontWeight: 900, letterSpacing: -4, lineHeight: 1 }}>Chowdary</div>
          <div style={{ fontSize: 32, color: "#d4483a", marginTop: 26, letterSpacing: 3 }}>
            {ME.title.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#99a1a9" }}>
          eqlTab · eqlShare · Leash — built end to end
        </div>
      </div>
    ),
    size
  );
}
