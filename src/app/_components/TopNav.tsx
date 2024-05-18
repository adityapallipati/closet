import { SignIn, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"; 
import { SimpleUploadButton } from "./simple-upload-button";
// import { UploadButton } from "~/utils/uploadthing";

export function TopNav() {

    return (
      <nav className="flex w-full items-center justify-between p-4 text-xl font-bold gap-4">
        <div>
          <button>
            CLOSET
          </button>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <SignedOut>
            <SignInButton>
              <div>
                <button>SIGN IN</button>
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
             <SimpleUploadButton />
            <UserButton/>
        </SignedIn>
        </div>
      </nav>
    );
  }