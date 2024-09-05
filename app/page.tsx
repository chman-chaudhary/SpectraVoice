import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();

  return (
    <div>
      {session ? (
        <div className="space-x-10 p-10">
          <LogoutLink>
            <Button>Log out</Button>
          </LogoutLink>
        </div>
      ) : (
        <div className="space-x-10 p-10">
          <RegisterLink>
            <Button>Sign up</Button>
          </RegisterLink>
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
        </div>
      )}
    </div>
  );
}
