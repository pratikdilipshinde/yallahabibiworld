import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full">
      
      {/* Desktop Image */}
      <div className="hidden md:block">
        <Image
          src="/images/YH-DYSTINCT-V2.jpg"
          alt="Hero Desktop"
          width={1920}
          height={800}
          className="w-full h-[100vh] object-cover"
          priority
        />
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden">
        <Image
          src="/images/YH-DYSTINCT-V1.jpg"
          alt="Hero Mobile"
          width={800}
          height={1000}
          className="w-full h-[100vh] object-cover"
          priority
        />
      </div>

    </section>
  );
}