import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Logged from "./Logged";
export default async function Nav() {
  const session = await getServerSession(authOptions);
  // Test
//   console.log(session);

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-bold text-lg ">Send it.</h1>
        {/* Client Component */}
      </Link>

      <ul className="flex items-center gap-6">
        {/* Only show login screen if there is no user signed in */}
        {!session?.user && <Login/>}
        {/* If the user is logged in: */}
        {session?.user && <Logged image={session.user?.image || ""}/> }
      </ul>
    </nav>
  );
}
