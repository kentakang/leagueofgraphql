import { getSummonerByName, getLeagueById } from "./database";

const resolvers = {
  Query: {
    summoner: (_, { name }) => getSummonerByName(name),
    league: (_, { id, type }) => getLeagueById(id, type)
  }
};

export default resolvers;
