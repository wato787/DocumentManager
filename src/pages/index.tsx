import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import PdfContent from "~/components/molucules/PdfContent";
import SearchBar from "~/components/organisms/SearchBar";
import PageHead from "~/components/templates/Head";
import PageLayout from "~/components/templates/PageLayout";
import { useCategory } from "~/hooks/trpc/useCategory";
import { useFile } from "~/hooks/trpc/useFile";
import { getServerAuthSession } from "~/server/auth";
import { Status } from "~/types/status";

export default function Home() {
  const { data: session } = useSession();
  const { getAllCategories } = useCategory();
  const { getFiles } = useFile();

  const files = getFiles.useQuery().data;

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

  const isLoading = useMemo((): boolean => {
    const fileStatus = getFiles.useQuery().status;
    const categoryStatus = getAllCategories.useQuery().status;
    return fileStatus === Status.LOADING || categoryStatus === Status.LOADING;
  }, [getFiles, getAllCategories]);

  return (
    <>
      <PageHead />

      <PageLayout categories={getCategories()} loading={isLoading}>
        <div className="px-12 pb-6">
          <div className="pt-6">
            <SearchBar isSearchInitialized={true} />
          </div>
          <div className="flex w-full flex-wrap gap-4 pt-4">
            {files && (
              <>
                {files.map((file, index) => (
                  <PdfContent
                    jpgUrl={file.jpgUrl}
                    pdfUrl={file.pdfUrl}
                    title={file.name}
                    key={index}
                  />
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
  const session = await getServerAuthSession(context);

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
