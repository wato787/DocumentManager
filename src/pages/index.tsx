import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useCallback } from "react";
import SearchBar from "~/components/organisms/SearchBar";
import PageHead from "~/components/templates/Head";
import PageLayout from "~/components/templates/PageLayout";
import { useCategory } from "~/hooks/trpc/useCategory";

export default function Home() {
  const { data: session } = useSession();

  const { getAllCategories } = useCategory();
  const CategoryStatus = getAllCategories.useQuery().status;

  const getCategories = useCallback(() => {
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

  // const isLoading = useMemo((): boolean => {
  //   return CategoryStatus === Status.LOADING && !imgSrc;
  // }, [CategoryStatus, imgSrc]);

  return (
    <>
      <PageHead />

      <PageLayout categories={getCategories()}>
        <div className="px-12 pb-6">
          <div className="pt-6">
            <SearchBar isSearchInitialized={true} loading={false} />
          </div>
          <div className="flex w-full flex-wrap items-center justify-between pt-4">
            {/* {imgSrc && (
              <>
                {demoArray.map((_, index) => (
                  <PdfContent src={imgSrc} title={"タイトル"} key={index} />
                ))}
              </>
            )} */}
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
