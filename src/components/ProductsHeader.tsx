import Image from "next/image";
import Link from "next/link";

export function ProductsHeader() {
  return (
    <div className="relative h-[200px] w-full">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/background-header.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.55)] to-[rgba(0,0,0,0)]" />
      </div>

      <div className="relative flex flex-col justify-between h-full px-[40px] py-[20px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex gap-[5px] items-center">
            <div className="w-[20px] h-[20px] bg-zinc-100 rounded-[30px] flex items-center justify-center">
              <Image
                src="/icons/chevron-left.svg"
                alt=""
                width={5}
                height={10}
              />
            </div>
            <div className="w-[20px] h-[20px]">
              <Image
                src="/icons/home.svg"
                alt=""
                width={20}
                height={20}
                className="w-full h-full"
              />
            </div>
            <div className="flex items-center gap-px">
              <div className="flex items-center gap-px">
                <Link
                  href="/"
                  className="font-poppins font-medium text-[14px] text-white leading-[0] whitespace-nowrap"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Accueil
                </Link>
              </div>
              <div
                className="flex items-start gap-px font-poppins font-medium text-[14px] text-white leading-[0] whitespace-nowrap"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                <span>/</span>
                <span>Tous les produits</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center py-[10px] flex-grow">
          <h1
            className="font-poppins font-medium text-[60px] text-white leading-[70px] max-w-[600px]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Tous nos produits
          </h1>
        </div>
      </div>
    </div>
  );
}
