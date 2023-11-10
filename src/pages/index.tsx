import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import PdfContent from "~/components/molucules/PdfContent";
import SearchBar from "~/components/organisms/SearchBar";
import PageHead from "~/components/templates/Head";
import PageLayout from "~/components/templates/PageLayout";
import usePdfToImage from "~/hooks/usePdfToImage";

const demoArray = new Array(40).fill(0);

export default function Home() {
  const imgSrc = usePdfToImage("/demo.pdf");
  return (
    <>
      <PageHead />
      <PageLayout>
        <div className="px-12 pb-6">
          <div className="pt-6">
            <SearchBar isSearchInitialized={true} />
          </div>
          <div className="flex w-full flex-wrap items-center justify-between pt-4">
            {demoArray.map((_, index) => (
              <PdfContent src={imgSrc} title={"タイトル"} key={index} />
            ))}
          </div>
        </div>
      </PageLayout>
      {/* <LoadingScreen /> */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
