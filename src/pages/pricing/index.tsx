import TopNav from "@/components/TopNav";
import { classNames } from "@/utils/classNames";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useMantineColorScheme } from "@mantine/core";

const includedFeatures = [
  "Publish private links for sharing and reviewing",
  "Export work as HTML, PDF, or Word",
  "Reduced Pricing for Students",
  "Schedule and Publish writing snippets to instagram and twitter",
  "Focused writing mode",
];

export default function Example() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <div
      className={classNames(dark ? "h-screen  dark:bg-onyx-900" : "h-screen ")}
    >
      <TopNav />
      <div className="mt-8"></div>
      <div className="pt-12 sm:pt-16 lg:pt-0">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight  sm:text-4xl lg:text-5xl">
              Simple no-tricks pricing
            </h1>
            <p className="mt-4 text-xl ">
              If you&apos;re not satisfied, contact us within the first 14 days
              and we&apos;ll send you a full refund.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
        <div className="">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg overflow-hidden lg:flex lg:max-w-none">
              <div className="flex-1  px-6 py-8 lg:p-12">
                <h2 className="mt-6 text-base ">
                  Get a focused writing app that helps you write and share your
                  work.
                </h2>
                <div className="mt-8">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0  pr-4 text-base font-semibold text-carolina-blue-500">
                      What&apos;s included
                    </h4>
                    <div
                      className={classNames(
                        dark ? "border-gray-700" : "border-gray-200",
                        "flex-1 border-t-2"
                      )}
                    />
                  </div>
                  <ul
                    role="list"
                    className="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0"
                  >
                    {includedFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start lg:col-span-1"
                      >
                        <div className="flex-shrink-0">
                          <CheckCircleIcon
                            className="h-5 w-5 text-carolina-blue-500"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="ml-3 text-sm ">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className=" py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
                <h4 className="text-lg font-medium leading-6 ">
                  Monthly pricing
                </h4>
                <div className="mt-4 flex items-center justify-center text-5xl font-bold tracking-tight ">
                  <span>$4</span>
                  <span className="ml-2 text-xl font-medium tracking-normal ">
                    .00
                  </span>
                </div>

                <div className="mt-6">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-carolina-blue-500 px-5 py-3 text-base font-medium text-white hover:bg-carolina-blue-700 "
                    >
                      Start scribbling
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
