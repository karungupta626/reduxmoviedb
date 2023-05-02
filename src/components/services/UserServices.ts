import axios from "axios";
import { IUsers } from "../../types/IUsers";
export class UsersService {
  private static URL: string = "https://api.tvmaze.com/shows";
  private static API_KEY: string = "tVjVe4J9HawvK-vuzdCmc08rlNtTr4mt";
  public static getAllShows() {
    let showsURL: string = `${this.URL}`;
    return axios.get(showsURL);
  }
  public static getShowById(id: number) {
    const showURL: string = `${this.URL}/${id}`;
    return axios.get(showURL);
  }
  public static getCastByShowId(id: number) {
    const castURL: string = `${this.URL}/${id}/cast`;
    return axios.get(castURL);
  }
  
  public static async getTopRatedShows() {
    const showsURL: string = `${this.URL}`;
    try {
      const response = await axios.get(showsURL);
      const sortedShows = response.data.sort(
        (a: any, b: any) => b.rating.average - a.rating.average
      );
      return sortedShows;
    } catch (error) {
      console.error(error);
    }
  }
  public static async getRecentlyAddedShows() {
    const showsURL: string = `${this.URL}`;
  
    try {
      const response = await axios.get(showsURL);
      const sortedShows = response.data.sort(
        (a: IUsers, b: IUsers) => {
          const dateA = new Date(a.premiered);
          const dateB = new Date(b.premiered);
          return dateB.getTime() - dateA.getTime();
        }
      );
      return sortedShows;
    } catch (error) {
      console.error(error);
    }
  }
  
}
