import fetch from "node-fetch";
import urlencode from "urlencode";

const API_URL = "https://kr.api.riotgames.com/lol";
const API_ENDPOINTS = {
  SUMMONER: "/summoner/v4/summoners/by-name/",
  LEAGUE: "/league/v4/entries/by-summoner/"
};
const API_KEY = "YOUR_API_KEY_HERE";

export const getSummonerByName = name =>
  fetch(
    `${API_URL}${API_ENDPOINTS.SUMMONER}${urlencode(name)}?api_key=${API_KEY}`
  )
    .then(response => response.json())
    .then(json => ({
      id: json.id,
      name: json.name,
      level: json.summonerLevel,
      profileIcon: json.profileIconId
    }));

export const getLeagueById = (id, type) =>
  fetch(`${API_URL}${API_ENDPOINTS.LEAGUE}${id}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(json => json.filter(league => league.queueType === type)[0])
    .then(json => ({
      type: json.queueType,
      name: json.summonerName,
      hotStreak: json.hotStreak,
      wins: json.wins,
      veteran: json.veteran,
      losses: json.losses,
      rank: `${json.tier} ${json.rank}`,
      inactive: json.inactive,
      freshBlood: json.freshBlood,
      leaguePoints: json.leaguePoints
    }));
