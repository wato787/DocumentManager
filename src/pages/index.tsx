import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { Toaster } from "react-hot-toast";
import FileList from "~/components/organisms/FileList";
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

  // TODO: ここでuseQueryを使っているので、useQueryのstatusを使ってローディング中かどうかを判定する
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

  const isLoading = useCallback((): boolean => {
    const fileStatus = getFiles.useQuery().status;
    const categoryStatus = getAllCategories.useQuery().status;
    return fileStatus === Status.LOADING || categoryStatus === Status.LOADING;
  }, [getFiles, getAllCategories]);

  return (
    <>
      <PageHead />

      <PageLayout categories={getCategories()} loading={isLoading()}>
        <Toaster />
        <div className="px-12 pb-6">
          <div className="pt-6">
            <SearchBar />
          </div>
          <FileList files={files} />
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
