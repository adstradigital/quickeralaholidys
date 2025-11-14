// /packages/[id]/page.js
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import packagesData from "@/components/Data/PackageData";
import PackageView from "@/components/PackageView/PackageView";
import PackageDetailClient from "@/components/PackageView/PackageClientDetail";

// Required for SSG/Output: Export
export function generateStaticParams() {
  return packagesData.map(pkg => ({ id: pkg.id.toString() }));
}

export default function PackageDetailPage({ params }) {
  const packageId = parseInt(params.id);
  const pkg = packagesData.find(p => p.id === packageId);

  return (
    <>
      <Header />
      <PackageDetailClient pkg={pkg} />
      <Footer />
    </>
  );
}
