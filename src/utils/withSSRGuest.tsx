import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

/**
 * usada em páginas que só serão acessadas por visitantes
 * - caso o usuário já esteja logado, vai ser redirecionado
 * para a página de Dashboard.
 */
export function withSSRGuest<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (cookies["@genesis_express.token"]) {
      return {
        redirect: {
          destination: "/welcome",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
