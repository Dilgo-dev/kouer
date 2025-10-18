import Image from "next/image";
import Link from "next/link";

export function ProductsHeader() {
  return (
    <header className="relative h-[200px] w-full">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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
        <nav aria-label="Fil d'Ariane" className="flex flex-col gap-[10px]">
          <ol className="flex items-center gap-[5px]">
            <li>
              <div className="flex items-center gap-[5px]">
                <span className="w-[20px] h-[20px] bg-zinc-100 rounded-[30px] flex items-center justify-center">
                  <Image
                    src="/icons/chevron-left.svg"
                    alt=""
                    width={5}
                    height={10}
                    aria-hidden="true"
                  />
                </span>
                <span className="w-[20px] h-[20px] flex items-center justify-center">
                  <Image
                    src="/icons/home.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-full h-full"
                    aria-hidden="true"
                  />
                </span>
                <Link
                  href="/"
                  className="font-poppins font-medium text-[14px] text-white leading-[0] whitespace-nowrap"
                >
                  Accueil
                </Link>
              </div>
            </li>
            <li className="flex items-start gap-px font-poppins font-medium text-[14px] text-white leading-[0] whitespace-nowrap">
              <span aria-hidden="true">/</span>
              <span aria-current="page">Tous les produits</span>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col justify-center py-[10px] flex-grow">
          <h1 className="font-poppins font-medium text-6xl text-white leading-[70px] max-w-[600px]">
            Tous nos produits
          </h1>
        </div>
      </div>
    </header>
  );
}
