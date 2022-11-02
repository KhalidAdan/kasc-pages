import { classNames } from "@/utils/classNames";
import { useMantineColorScheme } from "@mantine/core";

export default function AppLayout({ children }) {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <div className="h-full">
      <div className="grid h-screen w-screen place-content-center uppercase italic md:hidden">
        Mobile site coming soon!
      </div>
      <div
        className={classNames(
          dark ? "bg-onyx-800 font-[Lora]" : "font-[Lora] text-onyx-800",
          "hidden h-full md:block"
        )}
      >
        {children}
      </div>
    </div>
  );
}
