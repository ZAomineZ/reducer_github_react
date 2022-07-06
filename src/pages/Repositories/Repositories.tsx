import { Container } from "../../components/Container/Container";
import { useParams } from "react-router";
import { useContext, useEffect } from "react";
import {
  ERROR_RESULT_REPOSITORIES,
  IStoreContext,
  START_RESULT_REPOSITORIES,
  StoreContext,
  SUCCESS_RESULT_REPOSITORIES,
} from "../../store";
import Loading from "../../components/Loading/Loading";
import { Empty } from "../../components/Empty/Empty";
import List from "../../components/List/List";
import { urlGithub } from "../../config/url";
import { IRepoGithub } from "../../types/github";
import Item from "../../components/List/Item";

interface Context {
  state: IStoreContext;
  dispatch: any;
}

export default function Repositories() {
  const { login } = useParams<{ login: string }>();
  const {
    state: {
      repositories: { data, loading },
    },
    dispatch,
  } = useContext(StoreContext) as unknown as Context;

  const fetchData = async () => {
    dispatch({ type: START_RESULT_REPOSITORIES });
    const response = await fetch(`${urlGithub}/users/${login}/repos`);
    if (response) {
      const result = await response.json();
      dispatch({ type: SUCCESS_RESULT_REPOSITORIES, data: result });
    } else {
      dispatch({
        type: ERROR_RESULT_REPOSITORIES,
        error: "Une erreur est soudainement survenue.",
      });
    }

    return null;
  };

  useEffect(() => {
    fetchData().then((r) => r);
  }, []);

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
          {data.map((item: IRepoGithub) => (
            <Item
              key={item.name}
              name={item.name}
              description={item.description}
              html_url={item.html_url}
            />
          ))}
        </List>
      );
    }
  };

  return (
    <Container>
      <h4>
        Affichage des référentiels de <b>{login}</b>
        {renderContent()}
      </h4>
    </Container>
  );
}
