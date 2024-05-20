import ApiService from "./ApiService";

export async function apiGetLeaderBoardData(timeframe) {
  return ApiService.fetchData({
    url: `/leaderboard/?timeframe=${timeframe}`,
    method: "get"
  });
}
