import { getSession } from "@/actions/session";
import LogoutBtn from "@/components/LogoutBtn";
import { ExtendedSession } from "@/lib/session";
import { redirect } from "next/navigation";

interface NavbarProps {
  session: ExtendedSession;
}

const Profile = async () => {
  const res = await getSession();
  if (!res.isLoggedIn) {
    redirect("/users/login");
  }

  return (
    <div>
      <h2>
        {res.firstName}
        &nbsp;
        {res.lastName}
      </h2>
      <LogoutBtn />
    </div>
  );
};

export default Profile;
