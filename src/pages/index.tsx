import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import PdfContent from "~/components/molucules/PdfContent";
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
        <div className="p-5">
          <div className="flex w-full flex-wrap justify-center gap-5">
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
