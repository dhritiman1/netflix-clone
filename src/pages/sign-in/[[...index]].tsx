import { MainLayout } from "@/component/mainLayout";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <MainLayout title="Sign In">
      <section className="m-24">
        <SignIn
          appearance={{
            layout: {
              socialButtonsVariant: "iconButton",
              showOptionalFields: false,
            },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            baseTheme: dark,
            variables: {
              colorPrimary: "rgb(229, 9, 20)",
              colorText: "#eeeeee",
            },
            elements: {
              headerSubtitle: "hidden",
              card: "rounded-none",
            },
          }}
        />
      </section>
    </MainLayout>
  );
}
