import { Container } from "../../components/Container/Container";
import { useLocation } from "react-router";
import { useContext, useEffect } from "react";
import {
  ERROR_RESULTUSERS,
  IStoreContext,
  START_RESULTUSERS,
  StoreContext,
  SUCCESS_RESULTUSERS,
} from "../../store";
import Loading from "../../components/Loading/Loading";
import { Empty } from "../../components/Empty/Empty";
import { urlGithub } from "../../config/url";
import List from "../../components/List/List";
import User from "../../components/User/User";
import { IUserGithub } from "../../types/github";

interface Context {
  state: IStoreContext;
  dispatch: any;
}

export function Home() {
  const location = useLocation();
  const {
    state: {
      users: { data, currentSearch, loading },
    },
    dispatch,
  } = useContext(StoreContext) as unknown as Context;

  const fetchData = async () => {
    console.log(location.search);
    if (
      !location.search ||
      (data && data.length > 0 && location.search === currentSearch)
    )
      return;

    dispatch({ type: START_RESULTUSERS, query: location.search });
    const response = await fetch(`${urlGithub}/search/users${location.search}`);

    if (response) {
      const { items } = await response.json();
      dispatch({ type: SUCCESS_RESULTUSERS, data: items });
    } else {
      dispatch({
        type: ERROR_RESULTUSERS,
        error: "Une erreur est soudainement survenue.",
      });
    }
  };

  const getTermSearch = () =>
    location.search ? location.search.split("?q=")[1] : null;

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }
    if (data && data.length <= 0) {
      return <Empty />;
    }
    if (data && data.length > 0) {
      return (
        <List>
          {data.map((item: IUserGithub) => {
            return (
              <User
                login={item.login}
                key={item.login}
                avatarUrl={item.avatar_url}
                id={item.id}
              />
            );
          })}
        </List>
      );
    }
  };

  useEffect(() => {
    fetchData().then((r) => r);
  }, [location.search]);

  return (
    <Container>
      <>
        {!!getTermSearch() && (
          <h4>
            Résultats pour <b>"{getTermSearch()}"</b>
          </h4>
        )}
        {renderContent()}
      </>
    </Container>
  );
}
