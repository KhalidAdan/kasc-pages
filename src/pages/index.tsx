import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useMantineColorScheme } from "@mantine/core";
import { useRouter } from "next/router";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Pricing", href: "/pricing" },
];

export default function Home() {
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <div className="h-full ">
      <div className="px-6 pt-6 lg:px-8">
        <div>
          <nav
            className="flex h-9 items-center justify-between"
            aria-label="Global"
          >
            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Chisala</span>
                <img
                  className="h-8 rotate-[20deg]"
                  src={"/image.svg"}
                  alt="Pen and Pencil"
                />
              </a>
            </div>
            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="font-semibold">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end"></div>
          </nav>
        </div>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                  Data to enrich your online business
                </h1>
                <p className="leading-8sm:text-center mt-6 text-lg">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <button
                    type="button"
                    onClick={(e) => router.push("/authenticate")}
                    className="inline-flex items-center rounded-md border border-transparent bg-carolina-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-carolina-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Get Started
                    <ArrowRightIcon
                      className="ml-3 -mr-1 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
