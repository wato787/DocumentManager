import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useMemo } from "react";
import PdfContent from "~/components/molucules/PdfContent";
import SearchBar from "~/components/organisms/SearchBar";
import PageHead from "~/components/templates/Head";
import PageLayout from "~/components/templates/PageLayout";
import { useCategory } from "~/hooks/trpc/useCategory";
import usePdfToImage from "~/hooks/usePdfToImage";
import { Status } from "~/types/status";

const demoArray = new Array(40).fill(0);

export default function Home() {
  const { data: session } = useSession();
  const imgSrc = usePdfToImage("/demo.pdf");

  const { getAllCategories } = useCategory();

  const categories = useMemo(() => {
    const res = getAllCategories.useQuery().data;
    if (!Array.isArray(res)) return [];
    const newData = [...res];

    newData.unshift({
      id: "All",
      name: "All",
      userId: session?.user.id as string,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newData;
  }, [getAllCategories, session?.user.id]);

  const CategoryStatus = getAllCategories.useQuery().status;

  const isLoading = useMemo(() => {
    return CategoryStatus === Status.LOADING && !imgSrc;
  }, [CategoryStatus, imgSrc]);

  return (
    <>
      <PageHead />

      <PageLayout categories={categories}>
        <div className="px-12 pb-6">
          <div className="pt-6">
            <SearchBar isSearchInitialized={true} loading={isLoading} />
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
  if (context.req.url === "/") {
    return {
      redirect: {
        destination: "/?categoryId=All",
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
