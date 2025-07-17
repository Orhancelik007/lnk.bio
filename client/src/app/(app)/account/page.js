import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";


export default async function AccountPage({ searchParams, ...rest }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;
  if (!session) {
    return redirect("/");
  }
  try {
    mongoose.connect(process.env.MONGO_URI);
    const page = await Page.findOne({ owner: session?.user?.email });
    if (page) {
      return (
        <>
          <PageSettingsForm page={page} user={session.user} />
          <PageButtonsForm page={page} user={session.user}/>
          <PageLinksForm page={page} user={session.user}/>
        </>
      );
    }
  } catch (e) {}

  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
}
