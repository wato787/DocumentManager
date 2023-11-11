import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useMemo } from "react";
import PdfContent from "~/components/molucules/PdfContent";
import SearchBar from "~/components/organisms/SearchBar";
import PageHead from "~/components/templates/Head";
import LoadingScreen from "~/components/templates/LoadingScreen";
import PageLayout from "~/components/templates/PageLayout";
import { useCategory } from "~/hooks/trpc/useCategory";
import usePdfToImage from "~/hooks/usePdfToImage";

const demoArray = new Array(40).fill(0);

export default function Home() {
  const imgSrc = usePdfToImage("/demo.pdf");

  const { getAllCategories } = useCategory();

  const categories = getAllCategories.useQuery().data;
  const CategoryStatus = getAllCategories.useQuery().status;

  const isLoading = useMemo(() => {
    return CategoryStatus === "loading" && !imgSrc;
  }, [CategoryStatus, imgSrc]);

  return (
    <>
      <PageHead />

      {!isLoading ? (
        <PageLayout categories={categories}>
          <div className="px-12 pb-6">
            <div className="pt-6">
              <SearchBar isSearchInitialized={true} loading={!imgSrc} />
            </div>
            <div className="flex w-full flex-wrap items-center justify-between pt-4">
              {imgSrc && (
                <>
                  {demoArray.map((_, index) => (
                    <PdfContent src={imgSrc} title={"タイトル"} key={index} />
                  ))}
                </>
              )}
            </div>
          </div>
        </PageLayout>
      ) : (
        <LoadingScreen />
      )}
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
