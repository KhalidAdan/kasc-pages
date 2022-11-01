export default function AppLayout({ children }) {
  return (
    <>
      <div className="grid h-screen w-screen place-content-center uppercase italic md:hidden">
        Mobile site coming soon!
      </div>
      <div className="hidden md:block">
        <div className="h-full pb-40 font-[Lora]">{children}</div>
      </div>
    </>
  );
}
