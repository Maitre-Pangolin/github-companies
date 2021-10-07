import { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Icon, Image, Button, Input } from "semantic-ui-react";
import "./App.css";

function App() {
  const [companies, setCompanies] = useState([]);
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const searchCity = () => {
    setTotalResults(0);
    setPage(1);
    setSearchedCity(city);
    fetchCompanies();
  };

  const fetchCompanies = () => {
    fetch(`https://api.github.com/search/users?q=location:${city} type:org&per_page=30&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data.items);
        setTotalResults(data.total_count);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (city) {
      fetchCompanies();
    }
  }, [page]);

  return (
    <div className="App">
      <header>
        <h1>
          Github C
          <Icon name="github" size="small" />
          mpanies
        </h1>
      </header>
      <main>
        <div>
          <Input
            size="massive"
            action={{ color: "blue", icon: "search", onClick: searchCity }}
            placeholder="Search a city..."
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>

        {totalResults !== 0 ? (
          <div>
            <h2 style={{ marginBottom: "40px" }}>
              Found <span style={{ color: "blue" }}>{totalResults}</span> companies in {searchedCity}.
            </h2>

            <Button
              icon
              labelPosition="left"
              disabled={page === 1 ? true : false}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Previous
              <Icon name="left arrow" />
            </Button>
            <Button
              icon
              labelPosition="right"
              disabled={30 * page > totalResults ? true : false}
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next
              <Icon name="right arrow" />
            </Button>
            <Companies companies={companies} />
          </div>
        ) : undefined}
      </main>
    </div>
  );
}

const Companies = (props) => {
  return (
    <div className="container">
      {props.companies.map((c) => (
        <CompanyCard key={c.id} company={c} />
      ))}
    </div>
  );
};

const CompanyCard = (props) => {
  const urlUser = `https://github-project-backend.herokuapp.com/user/${props.company.login}`;
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(urlUser)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  if (user)
    return (
      <Card href={user.url}>
        <Image src={user.avatar_url} />
        <Card.Content>
          <Card.Header textAlign="center">{user.login}</Card.Header>
          <Card.Meta textAlign="center">{user.name}</Card.Meta>
          <Card.Description textAlign="left">{user.bio || "No bio"}</Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="left">
          <Card.Description>
            <Icon name="github square" />
            {user.public_repos} public repositories
          </Card.Description>

          <Card.Description>
            <Icon name="home" />
            {user.location || "No location"}
          </Card.Description>
          <Card.Description>
            <Icon name="mail" />
            {user.email || "No mail"}
          </Card.Description>
          <Card.Description>
            <Icon name="users" />
            {user.followers} follower{user.followers > 1 ? "s" : ""}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  else return undefined;
};

export default App;
