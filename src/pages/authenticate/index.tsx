import TopNav from "@/components/TopNav";
import { Button } from "@mantine/core";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AuthHome: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="grid place-items-center">Loading...</div>;
  }
  if (status === "authenticated") router.push(`/projects`);

  return (
    <main className="h-full ">
      <TopNav authenticated={false} />
      <div className="flex min-h-full flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
            Log in or Claim your account
          </h2>
          <p className="mx-10 mt-8 text-sm">
            As we are in Beta, we use other login providers to guarantee less
            risk to users, we will have an email sign up in the future!
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className=" space-y-4 py-8 px-4 sm:rounded-lg sm:px-10 ">
            <div>
              <Button
                component="a"
                href="#"
                variant="subtle"
                onClick={() =>
                  signIn("discord", {
                    callbackUrl: "/projects",
                  })
                }
                className="-sm inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-600 py-2 px-4 text-sm  font-medium"
              >
                <span className="sr-only">Sign in with Discord</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  viewBox="0 0 71 55"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#a)">
                    <path d="M60.105 4.898A58.55 58.55 0 0 0 45.653.415a.22.22 0 0 0-.233.11 40.784 40.784 0 0 0-1.8 3.697c-5.456-.817-10.886-.817-16.23 0-.485-1.164-1.201-2.587-1.828-3.697a.228.228 0 0 0-.233-.11 58.386 58.386 0 0 0-14.451 4.483.207.207 0 0 0-.095.082C1.578 18.73-.944 32.144.293 45.39a.244.244 0 0 0 .093.167c6.073 4.46 11.955 7.167 17.729 8.962a.23.23 0 0 0 .249-.082 42.08 42.08 0 0 0 3.627-5.9.225.225 0 0 0-.123-.312 38.772 38.772 0 0 1-5.539-2.64.228.228 0 0 1-.022-.378c.372-.279.744-.569 1.1-.862a.22.22 0 0 1 .23-.03c11.619 5.304 24.198 5.304 35.68 0a.219.219 0 0 1 .233.027c.356.293.728.586 1.103.865a.228.228 0 0 1-.02.378 36.384 36.384 0 0 1-5.54 2.637.227.227 0 0 0-.121.315 47.249 47.249 0 0 0 3.624 5.897.225.225 0 0 0 .249.084c5.801-1.794 11.684-4.502 17.757-8.961a.228.228 0 0 0 .092-.164c1.48-15.315-2.48-28.618-10.497-40.412a.18.18 0 0 0-.093-.084Zm-36.38 32.427c-3.497 0-6.38-3.211-6.38-7.156 0-3.944 2.827-7.156 6.38-7.156 3.583 0 6.438 3.24 6.382 7.156 0 3.945-2.827 7.156-6.381 7.156Zm23.593 0c-3.498 0-6.38-3.211-6.38-7.156 0-3.944 2.826-7.156 6.38-7.156 3.582 0 6.437 3.24 6.38 7.156 0 3.945-2.798 7.156-6.38 7.156Z" />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path d="M0 0h71v55H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </Button>
            </div>

            {/* <div>
              <a
                href="#"
                onClick={() => signIn("twitter", {
            callbackUrl: "/projects",
          })}
                className="-sm inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-600 py-2 px-4 text-sm  font-medium"
              >
                <span className="sr-only">Sign in with Twitter</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div> */}

            <div>
              <Button
                component="a"
                variant="subtle"
                href="#"
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/projects",
                  })
                }
                className="-sm inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-600 py-2 px-4 text-sm  font-medium"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  viewBox="0 0 56 56"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M51.981 24.481c-7.717-.004-15.435-.002-23.152 0 .001 3.2-.004 6.401.002 9.6h13.407c-.518 3.068-2.34 5.873-4.926 7.6-1.625 1.093-3.492 1.802-5.416 2.139-1.938.33-3.94.373-5.872-.018a14.452 14.452 0 0 1-5.477-2.365 15.287 15.287 0 0 1-5.639-7.555c-1.048-3.079-1.056-6.505.005-9.58a15.266 15.266 0 0 1 3.57-5.8c1.986-2.033 4.567-3.486 7.348-4.082a14.57 14.57 0 0 1 7.223.294 13.333 13.333 0 0 1 5.305 3.116c1.512-1.503 3.017-3.016 4.527-4.523.792-.81 1.624-1.586 2.39-2.42-2.292-2.121-4.98-3.827-7.917-4.905-5.287-1.946-11.25-1.987-16.572-.145C14.79 7.891 9.682 12.377 6.85 18.046a24.477 24.477 0 0 0-2.138 6.184c-1.088 5.343-.33 11.04 2.135 15.908a24.788 24.788 0 0 0 6.684 8.215 24.487 24.487 0 0 0 8.94 4.508c4.098 1.099 8.46 1.074 12.586.135 3.728-.858 7.256-2.64 10.073-5.24 2.977-2.736 5.1-6.34 6.224-10.214 1.227-4.225 1.396-8.736.627-13.06z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthHome;
