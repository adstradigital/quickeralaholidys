// components/PackageView/PackageDetailClient.jsx
"use client";
import { useRouter } from "next/navigation";
import PackageView from "./PackageView";

export default function PackageDetailClient({ pkg }) {
  const router = useRouter();

  if (!pkg) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Package not found</h2>
        <button onClick={() => router.push("/packages")}>Back to Packages</button>
      </div>
    );
  }

  return (
    <PackageView package={pkg} onBack={() => router.back()} />
  );
}
